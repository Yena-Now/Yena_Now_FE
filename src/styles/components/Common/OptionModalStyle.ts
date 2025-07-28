import styled from 'styled-components'

export const OverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`
export const Container = styled.div`
  width: 530px;
  height: 180px;
  border-radius: 10px;
  background-color: #fff;
  display: fixed;
`

export const TopBox = styled.div`
  height: 20%;
  border-bottom: 1px solid #dbdbdb;
  margin: 0px 10px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`

export const CloseIcon = styled.span`
  cursor: pointer;
`

export const ContentBox = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const TitleBox = styled.span`
  height: 50%;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Content = styled.div`
  height: 50%;
`
