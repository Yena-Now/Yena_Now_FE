import styled from 'styled-components'

export const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 50%;
  margin-bottom: 20px;
`

export const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`

export const CounterButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`

export const CounterDisplay = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #333;
  min-width: 80px;
  text-align: center;
`
