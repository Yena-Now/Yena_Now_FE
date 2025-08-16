import styled from 'styled-components'

export const LastStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: var(--spacing-6);

  @media (max-width: 768px) {
    padding: var(--spacing-4);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-3);
  }
`

export const CodeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin: var(--spacing-8) 0;

  @media (max-width: 768px) {
    gap: var(--spacing-3);
    margin: var(--spacing-6) 0;
  }

  @media (max-width: 480px) {
    gap: var(--spacing-2);
    margin: var(--spacing-4) 0;
  }
`

export const CodeDigitContainer = styled.div`
  display: flex;
  gap: var(--spacing-2);

  @media (max-width: 768px) {
    gap: var(--spacing-1);
  }
`

export const CodeDigit = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-strong);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition);

  &:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: var(--font-size-lg);
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: var(--font-size-base);
  }
`

export const CopyIcon = styled.div`
  cursor: pointer;
  padding: var(--spacing-3);
  color: var(--color-text-muted);
  border-radius: var(--radius-md);
  transition: all var(--transition);

  &:hover {
    color: var(--color-primary);
    background: var(--color-primary-light);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-focus);
  }

  @media (max-width: 768px) {
    padding: var(--spacing-2);
  }
`

export const ConnectToSessionButton = styled.button`
  margin-top: var(--spacing-6);
  padding: var(--spacing-4) var(--spacing-8);
  color: var(--color-text-strong);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  background: var(--color-primary);
  transition: all var(--transition);
  box-shadow: var(--shadow-md);

  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 3px var(--color-primary-focus),
      var(--shadow-lg);
  }

  @media (max-width: 768px) {
    margin-top: var(--spacing-4);
    padding: var(--spacing-3) var(--spacing-6);
    font-size: var(--font-size-sm);
  }

  @media (max-width: 480px) {
    margin-top: var(--spacing-3);
    padding: var(--spacing-2) var(--spacing-4);
  }
`
