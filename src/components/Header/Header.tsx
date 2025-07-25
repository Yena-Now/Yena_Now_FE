import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as S from '@styles/components/Header/HeaderStyle'
import Logo from '@components/Common/Logo'

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      //   handleSearchSubmit();
      setSearchQuery('')
    }
  }

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

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
          <S.UserProfile ref={dropdownRef}>
            <img
              src="/user_default_profile.png"
              alt="User Profile"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            />
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
                    <S.MenuLink as={Link} to="/profile/edit">
                      내 프로필 편집
                    </S.MenuLink>
                  </S.DropdownMenuItem>
                  <S.DropdownMenuItem>
                    <S.MenuLink as={Link} to="/logout">
                      로그아웃
                    </S.MenuLink>
                  </S.DropdownMenuItem>
                </S.DropdownMenu>
              </S.ProfileDropdown>
            )}
          </S.UserProfile>
        </S.NavigationRightSection>
      </S.NavigationContainer>
    </S.HeaderContainer>
  )
}

export default Header
