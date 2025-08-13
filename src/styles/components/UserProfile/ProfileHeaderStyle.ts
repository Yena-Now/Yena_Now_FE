import styled from 'styled-components'

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-bottom: 1px solid #eee;
`

const Info = styled.div`
  display: flex;
  align-items: center;
`

const NameItem = styled.div`
  margin-left: 12px;
`

const Nickname = styled.div`
  font-weight: bold;
`

const Name = styled.div`
  font-size: 12px;
  color: #888;
`

const CountRow = styled.div`
  display: flex;
  margin: 12px 0;
`

const CountItem = styled.div`
  display: flex;
  align-items: center;
`

const CountNum = styled.div`
  font-weight: bold;
`

const CountLabel = styled.div`
  font-size: 12px;
  color: #888;
`

const ButtonItem = styled.div`
  margin-top: 12px;
`

const MyBtn = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`

const FollowBtn = styled.button`
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`

export {
  HeaderWrapper,
  Info,
  NameItem,
  Nickname,
  Name,
  CountRow,
  CountItem,
  CountNum,
  CountLabel,
  ButtonItem,
  MyBtn,
  FollowBtn,
}
