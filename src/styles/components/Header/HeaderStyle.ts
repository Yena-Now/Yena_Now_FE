import styled from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
`

export const NavigationContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-4) var(--spacing-6);
  gap: var(--spacing-6);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-4);
    padding: var(--spacing-3) var(--spacing-4);
  }
`

export const NavigationLeftSection = styled.div`
  display: flex;
  gap: var(--spacing-8);
  align-items: center;

  a {
    text-decoration: none;
    color: var(--color-text);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-base);
    padding: var(--spacing-2) var(--spacing-3);
    border-radius: var(--radius-md);
    transition: all var(--transition);

    &:hover {
      color: var(--color-primary);
      background: var(--color-primary-light);
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--color-primary-focus);
    }
  }

  @media (max-width: 1024px) {
    gap: var(--spacing-6);
  }

  @media (max-width: 768px) {
    gap: var(--spacing-4);
    flex-wrap: wrap;
    justify-content: center;
  }
`

export const NavigationRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-4);

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
`

export const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const SearchIcon = styled.span`
  position: absolute;
  left: var(--spacing-3);
  pointer-events: none;
  display: flex;
  align-items: center;
  height: 100%;
  color: var(--color-text-muted);
`

export const SearchInput = styled.input`
  width: 240px;
  padding: var(--spacing-3) var(--spacing-3) var(--spacing-3) var(--spacing-10);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  background: var(--color-surface-2);
  outline: none;
  transition: all var(--transition);

  &::placeholder {
    color: var(--color-text-light);
  }

  &:focus {
    border-color: var(--color-primary);
    background: var(--color-surface);
    box-shadow: 0 0 0 3px var(--color-primary-focus);
  }

  @media (max-width: 768px) {
    width: 200px;
  }
`

export const ProfileContainer = styled.div`
  position: relative;
  display: inline-block;
`

export const ProfileDropdown = styled.div`
  position: absolute;
  top: calc(100% + var(--spacing-3));
  right: 0;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  min-width: 160px;
  z-index: var(--z-dropdown);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
`

export const ProfileDropdownTail = styled.div`
  position: absolute;
  top: -8px;
  right: 20px;
  width: 16px;
  height: 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-bottom: none;
  border-right: none;
  transform: rotate(45deg);
  z-index: var(--z-dropdown);
`

export const DropdownMenu = styled.ul`
  list-style: none;
  padding: var(--spacing-2);
  margin: 0;
`

export const DropdownMenuItem = styled.li`
  margin-bottom: var(--spacing-1);

  &:last-child {
    margin-bottom: 0;
  }
`

export const MenuLink = styled.div`
  color: var(--color-text);
  text-decoration: none;
  display: block;
  margin-top: 8px;
  padding: 0.3rem 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition);

  &:hover {
    background: var(--color-surface-2);
    color: var(--color-primary);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-focus);
  }
`
