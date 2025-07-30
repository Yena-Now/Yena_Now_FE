import styled from 'styled-components'

export const text = styled.span`
  display: flex;
  padding: 50px 0 20px 90px;
  font-size: 16px;
`

export const Divider = styled.hr`
  border: none;
  border-bottom: 2px solid #ddd;
  margin-bottom: 30px;
  width: 90%;
`
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`

export const FriendText = styled.span`
  display: flex;
  padding: 50px 0 20px 60px;
  font-size: 16px;
  color: gray;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
