import React, { useState } from 'react'
import * as G from '@styles/components/NCut/Create/GlobalStyle'
import { nCutAPI } from '@/api/ncut'
import { useToast } from '@/hooks/useToast'
import { useNavigate } from 'react-router-dom'

import { MdNavigateNext, MdOutlineSmokingRooms } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa6'
import First from '@components/NCut/Create/First'
import Second from '@components/NCut/Create/Second'
import Third from '@components/NCut/Create/Third'
import Fourth from '@components/NCut/Create/Fourth'
import Fifth from '@components/NCut/Create/Fifth'
import Last from '@components/NCut/Create/Last'

const CreateSession: React.FC = () => {
  const { error } = useToast()
  const navigate = useNavigate()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [formData, setFormData] = useState({
    backgroundImage: null as File | null,
    backgroundImageUrl: null as string | null,
    selectedFilter: 'basic',
    isImageUploaded: false,
    takeCnt: 6,
    cutCnt: 2,
    timeLimit: 10,
  })
  const [roomCode, setRoomCode] = useState('')
  const [sessionToken, setSessionToken] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateSession = async () => {
    setIsCreating(true)
    try {
      const response = await nCutAPI.createSession({
        backgroundUrl: formData.backgroundImageUrl || '',
        takeCnt: formData.takeCnt,
        cutCnt: formData.cutCnt,
        timeLimit: formData.timeLimit,
      })

      setRoomCode(response.roomCode)
      setSessionToken(response.token)
      setCurrentIndex(pages.length - 1) // Last 컴포넌트로 이동
    } catch (err) {
      error(`세션 생성 실패: ${err}`)
    } finally {
      setIsCreating(false)
    }
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, pages.length - 1))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleFormDataChange = (newData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const handleJoinSession = () => {
    if (roomCode && sessionToken) {
      navigate('/film/room/' + roomCode, {
        state: {
          roomCode: roomCode,
          token: sessionToken,
          isHost: true,
        },
      })
    }
  }

  const pages = [
    <First
      backgroundImageUrl={formData.backgroundImageUrl}
      isImageUploaded={formData.isImageUploaded}
      onFormDataChange={handleFormDataChange}
    />,
    <Second
      backgroundImageUrl={formData.backgroundImageUrl}
      isImageUploaded={formData.isImageUploaded}
      onFormDataChange={handleFormDataChange}
    />,
    <Third onFormDataChange={handleFormDataChange} />,
    <Fourth onFormDataChange={handleFormDataChange} />,
    <Fifth onFormDataChange={handleFormDataChange} />,
    <Last sessionId={roomCode} onJoinSession={handleJoinSession} />,
  ]

  return (
    <G.NCutCreateLayout>
      {currentIndex > 0 && currentIndex < pages.length - 1 && (
        <G.NCutPrvButton onClick={handlePrev}>
          <MdNavigateNext
            style={{
              width: '30px',
              height: '30px',
              color: 'white',
              transform: 'rotate(180deg)',
            }}
          />
        </G.NCutPrvButton>
      )}
      <G.NcutCreateContainer>
        {currentIndex !== pages.length - 1 && (
          <G.NCutCreateIcon>
            <MdOutlineSmokingRooms
              style={{
                width: '100px',
                height: '100px',
              }}
            />
          </G.NCutCreateIcon>
        )}
        {pages[currentIndex]}
      </G.NcutCreateContainer>
      {currentIndex < pages.length - 1 && (
        <G.NCutNextButton onClick={handleNext}>
          <MdNavigateNext
            style={{
              width: '30px',
              height: '30px',
              color: 'white',
            }}
          />
        </G.NCutNextButton>
      )}
      {currentIndex === pages.length - 2 && (
        <G.NCutNextButton onClick={handleCreateSession} disabled={isCreating}>
          <FaCheck
            style={{
              width: '30px',
              height: '30px',
              color: 'white',
            }}
          />
        </G.NCutNextButton>
      )}
    </G.NCutCreateLayout>
  )
}

export default CreateSession
