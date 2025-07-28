import styled from 'styled-components'

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
`

export const SignupContainer = styled.div`
  position: fixed;
  background: #fff0c3;
  width: 42vw;
  height: 80vh;
  border-radius: 32px;
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Input = styled.input`
  width: 28vw;
  height: 60px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0 14px;
  font-size: 1rem;
  background: #fff;
  outline: none;
  box-sizing: content-box;
`

export const EmailVerifyContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`

export const EmailVerifyInput = styled.input`
  width: 20vw;
  height: 60px;
  margin-right: 1vw;
  line-height: 60px;
  border: none;
  border-radius: 0.5rem;
  padding: 0 14px;
  font-size: 1rem;
  background: #fff;
  outline: none;
  box-sizing: content-box;
`

export const EmailVerifyButton = styled.button<{ disabled?: boolean | false }>`
  width: 7vw;
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
`

export const Button = styled.button<{ disabled?: boolean | false }>`
  width: 28vw;
  height: 50px;
  background: ${({ disabled }) => (disabled ? '#e7e7e7' : '#575551')};
  color: ${({ disabled }) => (disabled ? '#afb1b5' : '#fff')};
  border: none;
  border-radius: 0.5rem;
  padding: 0 14px;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  box-sizing: content-box;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`
