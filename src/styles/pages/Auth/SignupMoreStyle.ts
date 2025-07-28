import styled from 'styled-components'

export const ProfileImageButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 40px;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
`

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  flex: 1;
`

export const NicknameVerifyButton = styled.button`
  background: #222;
  color: #fff;
  font-weight: 500;
  border-radius: 8px;
  padding: 10px 16px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-left: 8px;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`

export const GenderGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const Button = styled.button`
  margin-top: 14px;
  background: #222;
  color: #fff;
  font-weight: 500;
  border-radius: 8px;
  padding: 12px 0;
  border: none;
  font-size: 17px;
  cursor: pointer;
`
