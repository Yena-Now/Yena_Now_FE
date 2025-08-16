import styled from 'styled-components'

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`

export const ProfileImageWrapper = styled.div`
  position: absolute;
  top: 15%;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

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
  gap: 1.5rem;
  justify-content: center;
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    top: 30%;
    max-width: 100%;
    padding: 0 1rem;
    gap: 1.2rem;
  }

  @media (max-width: 480px) {
    top: 25%;
    gap: 1rem;
  }
`

export const InputGroup = styled.div`
  width: 100%;
  max-width: 400px;
  height: 56px;
  margin-bottom: 0.5rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  padding: 0 16px;
  font-size: 1rem;
  background: #fff;
  outline: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    height: 50px;
    font-size: 0.9rem;
    padding: 0 14px;
  }

  @media (max-width: 480px) {
    height: 48px;
    padding: 0 12px;
    font-size: 0.85rem;
  }
`

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  height: 50%;
  min-width: 80px;
  max-width: 120px;
  padding-right: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 2px solid #e1e5e9;
  color: #333;

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e1e5e9;
    padding: 8px 0;
    margin: 0;
    justify-content: flex-start;
    font-size: 0.9rem;
  }
`

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  margin-left: 16px;
  padding: 12px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
  background: transparent;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    background: rgba(102, 126, 234, 0.05);
  }

  &::placeholder {
    color: #a0a0a0;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 12px;
    margin-left: 12px;
  }

  @media (max-width: 480px) {
    margin-left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 8px 10px;
  }
`

export const NicknameWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  height: 56px;
  margin-bottom: 0.5rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  padding-left: 16px;
  font-size: 1rem;
  background: #fff;
  outline: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    height: 50px;
    font-size: 0.9rem;
    padding-left: 14px;
  }

  @media (max-width: 480px) {
    height: 48px;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  height: 100%;
  padding: 12px 16px;
  box-sizing: border-box;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 8px;
  white-space: nowrap;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    background: #e1e5e9;
    color: #a0a0a0;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 12px;
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
  gap: 20px;
  margin: 0 16px;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-weight: 500;
    color: #333;
    transition: color 0.3s ease;

    &:hover {
      color: #667eea;
    }

    input[type='radio'] {
      width: 18px;
      height: 18px;
      accent-color: #667eea;
      cursor: pointer;
    }
  }

  @media (max-width: 480px) {
    justify-content: space-around;
    margin: 0;
    width: 100%;
    gap: 16px;
  }
`

export const Select = styled.select`
  margin-left: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  background: rgba(102, 126, 234, 0.05);
  cursor: pointer;
  flex-shrink: 0;
  margin-right: 8px;
  overflow-y: scroll;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: all 0.3s ease;

  &:focus {
    background: rgba(102, 126, 234, 0.1);
    outline: none;
  }

  option {
    background: white;
    color: #333;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 12px;
  }

  @media (max-width: 480px) {
    margin: 0 4px;
    width: 80px;
    padding: 8px 10px;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 80%;
  transform: translateY(-1rem);

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
    padding: 14px 0;
  }

  @media (max-width: 480px) {
    width: 80%;
    font-size: 15px;
    padding: 12px 0;
  }
`
