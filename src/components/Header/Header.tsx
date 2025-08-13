import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '@/api/auth'
import { userAPI } from '@/api/user'
import { useToast } from '@/hooks/useToast'
import type { UserMeResponse } from '@/types/User'
import { useAuthStore } from '@/store/authStore'
import Logo from '@components/Common/Logo'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/Header/HeaderStyle'
import SearchModal from '@components/Common/SearchModal'

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [myInfo, setMyInfo] = useState<UserMeResponse | null>()
  const { error } = useToast()
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [modalKeyword, setModalKeyword] = useState('')
  const logout = useAuthStore((state) => state.logout)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const openSearchModal = (keyword: string) => {
    const kw = keyword.trim()
    if (!kw) return
    setModalKeyword(kw)
    setIsSearchOpen(true)
  }

  const handleSearchSubmit = (keyword: string) => {
    openSearchModal(keyword)
    setSearchQuery('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(searchQuery)
    }
  }
  const handleLogout = async () => {
    try {
      await authAPI.logout()
      navigate('/login')
      logout()
    } catch {
      error('로그아웃에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const fetchMyInfo = useCallback(async () => {
    try {
      const myData = await userAPI.getUserMeInfo()
      setMyInfo(myData)
    } catch {
      error('내 정보를 불러오는 데 실패했습니다.')
    }
  }, [error, setMyInfo])

  useEffect(() => {
    fetchMyInfo()
  }, [fetchMyInfo])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <S.HeaderContainer>
      <Logo />
      <S.NavigationContainer>
        <S.NavigationLeftSection>
          <Link to="/film">
            <div>N컷 촬영</div>
          </Link>
          <Link to="/gallery">갤러리</Link>
          <Link to="/daily-moment">어제의 순간</Link>
        </S.NavigationLeftSection>
        <S.NavigationRightSection>
          <S.SearchBox>
            <S.SearchIcon>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle
                  cx="9"
                  cy="9"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="14.5"
                  y1="14.5"
                  x2="19"
                  y2="19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </S.SearchIcon>
            <S.SearchInput
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              placeholder="사용자 검색"
              style={{ paddingLeft: '36px' }}
            />
          </S.SearchBox>
          <S.ProfileContainer ref={dropdownRef}>
            <ProfileImage onClick={toggleDropdown} src={myInfo?.profileUrl} />
            {isDropdownOpen && (
              <S.ProfileDropdown>
                <S.ProfileDropdownTail />
                <S.DropdownMenu>
                  <S.DropdownMenuItem>
                    <S.MenuLink as={Link} to="/profile">
                      내 프로필
                    </S.MenuLink>
                  </S.DropdownMenuItem>
                  <S.DropdownMenuItem>
                    <S.MenuLink as={Link} to="/my-profile">
                      내 프로필 편집
                    </S.MenuLink>
                  </S.DropdownMenuItem>
                  <S.DropdownMenuItem>
                    <S.MenuLink onClick={handleLogout}>로그아웃</S.MenuLink>
                  </S.DropdownMenuItem>
                </S.DropdownMenu>
              </S.ProfileDropdown>
            )}
          </S.ProfileContainer>
        </S.NavigationRightSection>
      </S.NavigationContainer>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        type="search"
        initialKeyword={modalKeyword}
        onSelect={(user) => {
          navigate(`/users/profile/${user.userUuid}`)
          setIsSearchOpen(false)
        }}
      />
    </S.HeaderContainer>
  )
}

export default Header
