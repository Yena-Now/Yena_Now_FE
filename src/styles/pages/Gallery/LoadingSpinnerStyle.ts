import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const Spinner = styled.div`
  width: 4em;
  height: 4em;
  border: 6px solid white;
  border-radius: 50%;
  border-color: white white transparent transparent;
  animation: ${spin} 1s linear infinite;
`
