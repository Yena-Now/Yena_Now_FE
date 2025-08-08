import React, { useEffect, useRef, useState } from 'react'
import type { ChatProps } from '@/types/Chat'
import * as S from '@styles/components/NCut/ChatStyle'
import { IoSend } from 'react-icons/io5'

export const Chat: React.FC<ChatProps> = ({
  messages,
  onSendMessage,
  currentUserIdentity,
}) => {
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim())
      setInputMessage('')
    }
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <S.ChatContainer>
      <S.ChatHeader>채팅</S.ChatHeader>
      <S.MessagesContainer>
        {messages.map((msg, index) => (
          <S.MessageItem
            key={index}
            isOwnMessage={msg.participantIdentity === currentUserIdentity}
          >
            <S.MessageHeader>
              <S.ParticipantName>
                {msg.participantIdentity === currentUserIdentity
                  ? '나'
                  : msg.participantIdentity}
              </S.ParticipantName>
              <S.MessageTime>{formatTime(msg.timestamp)}</S.MessageTime>
            </S.MessageHeader>
            <S.MessageContent>{msg.message}</S.MessageContent>
          </S.MessageItem>
        ))}
        <div ref={messagesEndRef} />
      </S.MessagesContainer>
      <S.ChatInputContainer>
        <S.ChatInput
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e as unknown as KeyboardEvent)}
          placeholder="메시지를 입력하세요..."
          maxLength={500}
        />
        <S.SendButton
          onClick={handleSendMessage}
          disabled={!inputMessage.trim()}
        >
          <IoSend />
        </S.SendButton>
      </S.ChatInputContainer>
    </S.ChatContainer>
  )
}
