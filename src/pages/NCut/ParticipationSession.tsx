import React, { useState, useRef } from 'react'
import * as G from '@styles/components/NCut/Create/GlobalStyle'
import * as S from '@styles/pages/NCut/ParticipationSessionStyle'
import ParticipationModal from '@components/NCut/Enter/EnterConfirmModal'
import { useNavigate } from 'react-router-dom'

import { FiUserPlus } from 'react-icons/fi'
import { FaCheck } from 'react-icons/fa6'
import { useToast } from '@/hooks/useToast'
import { nCutAPI } from '@/api/ncut'

const ParticipationSession: React.FC = () => {
  const { error } = useToast()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExist, setIsExist] = useState(false)
  const [sessionCode, setSessionCode] = useState<string[]>(
    new Array(6).fill(''),
  )
  const [isChecking, setIsChecking] = useState(false)
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

  const handleJoinSession = async () => {
    const sessionId = sessionCode.join('')
    if (sessionId.length !== 6) {
      error('6자리의 세션 ID를 모두 입력해주세요.')
      return
    }

    setIsChecking(true)
    try {
      const response = await nCutAPI.enterSession({
        roomCode: sessionId,
      })

      setIsExist(true)
      setIsModalOpen(true)

      sessionStorage.setItem('sessionToken', response.token)
      sessionStorage.setItem('sessionRoomCode', sessionId)
      sessionStorage.setItem('backgroundUrl', response.backgroundUrl)
      sessionStorage.setItem('takeCnt', response.takeCnt.toString())
      sessionStorage.setItem('cutCnt', response.cutCnt.toString())
      sessionStorage.setItem('timeLimit', response.timeLimit.toString())
    } catch {
      setIsExist(false)
      setIsModalOpen(true)
    } finally {
      setIsChecking(false)
    }
  }

  const handleConfirmJoin = () => {
    const token = sessionStorage.getItem('sessionToken')
    const roomCode = sessionStorage.getItem('sessionRoomCode')
    const backgroundUrl = sessionStorage.getItem('backgroundUrl')
    const takeCnt = sessionStorage.getItem('takeCnt')
    const cutCnt = sessionStorage.getItem('cutCnt')
    const timeLimit = sessionStorage.getItem('timeLimit')

    if (token && roomCode) {
      // Session 페이지로 이동
      navigate('/film/room/' + roomCode, {
        state: {
          roomCode: roomCode,
          token: token,
          backgroundImageUrl: backgroundUrl || '',
          takeCnt: takeCnt ? parseInt(takeCnt, 10) : 0,
          cutCnt: cutCnt ? parseInt(cutCnt, 10) : 0,
          timeLimit: timeLimit ? parseInt(timeLimit, 10) : 0,
          isHost: false,
        },
      })
    }

    // 임시 저장된 데이터 정리
    sessionStorage.removeItem('sessionToken')
    sessionStorage.removeItem('sessionRoomCode')
    sessionStorage.removeItem('backgroundUrl')
    sessionStorage.removeItem('takeCnt')
    sessionStorage.removeItem('cutCnt')
    sessionStorage.removeItem('timeLimit')

    setIsModalOpen(false)
  }

  const handleCancelJoin = () => {
    sessionStorage.removeItem('sessionToken')
    sessionStorage.removeItem('sessionRoomCode')
    sessionStorage.removeItem('backgroundUrl')
    sessionStorage.removeItem('takeCnt')
    sessionStorage.removeItem('cutCnt')
    sessionStorage.removeItem('timeLimit')
    setIsModalOpen(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <G.NCutCreateLayout>
      <G.NcutCreateContainer>
        <G.NCutCreateIcon>
          <FiUserPlus
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
                  onChange={(e) => handleCodeChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  maxLength={1}
                />
              ))}
            </S.CodeContainer>
          </S.LastStepContainer>
        </G.NCutCreateContentContainer>
      </G.NcutCreateContainer>
      <G.NCutNextButton
        onClick={handleJoinSession}
        disabled={isChecking || sessionCode.join('').length !== 6}
      >
        <FaCheck
          style={{
            fontSize: '24px',
          }}
        />
      </G.NCutNextButton>

      <ParticipationModal
        onClose={handleCloseModal}
        isExist={isExist}
        isOpen={isModalOpen}
        onConfirm={handleConfirmJoin}
        onCancel={handleCancelJoin}
      />
    </G.NCutCreateLayout>
  )
}

export default ParticipationSession
