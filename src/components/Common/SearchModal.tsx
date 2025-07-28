import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from '@styles/components/Common/SearchModalStyle'
import ProfileImage from './ProfileImage'
import type { UserSearchModalProps, User } from '@/types/UserSearchModal'

const USERS_PER_PAGE = 10

const UserSearchModal: React.FC<UserSearchModalProps> = ({
  users,
  isOpen,
  onClose,
  onSelect,
  type,
}) => {
  const [search, setSearch] = useState('')
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const navigate = useNavigate()
  const userListRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const filteredAllUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.nickname?.toLowerCase().includes(search.toLowerCase()) ||
        user.name?.toLowerCase().includes(search.toLowerCase()),
    )
  }, [users, search])

  useEffect(() => {
    if (isOpen) {
      setDisplayedUsers(filteredAllUsers.slice(0, USERS_PER_PAGE))
      setPage(1)
    }
  }, [isOpen, filteredAllUsers])

  const loadMoreUsers = useCallback(() => {
    if (isFetching) return
    setIsFetching(true)

    setTimeout(() => {
      const nextPage = page + 1
      const nextUsers = filteredAllUsers.slice(0, nextPage * USERS_PER_PAGE)
      setDisplayedUsers(nextUsers)
      setPage(nextPage)
      setIsFetching(false)
    }, 500)
  }, [isFetching, page, filteredAllUsers])

  const handleScroll = useCallback(() => {
    if (!userListRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = userListRef.current
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      loadMoreUsers()
    }
  }, [loadMoreUsers])

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
      navigate(`/users/profile/${user.userUuid}`)
    } else if (type === 'invite' && onSelect) {
      onSelect(user)
    }
  }

  return (
    <S.Backdrop onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>×</S.CloseButton>

        <S.SearchInput
          ref={inputRef}
          placeholder="사용자 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <hr />
        <S.UserList ref={userListRef}>
          {displayedUsers.map((user, idx) => (
            <React.Fragment key={user.userUuid}>
              <S.UserItem onClick={() => handleClick(user)}>
                <ProfileImage
                  src={user.profileUrl}
                  alt={user.nickname}
                  height="80px"
                  width="80px"
                />
                <S.UserInfo>
                  <S.Nickname>{user.nickname}</S.Nickname>
                  {user.name && <S.Name>{user.name}</S.Name>}
                </S.UserInfo>
              </S.UserItem>
              {idx < displayedUsers.length - 1 && <S.Divider />}
            </React.Fragment>
          ))}

          {isFetching && <p style={{ textAlign: 'center' }}>불러오는 중...</p>}
        </S.UserList>
      </S.Modal>
    </S.Backdrop>
  )
}

export default UserSearchModal
