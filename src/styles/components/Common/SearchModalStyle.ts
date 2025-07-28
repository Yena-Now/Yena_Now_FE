import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`

export const Modal = styled.div`
  width: 460px;
  height: 610px;
  padding: 20px;
  border-radius: 16px;
  background-color: #f8f8f8;
  font-family: 'Noto Sans KR', sans-serif;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`

export const CloseButton = styled.button`
  position: absolute;
  top: 25px;
  right: 30px;
  background: none;
  border: none;
  font-size: 30px;
  font-weight: bold;
  color: #444;
  cursor: pointer;
`

export const SearchInput = styled.input`
  width: 70%;
  height: 45px;
  padding: 0 40px 0 36px;
  border: none;
  border-radius: 8px;
  background-color: white;
  font-size: 14px;
  background-image: url('/icons/search.svg');
  background-repeat: no-repeat;
  background-position: 10px center;
  box-shadow: 0 0 0 1px #ddd;
  outline: none;
`

export const UserList = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  height: 470px;
  overflow-y: auto;
`

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  transition: background 0.2s;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    background-color: #f0f0f0;
  }
`

export const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ddd;
  margin: 0 0 0 20px;
`

export const UserInfo = styled.div`
  padding-left: 20px;
  flex-grow: 1;
`

export const Nickname = styled.div`
  font-weight: 600;
  font-size: 17px;
  color: #222;
`

export const Name = styled.div`
  padding: 7px 1px;
  font-size: 14px;
  color: #666;
  margin-top: 2px;
`
