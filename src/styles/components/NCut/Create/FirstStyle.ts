import styled from 'styled-components'

export const ImageUploadContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 350px;
  margin-top: var(--spacing-6);

  @media (max-width: 768px) {
    max-width: 400px;
    height: 280px;
    margin-top: var(--spacing-4);
  }

  @media (max-width: 480px) {
    max-width: 100%;
    height: 240px;
    margin-top: var(--spacing-3);
  }
`

export const ImageUploadLabel = styled.label`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-2);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition);
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:focus-within {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-focus);
  }

  span {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-muted);
    text-align: center;
    padding: var(--spacing-4);

    @media (max-width: 768px) {
      font-size: var(--font-size-base);
      padding: var(--spacing-3);
    }

    @media (max-width: 480px) {
      font-size: var(--font-size-sm);
      padding: var(--spacing-2);
    }
  }
`

export const ImageUploadInput = styled.input`
  display: none;
`

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-lg);
  transition: transform var(--transition);

  &:hover {
    transform: scale(1.02);
  }
`
