import styled from 'styled-components'

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
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
  --thumb-h: 240px;
  position: relative;
  display: inline-block;
  width: auto;
  height: auto;
  max-width: 100%;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  margin: 0 1rem 1rem 0;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.06);

  &:hover ${Overlay} {
    opacity: 1;
  }
`

export const Image = styled.img`
  display: block;
  height: var(--thumb-h);
  width: auto;
  max-width: 100%;
  object-fit: contain;
`

export const Video = styled.video`
  display: block;
  height: var(--thumb-h);
  width: auto;
  max-width: 100%;
  object-fit: contain;
`

export const LikeCount = styled.span`
  display: inline-flex;
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
