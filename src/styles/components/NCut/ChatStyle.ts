import styled from 'styled-components'

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  max-height: 450px;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
`

export const ChatHeader = styled.div`
  padding: 12px 16px;
  background-color: #6c757d;
  color: white;
  font-weight: 600;
  text-align: center;
`

export const MessagesContainer = styled.div`
  flex: 1;
  padding: 8px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const MessageItem = styled.div<{ isOwnMessage: boolean }>`
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${({ isOwnMessage }) =>
    isOwnMessage ? '#007bff' : '#ffffff'};
  color: ${({ isOwnMessage }) => (isOwnMessage ? 'white' : 'black')};
  align-self: ${({ isOwnMessage }) =>
    isOwnMessage ? 'flex-end' : 'flex-start'};
  max-width: 70%;
  border: 1px solid #dee2e6;
`

export const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`

export const ParticipantName = styled.span`
  font-size: 12px;
  font-weight: 600;
  opacity: 0.8;
`

export const MessageTime = styled.span`
  font-size: 10px;
  opacity: 0.6;
`

export const MessageContent = styled.div`
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
`

export const ChatInputContainer = styled.div`
  display: flex;
  padding: 12px;
  border-top: 1px solid #dee2e6;
  gap: 8px;
`

export const ChatInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #007bff;
  }
`

export const SendButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`
