import styled from 'styled-components'

export const GalleryTabWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 80px 20px 20px 20px;
`

export const GalleryTabMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 8px;
`

export const GalleryTab = styled.span`
  display: flex;
  padding: 50px 0 20px 20px;
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
  width: 100%;
`
