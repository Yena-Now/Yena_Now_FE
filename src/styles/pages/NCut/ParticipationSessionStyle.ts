import styled from 'styled-components'

export const LastStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
`

export const CodeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 30px 0;
`

export const CodeDigitContainer = styled.div`
  display: flex;
  gap: 8px;
`

export const CodeDigit = styled.input`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`
