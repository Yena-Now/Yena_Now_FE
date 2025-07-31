import styled from 'styled-components'

export const Divider = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: center;
  width: 75%;
  color: rgba(0, 0, 0, 0.35);
  font-size: 14px;
  margin-bottom: 24px;
  &:before,
  &:after {
    content: '';
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.2);
    height: 1px;
    font-size: 0;
    line-height: 0;
    margin: 0 24px;
  }
`

export const OptionSection = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 65%;
  margin-bottom: 16px;
`

export const AutoLoginBox = styled.div`
  display: flex;
  align-items: center;
`

export const CheckBox = styled.input`
  cursor: pointer;
`
export const Text = styled.label`
  font-size: 14px;
  padding-left: 2px;
  cursor: pointer;
`

export const PasswordButton = styled.button`
  padding: 2px;
  border: none;
  outline: none;
  background-color: inherit;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export const KakaoLogin = styled.button`
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.75rem auto;
  padding: 0.75rem 0.5rem;
  background-color: #fee500;
  color: #000000;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(239, 223, 72);
  }
  @media (max-width: 768px) {
    width: 60%;
  }
`

export const GoogleLogin = styled.button`
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.75rem auto;
  padding: 0.75rem 0.5rem;
  background-color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
  @media (max-width: 768px) {
    width: 60%;
  }
`

export const ButtonText = styled.span`
  color: rgba(0, 0, 0, 0.54);
  width: 80%;
`
