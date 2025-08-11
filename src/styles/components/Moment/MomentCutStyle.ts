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
  width: 200px;
  aspect-ratio: 1 / 1; /* 정사각형 카드 */
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
  object-fit: contain; /* 크롭 없이 가운데 배치 */
  display: block;
`

export const Video = styled.video`
  border: 1px solid red;
  width: auto;
  max-height: 100%;
  object-fit: contain; /* 크롭 없이 가운데 배치 */
  display: block;
`

export const LikeCount = styled.span`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
`
export const LikeIcon = styled.span`
  line-height: 1;
  transform: translateY(1px);
`
export const LikeNumber = styled.span`
  margin-left: 0.3rem;
  line-height: 1;
`
