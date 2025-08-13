import styled from 'styled-components'

export const BackgroundImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  gap: 8px;
`

export const BackgroundImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  cursor: pointer;
  border: 0.1px solid black;
`
