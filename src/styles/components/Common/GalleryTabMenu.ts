import styled from 'styled-components'

export const GalleryTabWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-6) var(--spacing-6) 0;
  
  @media (max-width: 768px) {
    padding: var(--spacing-4) var(--spacing-4) 0;
  }
`

export const GalleryTabMenu = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-4);
  
  @media (max-width: 768px) {
    gap: var(--spacing-6);
  }
`

export const GalleryTab = styled.button`
  display: flex;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition);
  position: relative;
  
  &:hover {
    color: var(--color-text);
    background: var(--color-surface-2);
  }
  
  &.active {
    color: var(--color-primary);
    font-weight: var(--font-weight-semibold);
    background: var(--color-primary-light);
  }
  
  &.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-primary);
    border-radius: var(--radius-full);
  }
  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-focus);
  }
`

export const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid var(--color-border);
  margin: 0;
  width: 100%;
`
