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
import { useBackgroundRemoval } from '@/hooks/useBackgroundRemoval'

type LocationState = {
  sharedUrls: string[]
  cutCount: number
  roomCode: string
  isHost?: boolean
  token?: string
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
  const { error, success } = useToast()

  const { createBackgroundRemovedTrack } = useBackgroundRemoval()

  const {
    room,
    allUsersSelections,
    leaveRoom,
    currentEditPage,
    setCurrentEditPage,
    isHost,
    setIsHost,
    broadcastPageChange,
    broadcastDecorateUpdate,
    broadcastHostSelection,
    selectedUrls,
    selectedFrame,
    setSelectedUrls,
    setSelectedFrame,
    connectToRoom,
    mergedUrl,
    setMergedUrl,
  } = useRoom()

  const [connectionRetries, setConnectionRetries] = useState(0)
  const [isReconnecting, setIsReconnecting] = useState(false)
  const [, setIsConnectionEstablished] = useState(false)
  const [connectionAttempted, setConnectionAttempted] = useState(false) // 추가

  // DecorateNCut ref
  const decorateNCutRef = useRef<DecorateNCutRef>(null)

  // 데이터 추출을 useState로 처리
  const [sessionData, setSessionData] = useState<{
    sharedUrls: string[]
    cutCount: number
    roomCode: string
    isHostUser: boolean
    token: string
  } | null>(null)

  const isRoomConnected = useCallback(() => {
    return room && room.state === 'connected' && !room.engine.isClosed
  }, [room])

  useEffect(() => {
    // 이미 연결되었거나 연결 시도 중이면 return
    if (
      !sessionData?.token ||
      isRoomConnected() ||
      isReconnecting ||
      connectionAttempted
    ) {
      return
    }

    let isMounted = true
    let retryTimeout: NodeJS.Timeout

    const initializeConnection = async () => {
      if (!isMounted) return

      setIsReconnecting(true)
      setConnectionAttempted(true)
      setIsConnectionEstablished(false)

      try {
        console.log('Initializing room connection...')

        // 기존 연결이 있다면 먼저 정리
        if (room && room.state !== 'disconnected') {
          console.log('Cleaning up existing connection...')
          await room.disconnect()
          // 잠시 대기하여 완전히 정리되도록 함
          await new Promise((resolve) => setTimeout(resolve, 500))
        }

        if (!isMounted) return

        await connectToRoom(sessionData.token, createBackgroundRemovedTrack)

        if (!isMounted) return

        setConnectionRetries(0)
        setIsConnectionEstablished(true)
        setIsReconnecting(false)
        success('방에 연결되었습니다.')
      } catch (connectError) {
        console.error('Connection failed:', connectError)

        if (!isMounted) return

        setIsConnectionEstablished(false)
        setIsReconnecting(false)

        // 재시도 로직
        if (connectionRetries < 3) {
          console.log(`Retrying connection... (${connectionRetries + 1}/3)`)
          setConnectionRetries((prev) => prev + 1)

          // 지수적 백오프: 5초, 10초, 15초
          const retryDelay = (connectionRetries + 1) * 5000
          retryTimeout = setTimeout(() => {
            if (isMounted) {
              setConnectionAttempted(false)
            }
          }, retryDelay)
        } else {
          error('방 연결에 실패했습니다. 페이지를 새로고침해주세요.')
        }
      }
    }

    // 초기 연결 시도
    initializeConnection()

    // cleanup 함수
    return () => {
      isMounted = false
      if (retryTimeout) {
        clearTimeout(retryTimeout)
      }
    }
  }, [
    sessionData?.token,
    isRoomConnected,
    isReconnecting,
    connectionAttempted,
    connectionRetries,
    connectToRoom,
    createBackgroundRemovedTrack,
    success,
    error,
    room,
  ])

  // 연결 상태 모니터링 개선
  useEffect(() => {
    if (!room) return

    let reconnectTimeout: NodeJS.Timeout

    const handleConnectionStateChanged = (state: string) => {
      console.log(`Room state changed: ${state}`)

      if (state === 'connected') {
        setIsReconnecting(false)
        setIsConnectionEstablished(true)
        // 연결 성공 시 재시도 카운터 리셋
        setConnectionRetries(0)
      } else if (state === 'disconnected') {
        console.log('Room disconnected')
        setIsConnectionEstablished(false)

        // 의도적인 disconnection이 아닌 경우에만 재연결 시도
        if (sessionData && connectionRetries < 3) {
          console.log('Attempting to reconnect...')
          reconnectTimeout = setTimeout(() => {
            setConnectionAttempted(false) // 재연결을 위해 리셋
          }, 3000)
        }
      } else if (state === 'reconnecting') {
        setIsReconnecting(true)
      }
    }

    const handleDisconnected = (reason?: string) => {
      console.log('Room disconnected with reason:', reason)
      setIsConnectionEstablished(false)

      // 특정 에러가 아닌 경우에만 재연결 시도
      if (
        reason !== 'CLIENT_INITIATED' &&
        sessionData &&
        connectionRetries < 3
      ) {
        reconnectTimeout = setTimeout(() => {
          setConnectionAttempted(false)
        }, 3000)
      }
    }

    room.on('connectionStateChanged', handleConnectionStateChanged)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    room.on('disconnected', handleDisconnected)

    return () => {
      room.off('connectionStateChanged', handleConnectionStateChanged)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      room.off('disconnected', handleDisconnected)
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
      }
    }
  }, [room, sessionData, connectionRetries])

  useEffect(() => {
    const handlePageSync = (event: CustomEvent) => {
      const { page } = event.detail
      if (!isHost) {
        setCurrentPage(page)
        setCurrentEditPage(page)
      }
    }

    window.addEventListener('pageSync', handlePageSync as EventListener)

    return () => {
      window.removeEventListener('pageSync', handlePageSync as EventListener)
    }
  }, [isHost, setCurrentEditPage])

  // 세션 데이터 초기화
  useEffect(() => {
    if (location.state) {
      const state = location.state as LocationState
      setSessionData({
        sharedUrls: state.sharedUrls,
        cutCount: state.cutCount,
        roomCode: state.roomCode,
        isHostUser: state.isHost || false,
        token: state.token || '',
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
            token: parsed.token || '',
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

  useEffect(() => {
    return () => {
      if (room && room.state !== 'disconnected') {
        room.disconnect()
      }
    }
  }, [room])

  // Host 상태 설정
  useEffect(() => {
    if (sessionData) {
      setIsHost(sessionData.isHostUser)
    }
  }, [sessionData, setIsHost])

  const [currentPage, setCurrentPage] = useState(0)

  // 페이지 상태 동기화
  useEffect(() => {
    setCurrentPage(currentEditPage)
  }, [currentEditPage])

  useEffect(() => {
    const handleHostSelection = (event: CustomEvent) => {
      const {
        selectedUrls: hostSelectedUrls,
        selectedFrame: hostSelectedFrame,
      } = event.detail

      if (!isHost) {
        if (hostSelectedUrls) {
          setSelectedUrls(hostSelectedUrls)
        }
        if (hostSelectedFrame) {
          setSelectedFrame(hostSelectedFrame)
        }
      }
    }

    window.addEventListener(
      'hostSelection',
      handleHostSelection as EventListener,
    )

    return () => {
      window.removeEventListener(
        'hostSelection',
        handleHostSelection as EventListener,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHost])

  const [formData, setFormData] = useState<FormData>({
    roomCode: '',
    frameUuid: '',
    contentUrls: [],
  })
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

  useEffect(() => {
    if (!room) return

    const handleConnectionStateChanged = (state: string) => {
      console.log(`Room state changed: ${state}`)

      if (state === 'connected') {
        setIsReconnecting(false)
        setIsConnectionEstablished(true)
      } else if (state === 'disconnected' && sessionData) {
        console.log('Room disconnected')
        setIsConnectionEstablished(false)
      }
    }

    room.on('connectionStateChanged', handleConnectionStateChanged)

    return () => {
      room.off('connectionStateChanged', handleConnectionStateChanged)
    }
  }, [room, sessionData])

  // 핸들러 함수들
  const handleSelectCut = useCallback(
    (url: string) => {
      if (!sessionData) return

      if (!isHost) {
        error('호스트만 컷을 선택할 수 있습니다.')
        return
      }

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

        if (room && room.state === 'connected' && !room.engine.isClosed) {
          broadcastHostSelection({ selectedUrls: newSelection })
        } else {
          console.log('Room is not connected or engine is closed')
        }

        window.dispatchEvent(
          new CustomEvent('hostSelection', {
            detail: {
              selectedUrls: newSelection,
            },
          }),
        )

        return newSelection
      })
    },
    [sessionData, isHost, setSelectedUrls, error, broadcastHostSelection, room],
  )

  const handleSelectFrame = useCallback(
    (frameId: string) => {
      if (!isHost) {
        error('호스트만 프레임을 선택할 수 있습니다.')
        return
      }

      setSelectedFrame(frameId)
      setFormData((prev) => ({
        ...prev,
        frameUuid: frameId,
      }))

      if (room && room.state === 'connected' && !room.engine.isClosed) {
        broadcastHostSelection({ selectedFrame: frameId })
      }
      window.dispatchEvent(
        new CustomEvent('hostSelection', {
          detail: {
            selectedFrame: frameId,
          },
        }),
      )
    },
    [isHost, setSelectedFrame, error, broadcastHostSelection, room],
  )

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

    const nextPage = Math.min(currentPage + 1, 4)

    if (currentPage === 0 && selectedUrls.length > 0) {
      broadcastHostSelection({ selectedUrls })
    }
    if (currentPage === 1 && selectedFrame) {
      broadcastHostSelection({ selectedFrame })
    }

    setTimeout(() => {
      setCurrentPage(nextPage)
      setCurrentEditPage(nextPage)
      broadcastPageChange(nextPage)
    }, 1000)
  }, [
    sessionData,
    isHost,
    currentPage,
    selectedUrls,
    selectedFrame,
    error,
    broadcastPageChange,
    broadcastHostSelection,
    setCurrentEditPage,
  ])

  const handlePrev = useCallback(() => {
    if (!isHost) {
      error('호스트만 이전 단계로 돌아갈 수 있습니다.')
      return
    }

    const prevPage = Math.max(currentPage - 1, 0)
    broadcastPageChange(prevPage)

    setCurrentPage(prevPage)
    setCurrentEditPage(prevPage)
  }, [isHost, currentPage, error, broadcastPageChange, setCurrentEditPage])

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
    setMergedUrl,
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
      isHost={isHost}
    />,
    <SelectFrame
      key="frame"
      cutCount={sessionData.cutCount}
      selectedUrls={selectedUrls}
      selectedFrame={selectedFrame}
      onSelectFrame={handleSelectFrame}
      isHost={isHost}
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
            <S.EditNCutNextButton onClick={handleSubmit}>
              제출
            </S.EditNCutNextButton>
          )}
        </>
      )}

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
