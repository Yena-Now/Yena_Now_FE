import styled, { css } from 'styled-components'
import { Overlay } from '@styles/components/Moment/MomentCutStyle'

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-6);

  @media (max-width: 768px) {
    padding: var(--spacing-4);
  }
`

export const MainWrapper = styled.div<{ weekly?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: var(--spacing-12);
  width: 100%;
  min-height: 80vh;
  margin-bottom: var(--spacing-12);

  ${({ weekly }) =>
    weekly
      ? css`
          grid-template-areas: 'right left';
        `
      : css`
          grid-template-areas: 'left right';
        `}

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'left' 'right';
    gap: var(--spacing-8);
    min-height: auto;
  }

  @media (max-width: 768px) {
    gap: var(--spacing-6);
    margin-bottom: var(--spacing-8);
  }
`

export const Left = styled.div<{ weekly?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--spacing-6);
  grid-area: left;
  max-width: 520px;

  ${({ weekly }) =>
    weekly
      ? css`
          text-align: right;
        `
      : css`
          text-align: left;
        `}

  @media (max-width: 1024px) {
    max-width: 100%;
    text-align: center;
  }
`

export const TitleWrapper = styled.div<{ weekly?: boolean }>`
  ${({ weekly }) =>
    weekly
      ? css`
          border-right: 3px solid var(--color-primary);
          padding-right: var(--spacing-6);
        `
      : css`
          border-left: 3px solid var(--color-primary);
          padding-left: var(--spacing-6);
        `}

  @media (max-width: 1024px) {
    border-left: none;
    border-right: none;
    border-bottom: 3px solid var(--color-primary);
    padding-left: 0;
    padding-right: 0;
    padding-bottom: var(--spacing-4);
  }
`

export const Title = styled.h1`
  margin-top: var(--spacing-4);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
  color: var(--color-text-strong);
`

export const SubTitle = styled.p`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
`

export const MoveText = styled.button<{ weekly?: boolean }>`
  color: var(--color-text-muted);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  cursor: pointer;
  background: none;
  border: none;
  padding: var(--spacing-3);
  margin-top: var(--spacing-4);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition: all var(--transition);

  ${({ weekly }) =>
    weekly
      ? css`
          justify-content: flex-end;
        `
      : css`
          justify-content: flex-start;
        `}

  &:hover {
    color: var(--color-primary);
    background: var(--color-primary-light);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-focus);
  }

  @media (max-width: 1024px) {
    justify-content: center;
  }
`

export const FirstNCut = styled.div<{ weekly?: boolean }>`
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 640px;
  grid-area: right;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  box-shadow: var(--shadow-xl);
  transition: all var(--transition);

  --base-h: clamp(300px, 50vh, 500px);
  --thumb-h: var(--base-h);

  &.portrait {
    --thumb-h: calc(var(--base-h) * 1.3);
  }

  &::after {
    content: '';
    position: absolute;
    left: 10%;
    right: 10%;
    bottom: -20px;
    height: 40px;
    filter: blur(20px);
    background: rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    z-index: -1;
  }

  video,
  img {
    display: block;
    width: 100%;
    height: var(--thumb-h);
    object-fit: contain;
    margin: 0 auto;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow:
      var(--shadow-xl),
      0 20px 40px rgba(0, 0, 0, 0.1);
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

export const EmptyContainer = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-4);
  text-align: center;
  color: var(--color-text-muted);
  padding: var(--spacing-12);

  svg {
    width: 64px;
    height: 64px;
    opacity: 0.5;
  }

  p {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
    margin: 0;
  }
`

export const EmptyText = styled.button`
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  background: none;
  border: none;
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  transition: all var(--transition);

  &:hover {
    background: var(--color-primary-light);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-focus);
  }
`

export const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-6);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }

  & > * {
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 500ms ease,
      transform 500ms cubic-bezier(0.22, 0.61, 0.36, 1);
    will-change: transform, opacity;
  }

  &.in > * {
    opacity: 1;
    transform: translateY(0);
  }

  &.in > *:nth-child(1) {
    transition-delay: 80ms;
  }
  &.in > *:nth-child(2) {
    transition-delay: 160ms;
  }
  &.in > *:nth-child(3) {
    transition-delay: 240ms;
  }
`
