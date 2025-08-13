import styled, { css } from 'styled-components'
import { Overlay } from '@styles/components/Moment/MomentCutStyle'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`

export const MainWrapper = styled.div<{ weekly?: boolean }>`
  scroll-snap-align: start;
  scroll-snap-stop: always;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  min-height: 100%;
  margin: 0 auto;
  padding: 2rem;

  ${({ weekly }) =>
    weekly
      ? css`
          grid-template-areas: 'right left';
        `
      : css`
          grid-template-areas: 'left right';
        `}
`

export const Left = styled.div<{ weekly?: boolean }>`
  ${({ weekly }) =>
    weekly
      ? css`
          margin-right: 8rem;
        `
      : css`
          margin-left: 5rem;
        `}
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.25rem;
  grid-area: left;
  max-width: 520px;
`

export const TitleWrapper = styled.div<{ weekly?: boolean }>`
  ${({ weekly }) =>
    weekly
      ? css`
          border-right: 5px solid #ddd;
          text-align: right;
        `
      : css`
          border-left: 5px solid #ddd;
          text-align: left;
        `}
  padding: 2rem;
  font-weight: 700;
  font-size: 20px;
  color: #222;
`

export const Title = styled.p`
  margin-top: 1rem;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
`

export const SubTitle = styled.p`
  font-size: 1rem;
`

export const MoveText = styled.button<{ weekly?: boolean }>`
  ${({ weekly }) =>
    weekly
      ? css`
          margin: 0 2rem 0 0;
          justify-content: flex-end;
        `
      : css`
          margin: 0 0 0 2rem;
          justify-content: flex-start;
        `}
  color: #777;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  background: none;
  border: 0;
  padding: 0;
  margin-top: 1.5rem;
  font-size: 1rem;
  width: 100%;
`

export const FirstNCut = styled.div<{ weekly?: boolean }>`
  ${({ weekly }) =>
    weekly
      ? css`
          margin-left: 5rem;
        `
      : css`
          margin-left: 5rem;
        `}

  position: relative;
  display: inline-block;
  width: 80%;
  max-width: 100%;
  grid-area: right;

  background: #fff;
  padding: 0;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.06);

  --base-h: clamp(260px, 48vh, 520px);
  --thumb-h: var(--base-h);

  &.portrait {
    --thumb-h: calc(var(--base-h) * 1.3);
  }

  &::after {
    content: '';
    position: absolute;
    left: 10%;
    right: 10%;
    bottom: -18px;
    height: 36px;
    filter: blur(18px);
    background: rgba(0, 0, 0, 0.22);
    border-radius: 50%;
    z-index: -1;
  }

  max-width: fit-content;

  video,
  img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: var(--thumb-h);
    object-fit: contain;
    margin: 0 auto;
  }

  &:hover ${Overlay} {
    opacity: 1;
  }
`

export const EmptyContainer = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-align: center;
  color: #555;
  font-size: 1.1rem;
  border-radius: 12px;
  padding: 2rem;
`

export const EmptyText = styled.p`
  color: #555;
  font-size: 0.8rem;
  cursor: pointer;
`

export const SubWrapper = styled.div``

export const Row = styled.div`
  scroll-snap-align: start;
  scroll-snap-stop: always;
  min-height: calc(100svh - 150px);
  box-sizing: border-box;

  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;

  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  grid-template-rows: 1fr;
  column-gap: 1.5rem;
  row-gap: 0;

  justify-items: center;
  align-items: center;
  place-content: center;

  & > * {
    opacity: 0;
    transform: translateY(28px);
    transition:
      opacity 420ms ease,
      transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1);
    will-change: transform, opacity;
  }

  &.in > * {
    opacity: 1;
    transform: translateY(0);
  }

  &.in > *:nth-child(1) {
    transition-delay: 60ms;
  }
  &.in > *:nth-child(2) {
    transition-delay: 140ms;
  }
  &.in > *:nth-child(3) {
    transition-delay: 220ms;
  }
`
