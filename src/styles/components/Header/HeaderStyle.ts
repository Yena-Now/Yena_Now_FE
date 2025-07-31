import styled from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;
  max-height: 150px;
  border-bottom: 1px solid #e0e0e0;
  align-items: center;
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-height: none;
    flex-direction: column;
  }
`

export const NavigationContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  gap: 20px;
  background-color: #f8f8f8;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    gap: 10px;
    padding: 10px;
  }
`

export const NavigationLeftSection = styled.div`
  display: flex;
  gap: 110px;
  margin-left: 60px;

  a {
    text-decoration: none;
    color: #333;
  }

  @media (max-width: 1024px) {
    gap: 40px;
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    gap: 20px;
    margin-left: 0;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`

export const NavigationRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-right: 60px;

  input {
    width: 180px;
    @media (max-width: 768px) {
      width: 100%;
      min-width: 0;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`

export const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const SearchIcon = styled.span`
  position: absolute;
  left: 10px;
  pointer-events: none;
  display: flex;
  align-items: center;
  height: 100%;
  color: #aaa;
`

export const SearchInput = styled.input`
  width: 260px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 0;
  }
`

export const ProfileContainer = styled.div`
  position: relative;
  display: inline-block;
`

export const ProfileDropdown = styled.div`
  position: absolute;
  top: calc(100% + 16px);
  right: 0;
  background: #fcf5f5;
  border-radius: 12px;
  min-width: 128px;
  text-align: center;
  z-index: 99;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  padding: 15px 0 12px 0;
  font-size: 18px;
  color: #191919;
  border: none;
`

export const ProfileDropdownTail = styled.div`
  position: absolute;
  top: -13px;
  right: 34px;
  width: 28px;
  height: 18px;
  overflow: hidden;
  z-index: 100;
  pointer-events: none;

  &::after {
    content: '';
    display: block;
    margin: 0 auto;
    width: 20px;
    height: 20px;
    background: #fcf5f5;
    border-radius: 2px 2px 0 0;
    transform: rotate(45deg);
    position: absolute;
    left: 4px;
    top: 8px;
    box-shadow: -2px -2px 6px rgba(0, 0, 0, 0.01);
  }
`

export const DropdownMenu = styled.ul`
  list-style: none;
  font-size: 16px;
  padding: 0;
  margin: 0;
`

export const DropdownMenuItem = styled.li`
  margin-bottom: 22px;
  &:last-child {
    margin-bottom: 0;
  }
`

export const MenuLink = styled.div`
  color: #191919;
  text-decoration: none;
  display: block;
  margin-top: 8px;
  padding-bottom: 8px;
  border-radius: 4px;
  transition: background 0.12s;
  &:hover {
    background: #f7ebeb;
  }
`
