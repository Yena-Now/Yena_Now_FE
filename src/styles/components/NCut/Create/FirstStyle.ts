import styled from 'styled-components'

export const ImageUploadContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 350px;
  margin-top: 20px;
`

export const ImageUploadLabel = styled.label`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f0f0;
  border-radius: 5%;
  border: 0.2px solid #000;
`

export const ImageUploadInput = styled.input`
  display: none;
`

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5%;
`
