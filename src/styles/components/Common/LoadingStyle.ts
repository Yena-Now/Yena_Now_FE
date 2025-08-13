import styled, { keyframes } from 'styled-components'

export const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fafafa;
`

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top-color: #555;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

export const LoadingText = styled.p`
  margin-top: 16px;
  font-size: 1.2rem;
  color: #555;
`
