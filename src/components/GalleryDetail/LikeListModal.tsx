/* eslint-disable @typescript-eslint/no-explicit-any */
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
                  prev.map((u) => [u.userUuid, u]),
                )
                for (const u of pageLikes) map.set(u.userUuid, u)
                return Array.from(map.values())
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
  // fetchPage 넣으면 무한 루프 발생, 한 번만 실행 의도

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
          {items.map((u) => (
            <S.Row
              key={u.userUuid}
              onClick={() =>
                onUserClick
                  ? onUserClick(u.userUuid)
                  : navigate(`/profile/${u.userUuid}`)
              }
            >
              <S.Avatar>
                <ProfileImage
                  src={u.profileUrl}
                  alt={u.nickname}
                  width="50px"
                  height="50px"
                />
              </S.Avatar>
              <S.Info>
                <S.Nick>{u.nickname}</S.Nick>
                <S.Sub>{u.name}</S.Sub>
              </S.Info>
              <S.Chevron>›</S.Chevron>
            </S.Row>
          ))}

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
