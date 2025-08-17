import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from '@styles/components/GalleryDetail/LikeListModalStyle'
import ProfileImage from '@components/Common/ProfileImage'
import type { LikeUser } from '@/types/Like'
import { likeAPI } from '@/api/like'
import { IoHeartOutline, IoClose, IoHeart } from 'react-icons/io5'

type Props = {
  ncutUuid: string
  isOpen: boolean
  onClose: () => void
  onUserClick?: (userUuid: string) => void
  pageSize?: number
  title?: string
  initialLikeCount?: number
  initialIsLiked?: boolean
}

const LikeListModal: React.FC<Props> = ({
  ncutUuid,
  isOpen,
  onClose,
  onUserClick,
  pageSize = 20,
  title = '이 순간에 공감해준 사람들',
  initialLikeCount,
  initialIsLiked,
}) => {
  const navigate = useNavigate()
  const [items, setItems] = useState<LikeUser[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const scrollRootRef = useRef<HTMLDivElement | null>(null)
  const reqSeqRef = useRef(0)
  const openedKeyRef = useRef('')

  const fetchPage = useCallback(
    async (opts?: { force?: boolean; page?: number }) => {
      const force = opts?.force ?? false
      const nextPage = typeof opts?.page === 'number' ? opts.page : page
      if (!force && (!isOpen || loading || !hasMore)) return

      const myReqId = ++reqSeqRef.current
      const myOpenKey = openedKeyRef.current

      setLoading(true)
      setError(null)
      try {
        let res = await likeAPI.getLikes(ncutUuid, nextPage, pageSize)
        if (myReqId !== reqSeqRef.current || myOpenKey !== openedKeyRef.current)
          return

        let pageLikes = Array.isArray(res.likes) ? res.likes : []
        const rawCount = Number(res.likeCount)
        const apiCount = Number.isFinite(rawCount) ? rawCount : pageLikes.length
        let last = pageLikes.length < pageSize

        if (nextPage === 0 && apiCount > 0 && pageLikes.length === 0) {
          const retrySize = Math.max(apiCount, 50)
          const refetch = await likeAPI.getLikes(ncutUuid, 0, retrySize)
          if (
            myReqId !== reqSeqRef.current ||
            myOpenKey !== openedKeyRef.current
          )
            return
          res = refetch as typeof res
          pageLikes = Array.isArray(res.likes) ? res.likes : []
          last = pageLikes.length < retrySize
        }

        if (nextPage === 0) setIsLiked(!!res.isLiked)
        setTotal(apiCount)
        setItems((prev) =>
          nextPage === 0
            ? pageLikes
            : (() => {
                const map = new Map<string, LikeUser>(
                  prev
                    .filter(
                      (p): p is LikeUser =>
                        typeof (p as LikeUser).userUuid === 'string' &&
                        !!(p as LikeUser).userUuid,
                    )
                    .map((p) => [(p as LikeUser).userUuid as string, p]),
                )
                const appendedDeleted: LikeUser[] = []
                for (const u of pageLikes) {
                  const uid =
                    typeof u === 'object' && u !== null && 'userUuid' in u
                      ? ((u as LikeUser).userUuid as string | undefined)
                      : undefined
                  if (uid) map.set(uid, u)
                  else appendedDeleted.push(u)
                }
                return [...Array.from(map.values()), ...appendedDeleted]
              })(),
        )

        setHasMore(!last)
        setPage(() => nextPage + 1)
      } catch {
        setError('목록을 불러오지 못했습니다.')
      } finally {
        if (
          myReqId === reqSeqRef.current &&
          myOpenKey === openedKeyRef.current
        ) {
          setLoading(false)
        }
      }
    },
    [isOpen, loading, hasMore, ncutUuid, page, pageSize],
  )

  useEffect(() => {
    if (!isOpen) return
    setItems([])
    setPage(0)
    setTotal(typeof initialLikeCount === 'number' ? initialLikeCount : null)
    setHasMore(true)
    setError(null)
    setLoading(false)
    if (typeof initialIsLiked === 'boolean') setIsLiked(initialIsLiked)
    openedKeyRef.current = `${ncutUuid}-${Date.now()}`
    fetchPage({ force: true, page: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, ncutUuid, initialLikeCount, initialIsLiked])

  useEffect(() => {
    if (!isOpen || !sentinelRef.current || page === 0) return
    const root = scrollRootRef.current ?? undefined
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchPage()
      },
      { root, threshold: 0.15 },
    )
    io.observe(sentinelRef.current)
    return () => io.disconnect()
  }, [isOpen, fetchPage, page])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <S.Backdrop onClick={handleBackdrop}>
      <S.Modal
        role="dialog"
        aria-modal="true"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.Close onClick={onClose} aria-label="닫기">
            <IoClose size={20} />
          </S.Close>
          <S.CountRow>
            <S.Heart aria-hidden>
              {isLiked ? (
                <IoHeart size={20} color="red" />
              ) : (
                <IoHeartOutline size={20} />
              )}
            </S.Heart>
            <span>{typeof total === 'number' ? total : '…'}</span>
          </S.CountRow>
        </S.Header>

        <S.List id="likeModalScroll" ref={scrollRootRef}>
          {items.map((u, idx) => {
            const uid =
              typeof u === 'object' && u !== null && 'userUuid' in u
                ? ((u as LikeUser).userUuid as string | undefined)
                : undefined
            const isDeleted = !uid
            const nick = u?.nickname || '탈퇴한 사용자'
            const name = u?.name || ''
            const profileSrc = isDeleted
              ? undefined
              : (u as LikeUser).profileUrl

            return (
              <S.Row
                key={uid ?? `deleted-${idx}`}
                onClick={() => {
                  if (!uid) return
                  if (onUserClick) {
                    onUserClick(uid)
                  } else {
                    navigate(`/profile/${uid}`)
                  }
                }}
                tabIndex={isDeleted ? -1 : 0}
                aria-disabled={isDeleted}
                style={{
                  cursor: isDeleted ? 'default' : 'pointer',
                  opacity: isDeleted ? 0.6 : 1,
                }}
              >
                <S.Avatar>
                  <ProfileImage
                    src={profileSrc}
                    alt={nick}
                    width="50px"
                    height=""
                  />
                </S.Avatar>
                <S.Info>
                  <S.Nick className={isDeleted ? 'deleted' : ''}>{nick}</S.Nick>
                  <S.Sub>{name}</S.Sub>
                </S.Info>
                <S.Chevron aria-hidden>›</S.Chevron>
              </S.Row>
            )
          })}

          {loading && (
            <>
              <S.Skeleton />
              <S.Skeleton />
              <S.Skeleton />
            </>
          )}

          {!loading && !error && typeof total === 'number' && total === 0 && (
            <S.Empty>아직 좋아요가 없어요.</S.Empty>
          )}

          {error && <S.Empty>{error}</S.Empty>}

          {/* sentinel */}
          <div ref={sentinelRef} />
        </S.List>
      </S.Modal>
    </S.Backdrop>
  )
}

export default LikeListModal
