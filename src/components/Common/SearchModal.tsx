import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from '@styles/components/Common/SearchModalStyle'
import ProfileImage from './ProfileImage'
import { IoClose } from 'react-icons/io5'
import { searchAPI } from '@/api/search'
import type { UserSearchModalProps, User } from '@/types/UserSearchModal'

const USERS_PER_PAGE = 10
const DEBOUNCE_MS = 300

const UserSearchModal: React.FC<UserSearchModalProps> = ({
  initialKeyword,
  isOpen,
  onClose,
  onSelect,
  type,
}) => {
  const [search, setSearch] = useState('')
  const [items, setItems] = useState<User[]>([])
  const [page, setPage] = useState(0) // 0-based
  const [totalPages, setTotalPages] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const userListRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceTimer = useRef<number | null>(null)

  const fetchPage = useCallback(
    async (kw: string, pageNum: number, replace = false) => {
      const q = kw.trim()
      if (!q) {
        setItems([])
        setTotalPages(0)
        return
      }
      try {
        setIsFetching(true)
        setError(null)
        const res = await searchAPI.search(q, pageNum, USERS_PER_PAGE)
        // res: { totalPages, userSearches }
        setTotalPages(res.totalPages)
        setItems((prev) =>
          replace ? res.userSearches : [...prev, ...res.userSearches],
        )
      } catch {
        setError('검색 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.')
      } finally {
        setIsFetching(false)
      }
    },
    [],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return
    // 초기 상태 리셋
    setItems([])
    setPage(0)
    setTotalPages(0)
    setError(null)

    const kw = (initialKeyword ?? '').trim()
    setSearch(kw)
    if (kw) {
      fetchPage(kw, 0, true)
    }
    inputRef.current?.focus()
  }, [isOpen, initialKeyword, fetchPage])

  useEffect(() => {
    if (!isOpen) return
    if (debounceTimer.current) window.clearTimeout(debounceTimer.current)

    debounceTimer.current = window.setTimeout(() => {
      setPage(0)
      fetchPage(search, 0, true)
    }, DEBOUNCE_MS)

    return () => {
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current)
    }
  }, [search, isOpen, fetchPage])

  // 무한 스크롤
  const loadMore = useCallback(() => {
    if (isFetching) return
    if (!search.trim()) return
    if (page + 1 >= totalPages) return
    const next = page + 1
    setPage(next)
    fetchPage(search, next, false)
  }, [isFetching, page, totalPages, fetchPage, search])

  const handleScroll = useCallback(() => {
    const el = userListRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    if (scrollTop + clientHeight >= scrollHeight - 20) loadMore()
  }, [loadMore])

  useEffect(() => {
    const list = userListRef.current
    if (list) list.addEventListener('scroll', handleScroll)
    return () => {
      if (list) list.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  if (!isOpen) return null

  const handleClick = (user: User) => {
    if (type === 'search') {
      onClose()
      navigate(`/users/profile/${user.userUuid}`)
    } else if (type === 'invite' && onSelect) {
      onSelect(user)
    }
  }

  return (
    <S.Backdrop onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>
          <IoClose size={25} />
        </S.CloseButton>

        <S.SearchInput
          ref={inputRef}
          placeholder="사용자 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <hr />
        <S.UserList ref={userListRef}>
          {!isFetching && search && items.length === 0 && (
            <S.Empty>검색 결과가 없어요</S.Empty>
          )}

          {items.map((user, idx) => (
            <React.Fragment key={user.userUuid}>
              <S.UserItem onClick={() => handleClick(user)}>
                <ProfileImage
                  src={user.profileUrl}
                  alt={user.nickname || user.name || 'user'}
                  height="80px"
                  width="80px"
                />
                <S.UserInfo>
                  <S.Nickname>{user.nickname}</S.Nickname>
                  <S.UserState>
                    {user.name && <S.Name>{user.name}</S.Name>}
                    {user.isFollowing && <S.Following> · 팔로잉</S.Following>}
                  </S.UserState>
                </S.UserInfo>
              </S.UserItem>
              {idx < items.length - 1 && <S.Divider />}
            </React.Fragment>
          ))}

          {isFetching && <p style={{ textAlign: 'center' }}>불러오는 중…</p>}
          {error && <S.Error>{error}</S.Error>}
        </S.UserList>
      </S.Modal>
    </S.Backdrop>
  )
}

export default UserSearchModal
