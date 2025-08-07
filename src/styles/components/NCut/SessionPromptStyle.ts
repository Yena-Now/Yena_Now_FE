import styled from 'styled-components'

export const SessionPromptContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  padding: 20px;
`

export const SessionPromptTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`

export const SessionPromptDescription = styled.div`
  font-size: 14px;
  color: #666;
  max-width: 400px;
`

export const SessionPromptButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px
  cursor: pointer
`
