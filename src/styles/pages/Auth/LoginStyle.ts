import styled from 'styled-components'

export const Divider = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: rgba(0, 0, 0, 0.35);
  font-size: 14px;
  margin: 15px 0px;
  &:before,
  &:after {
    content: '';
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.2);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 24px;
  }
`

export const OptionSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
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
