import styled from 'styled-components'

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.6)
  );
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  color: #fff;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  opacity: 0;
  transition: opacity var(--transition);
  pointer-events: none;
  padding: var(--spacing-4);
`

export const Container = styled.div`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
  transition: all var(--transition);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }

  &:hover ${Overlay} {
    opacity: 1;
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 3px var(--color-primary-focus),
      var(--shadow-xl);
  }
`

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform var(--transition);

  ${Container}:hover & {
    transform: scale(1.05);
  }
`

export const Video = styled.video`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform var(--transition);

  ${Container}:hover & {
    transform: scale(1.05);
  }
`

export const LikeCount = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  background: rgba(0, 0, 0, 0.7);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-full);
  backdrop-filter: blur(4px);
`

export const LikeIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`

export const LikeNumber = styled.span`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 1;
`
