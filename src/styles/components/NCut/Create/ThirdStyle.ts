import styled from 'styled-components'

export const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-light);
  border-radius: var(--radius-full);
  margin-bottom: var(--spacing-6);
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    margin-bottom: var(--spacing-4);
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    margin-bottom: var(--spacing-3);
  }
`

export const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-6);
  margin-top: var(--spacing-8);

  @media (max-width: 768px) {
    gap: var(--spacing-4);
    margin-top: var(--spacing-6);
  }

  @media (max-width: 480px) {
    gap: var(--spacing-3);
    margin-top: var(--spacing-4);
  }
`

export const CounterButton = styled.button`
  width: 48px;
  height: 48px;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-xl);
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);

  &:hover:not(:disabled) {
    background: var(--color-primary-light);
    color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-focus);
  }

  &:disabled {
    color: var(--color-text-light);
    cursor: not-allowed;
    background: var(--color-surface-3);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: var(--font-size-lg);
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: var(--font-size-base);
  }
`

export const CounterDisplay = styled.div`
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-strong);
  min-width: 80px;
  text-align: center;
  padding: var(--spacing-4);
  border-radius: var(--radius-md);

  @media (max-width: 768px) {
    min-width: 60px;
    padding: var(--spacing-3);
  }

  @media (max-width: 480px) {
    min-width: 50px;
    padding: var(--spacing-2);
  }
`
