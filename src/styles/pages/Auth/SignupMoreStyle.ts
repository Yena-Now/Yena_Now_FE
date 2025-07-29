import styled from 'styled-components'

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`
export const ProfileImageWrapper = styled.div`
  position: absolute;
  top: 15%;

  @media (max-width: 768px) {
    top: 12%;
  }

  @media (max-width: 480px) {
    top: 10%;

    img {
      width: 100px !important;
      height: 100px !important;
    }
  }
`

export const InputContainer = styled.div`
  position: absolute;
  top: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    top: 30%;
    max-width: 100%;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    top: 25%;
    gap: 0.8rem;
  }
`

export const InputGroup = styled.div`
  width: 100%;
  max-width: 400px;
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
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
    height: 50px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    height: 45px;
    padding-left: 12px;
    font-size: 0.85rem;
  }
`

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  height: 50%;
  min-width: 80px;
  max-width: 120px;
  padding-right: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 2px solid #000;

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #ddd;
    padding: 4px 0;
    margin: 0;
    justify-content: flex-start;
  }
`

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  margin-left: 16px;
  padding: 10px 12px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 10px;
  }

  @media (max-width: 480px) {
    margin-left: 0;
    width: 100%;
    box-sizing: border-box;
  }
`

export const NicknameWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  height: 60px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.5rem;
  padding-left: 14px;
  font-size: 1rem;
  background: #fff;
  outline: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
    height: 50px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    height: 45px;
    padding-left: 12px;
    font-size: 0.85rem;
  }
`

export const NicknameVerifyButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  margin-left: 8px;

  @media (max-width: 480px) {
    width: 100%;
    margin-left: 0;
    justify-content: center;
  }
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
  font-size: 1rem;
  cursor: pointer;
  margin-left: 8px;
  white-space: nowrap;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-left: 0;
    height: 40px;
  }
`

export const GenderGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 16px;

  @media (max-width: 480px) {
    justify-content: space-around;
    margin: 0;
    width: 100%;
  }
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
  overflow-y: scroll;
  x-webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    border: 1px solid #222;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 10px;
  }

  @media (max-width: 480px) {
    margin: 0 4px;
    width: 80px;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media (max-width: 480px) {
    justify-content: center;
  }
`

export const Button = styled.button`
  position: relative;
  background: #222;
  color: #fff;
  font-weight: 500;
  border-radius: 8px;
  padding: 12px 0;
  border: none;
  font-size: 17px;
  cursor: pointer;
  width: 20%;
  min-width: 120px;

  @media (max-width: 768px) {
    width: 30%;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    width: 80%;
    font-size: 15px;
  }
`
