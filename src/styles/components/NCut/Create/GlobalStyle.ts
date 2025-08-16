import styled from 'styled-components'

export const NCutLayout = styled.div`
  display: flex;
  background: var(--color-surface-2);
  padding: var(--spacing-6);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: var(--spacing-4);
  }
`

export const NCutCreateLayout = styled.div`
  position: relative;
  width: 100%;
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    min-height: calc(100vh - 120px);
    padding: var(--spacing-4);
  }
`

export const NcutCreateContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  flex-direction: column;
  padding: var(--spacing-12) var(--spacing-8);
  border: 1px solid var(--color-border);

  @media (max-width: 768px) {
    max-width: 100%;
    min-height: auto;
    padding: var(--spacing-8) var(--spacing-4);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
  }

  @media (max-width: 480px) {
    padding: var(--spacing-6) var(--spacing-3);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
  }
`

export const NavigationButtonsContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing-8);
  pointer-events: none;
  z-index: 10;

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    transform: none;
    justify-content: center;
    gap: var(--spacing-8);
    margin-top: var(--spacing-6);
    padding: 0;
    pointer-events: all;
  }

  @media (max-width: 480px) {
    gap: var(--spacing-6);
    margin-top: var(--spacing-4);
  }
`

export const NCutCreateContentContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 var(--spacing-4);
  }

  @media (max-width: 480px) {
    padding: 0 var(--spacing-2);
  }
`

export const NcutCreateHeader = styled.h1`
  font-size: clamp(2rem, 5vw, 2.875rem);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-6);
  text-align: center;
  color: var(--color-text-strong);
  line-height: 1.2;

  @media (max-width: 768px) {
    margin-bottom: var(--spacing-4);
  }

  @media (max-width: 480px) {
    margin-bottom: var(--spacing-3);
  }
`

export const NcutCreateDescription = styled.p`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-2);
  text-align: center;
  color: var(--color-text);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-2);
  }

  @media (max-width: 480px) {
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-1);
  }
`

export const NcutCreateSubDescription = styled.p`
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-6);
  text-align: center;
  color: var(--color-text-muted);
  line-height: 1.5;

  @media (max-width: 768px) {
    margin-bottom: var(--spacing-4);
  }

  @media (max-width: 480px) {
    margin-bottom: var(--spacing-3);
  }
`

export const NCutButtonWrapper = styled.div`
  width: 65px;
  height: 65px;
  pointer-events: all;
  margin: 0 var(--spacing-6);

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    margin: 0;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
  }
`

export const NCutNextButton = styled.button<{
  disabled: boolean
}>`
  width: 65px;
  height: 65px;
  border-radius: var(--radius-full);
  border: none;
  background: ${({ disabled }) =>
    disabled ? 'var(--color-text-light)' : 'var(--color-primary)'};
  color: var(--color-text-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: var(--font-size-xl);
  transition: all var(--transition);
  box-shadow: var(--shadow-md);

  &:hover:not(:disabled) {
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
    width: 55px;
    height: 55px;
    font-size: var(--font-size-lg);
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: var(--font-size-base);
  }
`

export const NCutPrvButton = styled.button`
  width: 65px;
  height: 65px;
  border-radius: var(--radius-full);
  border: none;
  background: var(--color-primary);
  color: var(--color-text-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: var(--font-size-xl);
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
    width: 55px;
    height: 55px;
    font-size: var(--font-size-lg);
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: var(--font-size-base);
  }
`

export const ProgressBar = styled.div`
  position: absolute;
  bottom: var(--spacing-6);
  width: 100%;
  display: flex;
  justify-content: center;
  gap: var(--spacing-2);

  @media (max-width: 768px) {
    position: relative;
    bottom: auto;
    margin-top: var(--spacing-6);
  }

  @media (max-width: 480px) {
    margin-top: var(--spacing-4);
  }
`

export const ProgressBarItem = styled.div<{ isActive: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  background: ${(props) =>
    props.isActive ? 'var(--color-primary)' : 'var(--color-border)'};
  transition: all var(--transition);
  box-shadow: ${(props) => (props.isActive ? 'var(--shadow-sm)' : 'none')};

  &:hover {
    transform: ${(props) => (props.isActive ? 'scale(1.1)' : 'scale(1)')};
  }

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 480px) {
    width: 12px;
    height: 12px;
  }
`
