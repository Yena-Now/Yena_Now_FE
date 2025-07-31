import React, { useState, useRef } from 'react'
import * as G from '@styles/components/NCut/Create/GlobalStyle'
import * as S from '@styles/pages/NCut/ParticipationSessionStyle'
import ParticipationModal from '@components/NCut/Enter/EnterConfirmModal'

import { MdOutlineSmokingRooms } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa6'
import { useToast } from '@/hooks/useToast'

const ParticipationSession: React.FC = () => {
  const { error, success } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExist, setIsExist] = useState(false)
  const [sessionCode, setSessionCode] = useState<string[]>(new Array(6).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target
    if (/^[0-9]$/.test(value) || value === '') {
      const newCode = [...sessionCode]
      newCode[index] = value
      setSessionCode(newCode)

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && !sessionCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleJoinSession = () => {
    const sessionId = sessionCode.join('')
    if (sessionId.length !== 6) {
      error('6자리의 세션 ID를 모두 입력해주세요.')
      return
    }
    if (sessionId === '123456') {
      setIsExist(true)
      setIsModalOpen(true)
    } else {
      setIsExist(false)
      setIsModalOpen(true)
    }
  }

  const handleConfirmJoin = () => {
    success('세션에 참여했습니다.')
    setIsModalOpen(false)
  }

  const handleCancelJoin = () => {
    error('세션 참여를 취소했습니다.')
    setIsModalOpen(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <G.NCutCreateLayout>
      <G.NcutCreateContainer>
        <G.NCutCreateIcon>
          <MdOutlineSmokingRooms
            style={{
              width: '100px',
              height: '100px',
            }}
          />
        </G.NCutCreateIcon>
        <G.NCutCreateContentContainer>
          <G.NcutCreateHeader>촬영 부스 참가</G.NcutCreateHeader>
          <G.NcutCreateDescription>
            초대 코드를 입력해주세요.
          </G.NcutCreateDescription>
          <S.LastStepContainer>
            <S.CodeContainer>
              {sessionCode.map((digit, index) => (
                <S.CodeDigit
                  key={index}
                  type="text"
                  value={digit}
                  onChange={e => handleCodeChange(e, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  ref={el => {inputRefs.current[index] = el}}
                  maxLength={1}
                  style={{
                    padding: '10px',
                    fontSize: '16px',
                    width: '40px',
                    textAlign: 'center',
                  }}
                />
              ))}
            </S.CodeContainer>
          </S.LastStepContainer>
        </G.NCutCreateContentContainer>
      </G.NcutCreateContainer>
      <G.NCutNextButton onClick={handleJoinSession}>
        <FaCheck
          style={{
            fontSize: '24px',
          }}
        />
      </G.NCutNextButton>

      <ParticipationModal onClose={handleCloseModal} isExist={isExist} isOpen={isModalOpen} onConfirm={handleConfirmJoin} onCancel={handleCancelJoin}/>
    </G.NCutCreateLayout>
  )
}

export default ParticipationSession