import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/useToast'
import { useRoom } from '@/hooks/useRoom'
import { nCutAPI } from '@/api/ncut'
import SelectCuts from '@/components/NCut/Edit/SelectCuts'
import SelectFrame from '@/components/NCut/Edit/SelectFrame'
import DecorateNCut from '@/components/NCut/Edit/DecorateNCut'
import type { DecorateNCutRef } from '@/components/NCut/Edit/DecorateNCut'
import MakingThumbnail from '@/components/NCut/Edit/MakingThumbnail'
import Saving from '@/components/NCut/Edit/Saving'
import * as S from '@styles/pages/NCut/EditNCutStyle'

type LocationState = {
  sharedUrls: string[]
  cutCount: number
  roomCode: string
  isHost?: boolean
}

type FormData = {
  roomCode: string
  frameUuid: string
  contentUrls: { contentUrl: string | null; order: number }[]
}

type SaveFormData = {
  ncutUrl: string
  thumbnailUrl: string
  content: string
  visibility: 'PUBLIC' | 'PRIVATE' | 'FOLLOW'
  isRelay: boolean
}

const EditNCut: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { error } = useToast()
  const {
    allUsersSelections,
    broadcastSelection,
    leaveRoom,
    currentEditPage,
    setCurrentEditPage,
    isHost,
    setIsHost,
    broadcastPageChange,
    broadcastDecorateUpdate,
  } = useRoom()

  // DecorateNCut ref
  const decorateNCutRef = useRef<DecorateNCutRef>(null)

  // 데이터 추출을 useState로 처리
  const [sessionData, setSessionData] = useState<{
    sharedUrls: string[]
    cutCount: number
    roomCode: string
    isHostUser: boolean
  } | null>(null)

  // 세션 데이터 초기화
  useEffect(() => {
    if (location.state) {
      const state = location.state as LocationState
      setSessionData({
        sharedUrls: state.sharedUrls,
        cutCount: state.cutCount,
        roomCode: state.roomCode,
        isHostUser: state.isHost || false,
      })
    } else {
      const storedData = sessionStorage.getItem('editData')
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData)
          setSessionData({
            sharedUrls: parsed.sharedUrls,
            cutCount: parsed.cutCount,
            roomCode: parsed.roomCode,
            isHostUser: parsed.isHost || false,
          })
        } catch (error) {
          console.error('Failed to parse session data:', error)
          navigate('/')
        }
      } else {
        navigate('/')
      }
    }
  }, [location.state, navigate])

  // Host 상태 설정
  useEffect(() => {
    if (sessionData) {
      setIsHost(sessionData.isHostUser)
    }
  }, [sessionData, setIsHost])

  // 페이지 상태 동기화
  useEffect(() => {
    setCurrentEditPage(currentEditPage)
  }, [currentEditPage, setCurrentEditPage])

  // 컴포넌트 상태
  const [selectedUrls, setSelectedUrls] = useState<string[]>([])
  const [selectedFrame, setSelectedFrame] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    roomCode: '',
    frameUuid: '',
    contentUrls: [],
  })
  const [mergedUrl, setMergedUrl] = useState<string>('')
  const [, setDecoratedImageUrls] = useState<string[]>([])
  const [saveData, setSaveData] = useState<SaveFormData>({
    ncutUrl: '',
    thumbnailUrl: '',
    content: '',
    visibility: 'PUBLIC',
    isRelay: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // formData 초기화
  useEffect(() => {
    if (sessionData) {
      setFormData({
        roomCode: sessionData.roomCode,
        frameUuid: '',
        contentUrls: Array.from(
          { length: sessionData.cutCount },
          (_, index) => ({
            contentUrl: null,
            order: index + 1,
          }),
        ),
      })
    }
  }, [sessionData])

  // 핸들러 함수들
  const handleSelectCut = useCallback(
    (url: string) => {
      if (!sessionData) return

      setSelectedUrls((prev) => {
        let newSelection: string[]
        if (prev.includes(url)) {
          newSelection = prev.filter((u) => u !== url)
        } else if (prev.length < sessionData.cutCount) {
          newSelection = [...prev, url]
        } else {
          error('최대 컷 수를 초과할 수 없습니다.')
          return prev
        }

        broadcastSelection(newSelection)
        return newSelection
      })
    },
    [sessionData, error, broadcastSelection],
  )

  const handleSelectFrame = useCallback((frameId: string) => {
    setSelectedFrame(frameId)
    setFormData((prev) => ({
      ...prev,
      frameUuid: frameId,
    }))
  }, [])

  const handleDecoratedImageReady = useCallback((imageUrls: string[]) => {
    setDecoratedImageUrls(imageUrls)
  }, [])

  const handleSavingSubmit = useCallback(
    (content: string, visibility: 'PUBLIC' | 'PRIVATE' | 'FOLLOW') => {
      setSaveData((prev) => ({
        ...prev,
        content,
        visibility,
        ncutUrl: mergedUrl,
        thumbnailUrl: mergedUrl,
      }))
    },
    [mergedUrl],
  )

  const handleNext = useCallback(() => {
    if (!sessionData) return

    if (!isHost) {
      error('호스트만 다음 단계로 진행할 수 있습니다.')
      return
    }

    if (currentPage === 0 && selectedUrls.length !== sessionData.cutCount) {
      error(`컷을 ${sessionData.cutCount}개 선택해주세요.`)
      return
    }
    if (currentPage === 1 && !selectedFrame) {
      error('프레임을 선택해주세요.')
      return
    }

    if (currentPage === 0) {
      setFormData((prev) => ({ ...prev, selectedUrls }))
    }

    const nextPage = Math.min(currentPage + 1, 4) // pages.length - 1 = 4
    setCurrentPage(nextPage)
    broadcastPageChange(nextPage)
  }, [
    sessionData,
    isHost,
    currentPage,
    selectedUrls,
    selectedFrame,
    error,
    broadcastPageChange,
  ])

  const handlePrev = useCallback(() => {
    if (!isHost) {
      error('호스트만 이전 단계로 돌아갈 수 있습니다.')
      return
    }

    const prevPage = Math.max(currentPage - 1, 0)
    setCurrentPage(prevPage)
    broadcastPageChange(prevPage)
  }, [isHost, currentPage, error, broadcastPageChange])

  const handleDecorateComplete = useCallback(async () => {
    if (!sessionData) return

    if (!isHost) {
      error('호스트만 다음 단계로 진행할 수 있습니다.')
      return
    }

    if (selectedUrls.length !== sessionData.cutCount) {
      error(`컷을 ${sessionData.cutCount}개 선택해주세요.`)
      return
    }
    if (!selectedFrame) {
      error('프레임을 선택해주세요.')
      return
    }

    try {
      // DecorateNCut에서 장식된 이미지들을 S3에 업로드
      const uploadedUrls =
        await decorateNCutRef.current?.uploadDecoratedImages()

      if (!uploadedUrls || uploadedUrls.length === 0) {
        error('장식된 이미지 업로드에 실패했습니다.')
        return
      }

      console.log('Uploaded decorated images:', uploadedUrls)

      // 업로드된 URL들로 병합 요청
      const contentUrls = uploadedUrls.map((url, index) => ({
        contentUrl: url,
        order: index + 1,
      }))

      const formDataToMerge: FormData = {
        roomCode: formData.roomCode,
        contentUrls,
        frameUuid: selectedFrame,
      }

      console.log('Merging with data:', formDataToMerge)

      const response = await nCutAPI.mergeNCut(formDataToMerge)
      setMergedUrl(response.resultUrl)

      const nextPage = currentPage + 1
      setCurrentPage(nextPage)
      broadcastPageChange(nextPage)
    } catch (err) {
      console.error('Merge failed:', err)
      error('병합 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }, [
    sessionData,
    isHost,
    selectedUrls,
    selectedFrame,
    formData,
    currentPage,
    error,
    broadcastPageChange,
  ])

  const handleSubmit = useCallback(async () => {
    if (!mergedUrl) {
      error('병합된 URL이 없습니다. 다시 시도해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await nCutAPI.saveNCut(saveData)
      if (response) {
        setIsSubmitting(false)
        leaveRoom()
        navigate('/gallery')
      } else {
        setIsSubmitting(false)
        error('NCut 저장 실패')
      }
    } catch {
      setIsSubmitting(false)
      error('NCut 저장 중 오류가 발생했습니다.')
    }
  }, [mergedUrl, saveData, error, leaveRoom, navigate])

  // 세션 데이터가 로드되지 않았으면 로딩 표시
  if (!sessionData) {
    return (
      <S.EditNCutContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '18px',
            color: '#666',
          }}
        >
          세션 정보를 로딩중입니다...
        </div>
      </S.EditNCutContainer>
    )
  }

  // 세션 데이터 유효성 검사
  if (!sessionData.sharedUrls || !sessionData.cutCount) {
    return (
      <S.EditNCutContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <h2>세션 정보가 없습니다.</h2>
          <p>세션을 다시 시작해주세요.</p>
          <button onClick={() => navigate('/')}>홈으로 가기</button>
        </div>
      </S.EditNCutContainer>
    )
  }

  const pages = [
    <SelectCuts
      key="cuts"
      sharedUrls={sessionData.sharedUrls}
      selectedUrls={selectedUrls}
      onSelectCut={handleSelectCut}
      cutCount={sessionData.cutCount}
      allUsersSelections={allUsersSelections}
    />,
    <SelectFrame
      key="frame"
      cutCount={sessionData.cutCount}
      selectedUrls={selectedUrls}
      selectedFrame={selectedFrame}
      onSelectFrame={handleSelectFrame}
    />,
    <DecorateNCut
      key="decorate"
      ref={decorateNCutRef}
      selectedUrls={selectedUrls}
      selectedFrame={selectedFrame}
      onDecoratedImageReady={handleDecoratedImageReady}
      onDecorateUpdate={broadcastDecorateUpdate}
      isCollaborative={true}
      roomCode={sessionData.roomCode}
    />,
    <MakingThumbnail key="thumbnail" />,
    <Saving
      key="saving"
      mergedUrl={mergedUrl}
      onSubmit={handleSavingSubmit}
      isSubmitting={isSubmitting}
    />,
  ]

  return (
    <S.EditNCutContainer>
      {pages[currentPage]}

      <S.HostIndicator>{isHost ? '호스트' : '참여자'}</S.HostIndicator>

      {/* 페이지 2(DecorateNCut)가 아닐 때만 이전/다음 버튼 표시 */}
      {currentPage !== 2 && (
        <>
          {currentPage > 0 && (
            <S.EditNCutPrevButton
              onClick={handlePrev}
              disabled={!isHost}
              style={{ opacity: isHost ? 1 : 0.5 }}
            >
              이전
            </S.EditNCutPrevButton>
          )}
          {currentPage < pages.length - 1 ? (
            <S.EditNCutNextButton
              onClick={handleNext}
              disabled={!isHost}
              style={{ opacity: isHost ? 1 : 0.5 }}
            >
              다음
            </S.EditNCutNextButton>
          ) : (
            <S.EditNCutNextButton
              onClick={handleSubmit}
              disabled={!isHost}
              style={{ opacity: isHost ? 1 : 0.5 }}
            >
              제출
            </S.EditNCutNextButton>
          )}
        </>
      )}

      {/* 페이지 2(DecorateNCut)일 때만 장식 완료 버튼 표시 */}
      {currentPage === 2 && (
        <S.EditNCutNextButton
          onClick={handleDecorateComplete}
          disabled={!isHost}
          style={{ opacity: isHost ? 1 : 0.5 }}
        >
          장식 완료
        </S.EditNCutNextButton>
      )}
    </S.EditNCutContainer>
  )
}

export default EditNCut
