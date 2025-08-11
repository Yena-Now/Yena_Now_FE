import styled, { css } from 'styled-components'

export const MainWrapper = styled.div<{ weekly?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  height: calc(100vh - 200px);
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
      : css``}

  width: 80%;
  grid-area: right;
  display: block;
  background: #fff;
  padding: 0;
  border-radius: 16px;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;

  --base-h: clamp(260px, 48vh, 520px);

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

  video,
  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: inherit;
    background: transparent;
    margin: 0;
    padding: 0;
  }

  video {
    object-fit: contain;
  }

  &.landscape video {
    height: var(--base-h);
    width: 100%;
  }

  &.portrait video {
    height: calc(var(--base-h) * 1.3);
  }
  display: flex;
  flex-direction: column;

  & > * {
    margin: 0;
    padding: 0;
  }
`
export const EmptyText = styled.div`
  min-height: '60vh';
  display: 'grid';
  place-items: 'center';
  gap: '0.5rem';
  text-align: 'center';
`
