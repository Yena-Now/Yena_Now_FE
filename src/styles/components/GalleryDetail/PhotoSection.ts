import styled from 'styled-components'

export const PhotoContainer = styled.div``

export const PhotoFrame = styled.div`
  width: 550px;
  height: 600px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

export const Photo = styled.img`
  max-width: 100%;
  max-height: 100%;
  background-size: contain;
  background-color: black;
`

export const Video = styled.video`
  max-width: 100%;
  max-height: 100%;
  background-size: contain;
  background-color: black;
`
