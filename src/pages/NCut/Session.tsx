import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRoom } from '@hooks/useRoom'
import { useBackgroundRemoval } from '@hooks/useBackgroundRemoval'
import { SessionPrompt } from '@components/NCut/SessionPrompt'
import { LoadingScreen } from '@components/NCut/LoadingScreen'
import { useToast } from '@hooks/useToast'
import { useDragAndDrop } from '@hooks/useDragAndDrop'
import * as S from '@styles/pages/NCut/SessionStyle'

export const Session: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { error } = useToast()

  const [showInteractionPrompt, setShowInteractionPrompt] = useState(true)
  const [hasAttemptedConnection, setHasAttemptedConnection] = useState(false)
  const [bgImageElement, setBgImageElement] = useState<HTMLImageElement | null>(
    null,
  )
  const [videoScale, setVideoScale] = useState(0.5)
  const [cursor, setCursor] = useState('default')

  const mainCanvasRef = useRef<HTMLCanvasElement>(null)

  const {
    room,
    localTrack,
    remoteTracks,
    isConnecting,
    connectionStatus,
    connectToRoom,
    leaveRoom,
    setIsConnecting,
    sendPosition,
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
    sendPosition(canvasPosition, canvasSize)
  }, [canvasPosition, canvasSize, sendPosition])

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
    if (location.state?.backgroundImageUrl) {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = () => setBgImageElement(img)
      img.onerror = (err) => error(`배경 이미지 로드 실패: ${err}`)
      img.src = location.state.backgroundImageUrl
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.backgroundImageUrl])

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

              // 검은색 또는 거의 검은색인 픽셀을 투명하게 만들기
              if (r < 10 && g < 10 && b < 10) {
                data[i + 3] = 0 // 알파값을 0으로 설정 (투명)
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
        ctx.drawImage(
          canvasRef.current,
          canvasPosition.x,
          canvasPosition.y,
          canvasSize.width,
          canvasSize.height,
        )
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
  ])

  const handleUserInteraction = useCallback(async () => {
    setShowInteractionPrompt(false)
    if (hasAttemptedConnection) return

    const token = location.state?.token
    if (!token) {
      error('세션이 만료 되었습니다. 필름 페이지로 돌아갑니다.')
      navigate('/film')
      return
    }

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

  // 초기 설정 및 언마운트 정리
  useEffect(() => {
    if (!location.state) {
      error('잘못된 접근입니다. 필름 페이지로 돌아갑니다.')
      navigate('/film')
    }

    return () => {
      cleanup()
      if (room) {
        // .then()을 사용하여 leaveRoom이 완료된 후에 로그를 출력
        // 안하니까 빨간줄 뜸!
        leaveRoom().then((r) => {
          console.log('세션에서 나갔습니다:', r)
        })
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

  return (
    <S.SessionLayout id="room">
      <div
        id="room-header"
        style={{ padding: '10px', borderBottom: '1px solid #ccc' }}
      >
        <span>방 ID: {room.name}</span>
        <button onClick={handleLeaveRoom}>나가기</button>
      </div>
      <S.SessionLayoutContainer id="layout-container">
        <S.CanvasContainer
          customCursor={cursor}
          ref={mainCanvasRef}
          width={1280}
          height={720}
          onMouseDown={handleMouseDown}
          onMouseMove={handleCanvasMouseMove}
        />
        <S.CameraSizeRangeContainer>
          <S.CameraSizeContainer>
            <S.CameraSizeLabel htmlFor="size-slider">
              카메라 크기
            </S.CameraSizeLabel>
            <S.CameraSizeInput
              id="size-slider"
              type="range"
              min="0.2"
              max="1.5"
              step="0.05"
              value={videoScale}
              onChange={(e) => setVideoScale(parseFloat(e.target.value))}
            />
          </S.CameraSizeContainer>
        </S.CameraSizeRangeContainer>
      </S.SessionLayoutContainer>
    </S.SessionLayout>
  )
}

export default Session
