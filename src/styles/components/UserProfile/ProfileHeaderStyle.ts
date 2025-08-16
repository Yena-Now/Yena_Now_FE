import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-12) var(--spacing-6);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-8);
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: var(--spacing-8);
    align-items: center;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-8) var(--spacing-4);
    margin-bottom: var(--spacing-6);
  }
`

export const LeftArea = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-6);
  }
`

export const NameBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-4);
  
  @media (max-width: 1024px) {
    align-items: center;
  }
`

export const Nickname = styled.h1`
  font-weight: var(--font-weight-bold);
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  color: var(--color-text-strong);
  margin: 0;
`

export const Name = styled.p`
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  margin: 0;
`

export const CountRow = styled.div`
  display: flex;
  gap: var(--spacing-12);
  align-items: center;
  
  @media (max-width: 1024px) {
    gap: var(--spacing-8);
  }
  
  @media (max-width: 768px) {
    gap: var(--spacing-6);
  }
`

export const CountItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  transition: all var(--transition);
  
  &[data-clickable='true'] {
    cursor: pointer;
    
    &:hover {
      background: var(--color-surface-2);
      transform: translateY(-2px);
    }
    
    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--color-primary-focus);
      border-radius: var(--radius-md);
    }
  }
`

export const CountNum = styled.div`
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-2xl);
  color: var(--color-text-strong);
`

export const CountLabel = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
`

export const MyBtn = styled.button`
  background: var(--color-primary);
  color: var(--color-text-strong);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition);
  
  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
  }
  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-focus);
  }
`

export const FollowBtn = styled.button<{ $following?: boolean }>`
  background: ${({ $following }) =>
    $following ? 'var(--color-primary)' : 'transparent'};
  color: ${({ $following }) =>
    $following ? 'var(--color-text-strong)' : 'var(--color-primary)'};
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition);

  &:hover {
    background: ${({ $following }) =>
      $following ? 'var(--color-primary-hover)' : 'var(--color-primary-light)'};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-focus);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`
