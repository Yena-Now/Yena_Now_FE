export interface ChatMessage {
  participantIdentity: string
  message: string
  timestamp: number
}

export interface ChatProps {
  messages: ChatMessage[]
  onSendMessage: (message: string) => void
  currentUserIdentity?: string
}
