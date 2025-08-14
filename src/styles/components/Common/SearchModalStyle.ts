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
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  & > hr {
    flex: 0 0 auto;
    height: 1px;
    border: 0;
    background: #ddd;
    margin: 5px;
  }
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
  padding: 0 40px 0 20px;
  margin-bottom: 10px;
  border: none;
  border-radius: 8px;
  background-color: white;
  font-size: 14px;
  background-repeat: no-repeat;
  background-position: 10px center;
  box-shadow: 0 0 0 1px #ddd;
  outline: none;
`

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
  font-size: 16px;
  color: #222;
  letter-spacing: 0.5px;
`

export const Name = styled.span`
  font-size: 14px;
  color: #666;
  margin-right: 5px;
  font-weight: 500;
  letter-spacing: 0.5px;
`

export const Empty = styled.p`
  text-align: center;
  padding: 24px 0;
  font-size: 14px;
  color: #6b7280;
  user-select: none;
`

export const Error = styled.p`
  margin: 12px 16px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #fecdca;
  background: #fef3f2;
  color: #d92d20;
  font-size: 14px;
  text-align: center;
  line-height: 1.35;
`

export const Following = styled.span`
  align-self: center;
  display: inline-block;
  color: #9b9b9bff;
  font-size: 12px;
  font-weight: 500;
`

export const UserState = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`
