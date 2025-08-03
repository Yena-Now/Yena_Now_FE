import styled from 'styled-components'

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
`

export const SignupContainer = styled.div`
  position: relative;
  background: #fff0c3;
  width: 100%;
  max-width: 600px;
  min-height: 80vh;
  border-radius: 32px;
  padding: 3rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 95%;
    min-height: 85vh;
    padding: 2rem 1rem;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    width: 100%;
    min-height: 90vh;
    padding: 1.5rem 1rem;
    border-radius: 16px;
  }
`

export const LogoWrapper = styled.div`
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px) {
    top: 3%;
  }
`

export const Input = styled.input`
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
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
    height: 50px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    height: 45px;
    padding: 0 12px;
    font-size: 0.85rem;
  }
`

export const EmailVerifyContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 400px;
  gap: 1rem;

  @media (max-width: 768px) {
    max-width: 100%;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

export const EmailVerifyInput = styled.input`
  flex: 1;
  height: 60px;
  border: none;
  border-radius: 0.5rem;
  padding: 0 14px;
  font-size: 1rem;
  background: #fff;
  outline: none;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 50px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 45px;
    padding: 0 12px;
    font-size: 0.85rem;
  }
`

export const EmailVerifyButton = styled.button<{ disabled?: boolean | false }>`
  width: 120px;
  height: 60px;
  background: #575551;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  box-sizing: border-box;
  cursor: pointer;

  &:disabled {
    background: #e7e7e7;
    color: #afb1b5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 50px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 45px;
    font-size: 0.85rem;
  }
`

export const Button = styled.button<{ disabled?: boolean | false }>`
  width: 100%;
  max-width: 400px;
  height: 50px;
  background: ${({ disabled }) => (disabled ? '#e7e7e7' : '#575551')};
  color: ${({ disabled }) => (disabled ? '#afb1b5' : '#fff')};
  border: none;
  border-radius: 0.5rem;
  padding: 0 14px;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  box-sizing: border-box;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    height: 45px;
    font-size: 0.85rem;
  }
`

export const AuthLogin = styled.img`
  width: 50%;
  
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 60%;
  }
`


export const ErrorMessage = styled.div`
  position: absolute;
  top: 80%;
  color: #ff4d4f;
  font-size: 0.9rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
  text-align: center;
`