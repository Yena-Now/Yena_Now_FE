import styled, { keyframes } from 'styled-components'

export const Conainter = styled.div`
  width: 400px;
  border: 1px solid rgb(44, 44, 44, 0.2);
  border-radius: 10px;
  overflow: hidden; // 추가!
  position: relative; // z-index 컨트롤용
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    z-index: 1;
  }
`

export const PhotoWrapper = styled.div`
  background-color: #2c2c2c;
  width: 400px;
  height: 240px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  img,
  video {
    width: 400px;
    height: 100%;
    object-fit: contain;
  }
`

export const Photo = styled.img`
  width: 400px;
  height: 100%;
  object-fit: contain;
`

export const RelayIcon = styled.span`
  position: absolute;
  margin: 10px;
  z-index: 100;
`
export const InfoWrapper = styled.div`
  height: 40px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
`

export const Box = styled.div`
  display: flex;
  align-items: center;
`

export const ProfileImage = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
`

export const UserName = styled.span`
  font-size: 14px;
  padding: 5px;
`

export const likeText = styled.span`
  font-size: 14px;
  padding: 5px 5px 7px 5px;
`

// export const loadingOverlaySpinnerAnimation = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `
