import styled from 'styled-components'

export const TimeDisplayContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TimeInputContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`

export const TimeInput = styled.input`
  font-size: 72px;
  font-weight: bold;
  color: #333;
  border: none;
  background: transparent;
  text-align: center;
  width: 120px;
  outline: none;
  text-decoration: underline;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`

export const TimeUnit = styled.span`
  font-size: 24px;
  color: #666;
  font-weight: 500;
`
