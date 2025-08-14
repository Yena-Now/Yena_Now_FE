import styled, { keyframes } from 'styled-components'

export const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: var(--spacing-16);
  background: var(--color-surface-2);
`

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 3px solid var(--color-surface-3);
  border-top-color: var(--color-primary);
  border-radius: var(--radius-full);
  animation: ${spin} 1s linear infinite;
  box-shadow: var(--shadow-sm);
`

export const LoadingText = styled.p`
  margin-top: var(--spacing-4);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
`
