import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 90px;
`

export const LeftArea = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`
export const NameBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  margin-top: 35px;
`

export const Nickname = styled.div`
  font-weight: 700;
  font-size: 36px;
`

export const Name = styled.div`
  font-size: 18px;
  color: #888;
`

export const CountRow = styled.div`
  display: flex;
  gap: 150px; /* 카운트 사이 간격 */
  align-items: baseline;
  margin-top: 70px;
  margin-right: 150px;
`

export const CountItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding-bottom: 7px;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 150px; /* ← 밑줄 길이 */
    height: 2px;
    background-color: #ddd;
  }
`

export const CountNum = styled.div`
  font-weight: bold;
  font-size: 24px;
  padding-bottom: 5px;
`

export const CountLabel = styled.div`
  font-size: 16px;
  color: #888;
`

export const MyBtn = styled.button`
  margin-top: 8px;
  background-color: #f9be08;
  color: #444444;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
`

export const FollowBtn = styled(MyBtn)`
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
`
