import styled from 'styled-components'

export const TimeDisplayContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--spacing-8);

  @media (max-width: 768px) {
    margin-top: var(--spacing-6);
  }

  @media (max-width: 480px) {
    margin-top: var(--spacing-4);
  }
`

export const TimeInputContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: var(--spacing-2);
  background: var(--color-surface);
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);

  @media (max-width: 768px) {
    padding: var(--spacing-4);
    gap: var(--spacing-1);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-3);
  }
`

export const TimeInput = styled.input`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-strong);
  border: none;
  background: transparent;
  text-align: center;
  width: 120px;
  outline: none;
  border-bottom: 3px solid var(--color-primary);
  transition: all var(--transition);

  &:focus {
    border-bottom-color: var(--color-primary-hover);
    box-shadow: 0 4px 8px rgba(247, 190, 59, 0.2);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  @media (max-width: 768px) {
    width: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
  }
`

export const TimeUnit = styled.span`
  font-size: var(--font-size-xl);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);

  @media (max-width: 768px) {
    font-size: var(--font-size-lg);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-base);
  }
`
