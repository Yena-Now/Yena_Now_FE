import styled from 'styled-components'

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`
export const InputGroup = styled.div`
  width: 28vw;
  height: 60px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0 14px;
  font-size: 1rem;
  background: #fff;
  outline: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
  height: 50%;
  width: 100px;
  padding-right: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 2px solid #000 ;
`

export const Input = styled.input`
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  flex: 1;
  margin-left: 8px;
`

export const NicknameVerifyButton = styled.button`
  background: #222;
  color: #fff;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
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
  margin: 0 16px;
`

export const Select = styled.select`
  margin-left: 8px;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  flex-shrink: 0;
  margin-right: 8px;

  &:focus {
    border: 1px solid #222;
  }
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
  width: 20%;
  transform: translateX(140%);
`
