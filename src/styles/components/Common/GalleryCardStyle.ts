import styled from 'styled-components'
import { keyframes } from '@emotion/css'

export const Conainter = styled.div`
  width: 100%;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all var(--transition);

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: var(--shadow-xl);
    z-index: 1;
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 3px var(--color-primary-focus),
      var(--shadow-xl);
  }
`

export const PhotoWrapper = styled.div`
  background-color: var(--color-surface-3);
  width: 100%;
  aspect-ratio: 3 / 4;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  pointer-events: none;
  transition: transform var(--transition);

  ${Conainter}:hover & {
    transform: scale(1.05);
  }
`

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform var(--transition);

  ${Conainter}:hover & {
    transform: scale(1.05);
  }
`

export const RelayIcon = styled.span`
  position: absolute;
  top: var(--spacing-3);
  right: var(--spacing-3);
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
  border-radius: var(--radius-full);
  padding: var(--spacing-1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
`

export const InfoWrapper = styled.div`
  padding: var(--spacing-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border-light);
`

export const Box = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
`

export const ProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  object-fit: contain;
  border: 2px solid var(--color-surface);
  box-shadow: var(--shadow-sm);
`

export const UserName = styled.span`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  cursor: pointer;
  transition: color var(--transition);

  &:hover {
    color: var(--color-primary);
  }
`

export const likeText = styled.span`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
`

export const loadingOverlaySpinnerAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
