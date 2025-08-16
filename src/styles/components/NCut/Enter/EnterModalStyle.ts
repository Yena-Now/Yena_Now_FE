import styled from 'styled-components'

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  height: 200px;
  text-align: center;
  border: #000 solid 1px;
`

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  background: none;
  border: none;
  cursor: pointer;
`

export const ModalTitle = styled.h2`
  margin: 0 0 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`

export const ModalDescription = styled.p`
  margin: 0 0 20px;
  font-size: 16px;
  color: #666;
`

export const ModalButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`

export const ModalButton = styled.button`
  width: 100px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &.confirm {
    background-color: #f9be08;
    color: #333;
  }

  &.cancel {
    background-color: red;
    color: #333;
  }
`

export const ErrorIcon = styled.div`
  font-size: 50px;
  color: red;
  margin-bottom: 20px;
`
