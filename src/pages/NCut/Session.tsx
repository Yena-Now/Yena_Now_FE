import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRoom } from '@hooks/useRoom'
import { useBackgroundRemoval } from '@hooks/useBackgroundRemoval'
import { SessionPrompt } from '@components/NCut/SessionPrompt'
import { LoadingScreen } from '@components/NCut/LoadingScreen'
import NCutBackground from '@components/NCut/NCutBackground'
import { Chat } from '@components/NCut/Chat'
import { useToast } from '@hooks/useToast'
import { useDragAndDrop } from '@hooks/useDragAndDrop'
import * as S from '@styles/pages/NCut/SessionStyle'
import {
  IoCameraOutline,
  IoVideocamOffOutline,
  IoVideocamOutline,
} from 'react-icons/io5'
import type { StateProps } from '@/types/Session'
import { FaRegCopy } from 'react-icons/fa6'
import { s3API } from '@/api/s3'
import { useAuthStore } from '@/store/authStore'
import { nCutAPI } from '@/api/ncut'
import { formatTime } from '@/utils/date'

export const Session: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { success, error } = useToast()
  const {
    backgroundImageUrl,
    takeCount,
    cutCount,
    timeLimit,
    cuts,
    roomCode,
    isHost,
  } = location.state as StateProps

  const [showInteractionPrompt, setShowInteractionPrompt] = useState(true)
  const [hasAttemptedConnection, setHasAttemptedConnection] = useState(false)
  const [bgImageElement, setBgImageElement] = useState<HTMLImageElement | null>(
    null,
  )
  const [videoScale, setVideoScale] = useState(0.5)
  const [brightness, setBrightness] = useState(1)
  const [cursor, setCursor] = useState('default')
  const [displayCountdown, setDisplayCountdown] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [backgroundImageUrls, setBackgroundImageUrls] = useState<string[]>([])
  const [localRecordingStartTime, setLocalRecordingStartTime] = useState<
    number | null
  >(null)
  const [localRecordingTimer, setLocalRecordingTimer] =
    useState<NodeJS.Timeout | null>(null)
  const [localElapsedTime, setLocalElapsedTime] = useState<number>(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordedChunksRef = useRef<Blob[]>([])

  const mainCanvasRef = useRef<HTMLCanvasElement>(null)

  const user = useAuthStore((state) => state.user)
  const nickname = user?.nickname || 'Anonymous'

  const {
    room,
    localTrack,
    remoteTracks,
    isConnecting,
    connectionStatus,
    connectToRoom,
    leaveRoom,
    setIsConnecting,
    sendData,
    background,
    sendBackground,
    chatMessages,
    sendChatMessage,
    isProcessingGlobal,
    sendProcessingStatus,
    sharedUrls,
    sendUrls,
    countdownInfo,
    startSharedCountdown,
    sendNavigateToEdit,
    broadcastToast,
    recordingInfo,
    broadcastRecordingStart,
    broadcastRecordingStop,
    broadcastRecordingTime,
    recordingElapsedTime,
  } = useRoom()

  const {
    isBackgroundProcessing,
    canvasSize,
    setCanvasSize,
    canvasPosition,
    setCanvasPosition,
    canvasRef,
    createBackgroundRemovedTrack,
    cleanup,
  } = useBackgroundRemoval()

  const { isDragging, handleMouseDown } = useDragAndDrop(
    mainCanvasRef,
    canvasSize,
    canvasPosition,
    setCanvasPosition,
  )

  useEffect(() => {
    const fetchBackgrounds = async () => {
      const backgrounds = await nCutAPI.getBackgrounds()
      setBackgroundImageUrls(backgrounds)
      if (!backgroundImageUrls.includes(backgroundImageUrl)) {
        setBackgroundImageUrls((prev) => [...prev, backgroundImageUrl])
      }
    }

    fetchBackgrounds()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    sendData(canvasPosition, canvasSize, brightness)
  }, [canvasPosition, canvasSize, brightness, sendData])

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) return // 드래그 중에는 커서 변경 안 함

    const mainCanvas = mainCanvasRef.current
    if (!mainCanvas) return

    const rect = mainCanvas.getBoundingClientRect()
    const scaleX = mainCanvas.width / rect.width
    const scaleY = mainCanvas.height / rect.height
    const mouseX = (e.clientX - rect.left) * scaleX
    const mouseY = (e.clientY - rect.top) * scaleY

    if (
      mouseX >= canvasPosition.x &&
      mouseX <= canvasPosition.x + canvasSize.width &&
      mouseY >= canvasPosition.y &&
      mouseY <= canvasPosition.y + canvasSize.height
    ) {
      setCursor('grab')
    } else {
      setCursor('default')
    }
  }

  // 배경 이미지 로드
  useEffect(() => {
    const imageUrl = background !== null ? background : backgroundImageUrl

    if (imageUrl) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.style.objectFit = 'contain'
      img.onload = () => setBgImageElement(img)
      img.onerror = (err) => error(`배경 이미지 로드 실패: ${err}`)
      const urlWithTimestamp = `${imageUrl}?t=${Date.now()}`
      img.src = urlWithTimestamp
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [background, backgroundImageUrl])

  // 캔버스 크기 업데이트
  useEffect(() => {
    const originalWidth = 1280
    const originalHeight = 720
    setCanvasSize({
      width: originalWidth * videoScale,
      height: originalHeight * videoScale,
    })
  }, [videoScale, setCanvasSize])

  // 메인 캔버스 렌더링
  useEffect(() => {
    const mainCanvas = mainCanvasRef.current
    const ctx = mainCanvas?.getContext('2d', { alpha: true })
    if (!ctx || !mainCanvas) return

    let renderFrameId: number

    const renderFrame = () => {
      ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height)

      if (bgImageElement) {
        ctx.drawImage(bgImageElement, 0, 0, mainCanvas.width, mainCanvas.height)
      }

      // 원격 비디오 그리기 - 임시 캔버스를 통해 투명도 처리
      remoteTracks.forEach((remoteTrack) => {
        const videoElement = remoteTrack.element
        if (
          videoElement.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
          !videoElement.paused
        ) {
          // 임시 캔버스 생성하여 투명도 처리
          const tempCanvas = document.createElement('canvas')
          const tempCtx = tempCanvas.getContext('2d', { alpha: true })

          if (tempCtx) {
            tempCanvas.width = remoteTrack.size.width
            tempCanvas.height = remoteTrack.size.height

            // 비디오를 임시 캔버스에 그리기
            tempCtx.drawImage(
              videoElement,
              0,
              0,
              tempCanvas.width,
              tempCanvas.height,
            )

            // 검은색 영역을 투명하게 만들기
            const imageData = tempCtx.getImageData(
              0,
              0,
              tempCanvas.width,
              tempCanvas.height,
            )
            const data = imageData.data

            for (let i = 0; i < data.length; i += 4) {
              const r = data[i]
              const g = data[i + 1]
              const b = data[i + 2]

              // 완전히 검정색만 투명하게
              if (r < 2 && g < 2 && b < 2) {
                data[i + 3] = 0
              } else if (g > 100 && r < 80 && b < 80) {
                data[i + 3] = 0
              } else {
                data[i] = Math.min(255, data[i] * remoteTrack.brightness)
                data[i + 1] = Math.min(
                  255,
                  data[i + 1] * remoteTrack.brightness,
                )
                data[i + 2] = Math.min(
                  255,
                  data[i + 2] * remoteTrack.brightness,
                )
              }
            }

            tempCtx.putImageData(imageData, 0, 0)

            // 메인 캔버스에 그리기
            ctx.drawImage(
              tempCanvas,
              remoteTrack.position.x,
              remoteTrack.position.y,
              remoteTrack.size.width,
              remoteTrack.size.height,
            )
          }
        }
      })

      // 로컬 비디오 그리기
      if (localTrack && canvasRef.current) {
        if (brightness !== 1) {
          // 임시 캔버스에서 밝기 조절
          const tempCanvas = document.createElement('canvas')
          const tempCtx = tempCanvas.getContext('2d')

          if (tempCtx) {
            tempCanvas.width = canvasSize.width
            tempCanvas.height = canvasSize.height

            tempCtx.drawImage(
              canvasRef.current,
              0,
              0,
              tempCanvas.width,
              tempCanvas.height,
            )
            adjustBrightness(tempCanvas, brightness)

            ctx.drawImage(
              tempCanvas,
              canvasPosition.x,
              canvasPosition.y,
              canvasSize.width,
              canvasSize.height,
            )
          }
        } else {
          ctx.drawImage(
            canvasRef.current,
            canvasPosition.x,
            canvasPosition.y,
            canvasSize.width,
            canvasSize.height,
          )
        }
      }

      renderFrameId = requestAnimationFrame(renderFrame)
    }

    renderFrame()

    return () => {
      cancelAnimationFrame(renderFrameId)
    }
  }, [
    bgImageElement,
    canvasRef,
    canvasPosition,
    canvasSize,
    remoteTracks,
    localTrack,
    brightness,
  ])

  const adjustBrightness = (
    canvas: HTMLCanvasElement,
    brightnessValue: number,
  ) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] * brightnessValue) // Red
      data[i + 1] = Math.min(255, data[i + 1] * brightnessValue) // Green
      data[i + 2] = Math.min(255, data[i + 2] * brightnessValue) // Blue
      // Alpha (i + 3)는 그대로 유지
    }

    ctx.putImageData(imageData, 0, 0)
  }

  const handleUserInteraction = useCallback(async () => {
    setShowInteractionPrompt(false)
    if (hasAttemptedConnection) return

    const token = location.state?.token
    if (!token) {
      error('세션이 만료 되었습니다.\n 필름 페이지로 돌아갑니다.')
      navigate('/film')
      return
    }

    sessionStorage.setItem('userToken', token)

    setIsConnecting(true)
    setHasAttemptedConnection(true)
    try {
      await connectToRoom(token, createBackgroundRemovedTrack)
    } catch {
      // connectToRoom 내부에서 에러 처리를 하므로 여기서는 UI 복구만 담당
      navigate('/film')
    } finally {
      setIsConnecting(false)
    }
  }, [
    hasAttemptedConnection,
    location.state?.token,
    connectToRoom,
    createBackgroundRemovedTrack,
    error,
    navigate,
    setIsConnecting,
  ])

  const handleLeaveRoom = useCallback(async () => {
    await leaveRoom()
    navigate('/film')
  }, [leaveRoom, navigate])

  const captureCanvas = useCallback(async () => {
    const mainCanvas = mainCanvasRef.current
    if (!mainCanvas) return

    try {
      const blob = await new Promise<Blob>((resolve) => {
        mainCanvas.toBlob(
          (blob) => {
            if (blob) resolve(blob)
          },
          'image/png',
          1,
        )
      })

      if (!blob) {
        error('캔버스 캡처 실패: Blob 생성 실패')
        return
      }

      const fileName = `session-capture-${new Date().getTime()}.png`
      const file = new File([blob], fileName, { type: 'image/png' })

      const fileUrl = await s3API.upload({
        file,
        type: 'cut',
        roomCode: roomCode,
      })

      success('캡처된 이미지를 저장했습니다.')
      broadcastToast('촬영 완료', 'success')

      sendUrls([...sharedUrls, fileUrl as unknown as string])
    } catch (err) {
      error(`캔버스 캡처 실패: ${err}`)
      broadcastToast('촬영 실패', 'error')
    } finally {
      setIsProcessing(false)
    }
  }, [error, success, sendUrls, sharedUrls, roomCode, broadcastToast])

  const startRecording = useCallback(() => {
    const mainCanvas = mainCanvasRef.current
    if (!mainCanvas) return

    try {
      const stream = mainCanvas.captureStream(30) // 30 FPS

      // MediaRecorder 설정
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/mp4;codecs=vp9',
      })

      recordedChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: 'video/mp4',
        })

        const fileName = `session-recording-${new Date().getTime()}.mp4`
        const file = new File([blob], fileName, { type: 'video/mp4' })

        const fileUrl = await s3API.upload({
          file,
          type: 'cut',
          roomCode: roomCode,
        })

        success('녹화된 영상을 저장했습니다.')
        broadcastToast('녹화 완료', 'success')
        sendUrls([...sharedUrls, fileUrl as unknown as string])
        recordedChunksRef.current = [] // 녹화가 끝나면 청소

        broadcastRecordingStop()
        setLocalRecordingStartTime(null)
        setLocalElapsedTime(0)

        if (localRecordingTimer) {
          clearTimeout(localRecordingTimer)
          setLocalRecordingTimer(null)
        }
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)

      const startTime = Date.now()

      setLocalRecordingStartTime(startTime)
      broadcastRecordingStart(timeLimit)

      const timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000)
        setLocalElapsedTime(elapsed)
        broadcastRecordingTime(elapsed)
      }, 1000)

      setLocalRecordingTimer(timer)

      setTimeout(() => {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state === 'recording'
        ) {
          mediaRecorderRef.current.stop()
          setIsRecording(false)
          mediaRecorderRef.current = null
          broadcastRecordingStop()
          setLocalRecordingStartTime(null)
          setLocalElapsedTime(0)

          if (localRecordingTimer) {
            clearTimeout(localRecordingTimer)
            setLocalRecordingTimer(null)
          }
          success('녹화가 자동으로 중지되었습니다.\n 영상이 저장되었습니다.')
        }
      }, timeLimit * 1000)
    } catch (err) {
      error(`녹화 시작 실패: ${err}`)
      broadcastToast('녹화 실패', 'error')
    } finally {
      setIsProcessing(false)
    }
  }, [
    error,
    success,
    sendUrls,
    sharedUrls,
    timeLimit,
    roomCode,
    broadcastToast,
    broadcastRecordingStart,
    broadcastRecordingStop,
    broadcastRecordingTime,
    localRecordingTimer,
  ])

  const startCountDown = useCallback(
    (action: 'capture' | 'record') => {
      if (isProcessing || isRecording) return
      setIsProcessing(true)
      sendProcessingStatus(true)
      startSharedCountdown(action)
    },
    [isProcessing, isRecording, startSharedCountdown, sendProcessingStatus],
  )

  useEffect(() => {
    if (!isProcessing) {
      sendProcessingStatus(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProcessing])

  useEffect(() => {
    if (!countdownInfo) {
      setDisplayCountdown(null)
      return
    }

    setDisplayCountdown(3)
    const timer = setInterval(() => {
      setDisplayCountdown((prev) => (prev !== null ? prev - 1 : null))
    }, 1000)

    const timeout = setTimeout(() => {
      clearInterval(timer)
      setDisplayCountdown(null)
      if (
        room &&
        countdownInfo &&
        countdownInfo.initiator === room.localParticipant.identity
      ) {
        if (countdownInfo.action === 'capture') {
          captureCanvas().then(() => {})
        } else if (countdownInfo.action === 'record') {
          startRecording()
        }
      }
    }, 3000)

    return () => {
      clearInterval(timer)
      clearTimeout(timeout)
    }
  }, [countdownInfo, captureCanvas, startRecording, room])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      mediaRecorderRef.current = null

      broadcastRecordingStop()
      setLocalRecordingStartTime(null)
      setLocalElapsedTime(0)

      if (localRecordingTimer) {
        clearTimeout(localRecordingTimer)
        setLocalRecordingTimer(null)
      }
    }
  }, [isRecording, localRecordingTimer, broadcastRecordingStop])

  useEffect(() => {
    return () => {
      if (localRecordingTimer) {
        clearTimeout(localRecordingTimer)
        setLocalRecordingTimer(null)
      }
    }
  }, [localRecordingTimer])

  const currentRecordingTime = useMemo(() => {
    if (localRecordingStartTime) {
      return localElapsedTime
    } else if (recordingInfo?.isRecording) {
      return recordingElapsedTime
    }
    return 0
  }, [
    localRecordingStartTime,
    localElapsedTime,
    recordingInfo,
    recordingElapsedTime,
  ])

  // 초기 설정 및 언마운트 정리
  useEffect(() => {
    const storedSharedCuts = Array.isArray(cuts)
      ? cuts.map((cut) => cut.cutUrl)
      : []

    if (storedSharedCuts.length > 0) {
      sendUrls(storedSharedCuts)
    }

    if (!location.state) {
      error('잘못된 접근입니다. 필름 페이지로 돌아갑니다.')
      navigate('/film')
    }

    return () => {
      cleanup()
      if (room) {
        leaveRoom().then(() => {})
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (showInteractionPrompt) {
    return <SessionPrompt onStart={handleUserInteraction} />
  }

  if (isConnecting || (!room && hasAttemptedConnection)) {
    return (
      <LoadingScreen
        connectionStatus={connectionStatus}
        isBackgroundProcessing={isBackgroundProcessing}
      />
    )
  }

  if (!room) {
    return (
      <S.NoSessionContainer>
        세션에 연결하지 못했습니다.
        <button onClick={() => navigate('/film')}>돌아가기</button>
      </S.NoSessionContainer>
    )
  }

  const handleFinishTakes = () => {
    const editData = {
      sharedUrls,
      cutCount,
      roomCode,
      isHost,
      token: location.state?.token || '',
    }

    sessionStorage.setItem('editData', JSON.stringify(editData))

    sendNavigateToEdit(roomCode, { ...editData, isHost: false })

    navigate(`/film/room/${roomCode}/edit`, {
      state: editData,
    })
  }

  const canCapture = sharedUrls.length < takeCount
  const handleCopyRoomCode = () => {
    navigator.clipboard
      .writeText(location.state?.roomCode || '')
      .then(() => success('세션 코드가 클립보드에 복사되었습니다.'))
      .catch((err) => error(`세션 코드 복사 실패: ${err}`))
  }

  return (
    <S.SessionLayout id="room">
      <S.SessionHeader>
        <S.SessionRoomCode onClick={handleCopyRoomCode}>
          {location.state?.roomCode || '세션 코드 없음'}
          <S.CopyIcon>
            <FaRegCopy size={20} />
          </S.CopyIcon>
        </S.SessionRoomCode>
        <S.RemainingTakesCnt>
          {sharedUrls.length} / {takeCount}
        </S.RemainingTakesCnt>
        {(recordingInfo?.isRecording || localRecordingStartTime) && (
          <S.RecordingTimeDisplay>
            녹화 중: {formatTime(currentRecordingTime)} /{' '}
            {formatTime(timeLimit)}
          </S.RecordingTimeDisplay>
        )}
        <S.LeaveSessionButton onClick={handleLeaveRoom}>
          나가기
        </S.LeaveSessionButton>
      </S.SessionHeader>
      <S.mainContent>
        <S.SessionLayoutContainer id="layout-container">
          <S.CanvasWrapper>
            <S.CanvasContainer
              $customCursor={cursor}
              ref={mainCanvasRef}
              width={1280}
              height={720}
              onMouseDown={handleMouseDown}
              onMouseMove={handleCanvasMouseMove}
            />
            {displayCountdown !== null && displayCountdown > 0 && (
              <S.CountDownOverlay>{displayCountdown}</S.CountDownOverlay>
            )}
          </S.CanvasWrapper>
          <S.SessionFooter>
            <S.CameraSizeContainer>
              <S.CameraSizeLabel htmlFor="size-slider">
                카메라 크기
              </S.CameraSizeLabel>
              <S.CameraSizeInput
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={videoScale}
                onChange={(e: { target: { value: string } }) =>
                  setVideoScale(parseFloat(e.target.value))
                }
              />
            </S.CameraSizeContainer>
            <S.BrightnessContainer>
              <S.BrightnessLabel htmlFor="brightness-slider">
                밝기
              </S.BrightnessLabel>
              <S.BrightnessInput
                id="brightness-slider"
                type="range"
                min="0.3"
                max="2"
                step="0.1"
                value={brightness}
                onChange={(e) => setBrightness(parseFloat(e.target.value))}
              />
            </S.BrightnessContainer>
            <S.TakeContainer>
              <S.TakeVideoButton
                $isActive={isRecording}
                onClick={
                  isRecording ? stopRecording : () => startCountDown('record')
                }
                disabled={!canCapture || isProcessing || isProcessingGlobal}
              >
                {isRecording ? (
                  <IoVideocamOffOutline
                    style={{
                      width: '24px',
                      height: '24px',
                    }}
                  />
                ) : (
                  <IoVideocamOutline
                    style={{
                      width: '24px',
                      height: '24px',
                    }}
                  />
                )}
              </S.TakeVideoButton>
              <S.TakePhotoButton
                onClick={() => startCountDown('capture')}
                disabled={
                  !canCapture ||
                  isRecording ||
                  isProcessing ||
                  isProcessingGlobal
                }
              >
                <IoCameraOutline style={{ width: '24px', height: '24px' }} />
              </S.TakePhotoButton>
            </S.TakeContainer>
            <S.GoToEditPage
              onClick={handleFinishTakes}
              disabled={canCapture || isRecording || isProcessing || !isHost}
            >
              다음
            </S.GoToEditPage>
          </S.SessionFooter>
        </S.SessionLayoutContainer>
        <S.OtherContainer>
          <S.BackgroundImageContainer>
            <NCutBackground
              backgroundImageUrls={backgroundImageUrls}
              onBackgroundChange={sendBackground}
            />
          </S.BackgroundImageContainer>
          <S.ChatContainer>
            <Chat
              messages={chatMessages}
              onSendMessage={sendChatMessage}
              currentUserIdentity={nickname}
            />
          </S.ChatContainer>
        </S.OtherContainer>
      </S.mainContent>
    </S.SessionLayout>
  )
}

export default Session
