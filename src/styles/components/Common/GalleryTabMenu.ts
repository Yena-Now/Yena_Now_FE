import styled from 'styled-components'

export const GalleryTabMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`

export const GalleryTab = styled.span`
  display: flex;
  padding: 50px 0 20px 90px;
  font-size: 16px;
  color: gray;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &.active {
    color: black;
    font-weight: 450;
  }
`

export const Divider = styled.hr`
  border: none;
  border-bottom: 2px solid #ddd;
  margin-bottom: 30px;
  width: 90%;
`
