import styled from 'styled-components'

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
  pointer-events: none;
`

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  scroll-snap-align: start;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;

  &:hover ${Overlay} {
    opacity: 1;
  }
`

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
`

export const Video = styled.video`
  width: auto;
  max-height: 100%;
  object-fit: contain;
  display: block;
`

export const LikeCount = styled.span`
  display: flex;
  align-items: center;
`
export const LikeIcon = styled.span`
  line-height: 1;
  transform: translateY(1px);
`
export const LikeNumber = styled.span`
  margin-left: 0.3rem;
  line-height: 1;
`
