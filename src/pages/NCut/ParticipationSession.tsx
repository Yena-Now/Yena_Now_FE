import React, { useState } from 'react'
import * as G from '@styles/components/NCut/Create/GlobalStyle'
import * as S from '@styles/pages/NCut/ParticipationSessionStyle'

import { MdOutlineSmokingRooms } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa6'
import { useToast } from '@/hooks/useToast'

const ParticipationSession: React.FC = () => {
  const { error, success } = useToast()
  const [sessionId, setSessionId] = useState('')

  const handleSessionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionId(e.target.value)
  }

  const handleJoinSession = () => {
    if (!sessionId) {
      error('세션 ID를 입력해주세요.')
      return
    }
    if (sessionId === '123456') {
      success('세션에 성공적으로 참여했습니다.')
    }
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
              <S.CodeDigit
                type="text"
                value={sessionId}
                onChange={handleSessionIdChange}
                placeholder="세션 ID 입력"
                style={{ padding: '10px', fontSize: '16px' }}
              />
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
    </G.NCutCreateLayout>
  )
}

export default ParticipationSession
