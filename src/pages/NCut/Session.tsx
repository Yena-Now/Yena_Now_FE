import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRoom } from '@hooks/useRoom'
import { useBackgroundRemoval } from '@hooks/useBackgroundRemoval'
import { SessionPrompt } from '@components/NCut/SessionPrompt'
import { LoadingScreen } from '@components/NCut/LoadingScreen'
import { DraggableVideoContainer } from '@components/NCut/DraggableVideoContainer'
import VideoComponent from '@components/NCut/VideoComponent'
import AudioComponent from '@components/NCut/AudioComponent'
import { useToast } from '@hooks/useToast'

export const Session: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { error } = useToast()

  const localParticipantIdentity =
    localStorage.getItem('nickname') || 'Anonymous'

  const [userInteracted, setUserInteracted] = useState(false)
  const [showInteractionPrompt, setShowInteractionPrompt] = useState(false)
  const [hasAttemptedConnection, setHasAttemptedConnection] = useState(false)

  const {
    room,
    localTrack,
    remoteTracks,
    isConnecting,
    connectionStatus,
    connectToRoom,
    leaveRoom,
    setIsConnecting,
  } = useRoom()

  const {
    setBackgroundImage,
    bgImageElement,
    isBackgroundProcessing,
    canvasSize,
    setCanvasSize,
    canvasPosition,
    setCanvasPosition,
    canvasRef,
    videoRef,
    selfieSegmentationRef,
    animationFrameRef,
    createBackgroundRemovedTrack,
    cleanup,
    initializeSelfieSegmentation,
  } = useBackgroundRemoval()

  // MediaPipe processing effect
  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const selfieSegmentation = selfieSegmentationRef.current
    const ctx = canvas?.getContext('2d')

    if (!video || !canvas || !selfieSegmentation || !ctx) return

    selfieSegmentation.onResults((results) => {
      ctx.save()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(
        results.image,
        canvasPosition.x,
        canvasPosition.y,
        canvasSize.width,
        canvasSize.height,
      )
      ctx.globalCompositeOperation = 'destination-in'
      ctx.drawImage(
        results.segmentationMask,
        canvasPosition.x,
        canvasPosition.y,
        canvasSize.width,
        canvasSize.height,
      )
      ctx.globalCompositeOperation = 'destination-over'
      if (bgImageElement) {
        ctx.drawImage(bgImageElement, 0, 0, canvas.width, canvas.height)
      } else {
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      ctx.restore()
    })

    const sendFrame = async () => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        try {
          await selfieSegmentation.send({ image: video })
        } catch (err) {
          console.error('MediaPipe send failed:', err)
        }
      }
      animationFrameRef.current = requestAnimationFrame(sendFrame)
    }

    sendFrame()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgImageElement, canvasPosition, canvasSize])

  const handleUserInteraction = useCallback(async () => {
    setUserInteracted(true)
    setShowInteractionPrompt(false)

    try {
      await initializeSelfieSegmentation()
      if (location.state && !hasAttemptedConnection) {
        const { roomCode, token, backgroundImageUrl } = location.state
        if (roomCode && token) {
          setBackgroundImage(backgroundImageUrl || null)
          setIsConnecting(true)
          setHasAttemptedConnection(true)
          connectToRoom(token, createBackgroundRemovedTrack).finally(() =>
            setIsConnecting(false),
          )
        }
      }
    } catch (err) {
      console.error('User interaction setup error:', err)
      error(`초기화 실패: ${err}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    location.state,
    hasAttemptedConnection,
    initializeSelfieSegmentation,
    connectToRoom,
    createBackgroundRemovedTrack,
    error,
  ])

  const handleLeaveRoom = useCallback(async () => {
    cleanup()
    await leaveRoom()
    navigate('/film')
  }, [cleanup, leaveRoom, navigate])

  // Initial setup effect
  useEffect(() => {
    if (hasAttemptedConnection) return
    if (location.state) {
      const { roomCode, token } = location.state
      if (roomCode && token) {
        if (!userInteracted) setShowInteractionPrompt(true)
      } else {
        error('세션 정보가 올바르지 않습니다.')
        navigate('/')
      }
    } else {
      navigate('/')
    }
  }, [location.state, hasAttemptedConnection, userInteracted, error, navigate])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [animationFrameRef, cleanup])

  if (showInteractionPrompt) {
    return <SessionPrompt onStart={handleUserInteraction} />
  }

  if (isConnecting) {
    return (
      <LoadingScreen
        connectionStatus={connectionStatus}
        isBackgroundProcessing={isBackgroundProcessing}
      />
    )
  }

  if (!room && hasAttemptedConnection) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div>세션 연결에 실패했습니다.</div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          {connectionStatus}
        </div>
        <button onClick={() => navigate('/gallery')}>메인으로 돌아가기</button>
      </div>
    )
  }

  if (!room) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div>세션을 준비 중입니다...</div>
      </div>
    )
  }

  return (
    <div id="room">
      <div id="room-header">
        <div
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <button
            className="btn btn-danger"
            id="leave-room-button"
            onClick={handleLeaveRoom}
          >
            나가기
          </button>
        </div>
      </div>
      <div id="layout-container">
        {localTrack ? (
          <DraggableVideoContainer
            localTrack={localTrack}
            participantIdentity={localParticipantIdentity}
            canvasPosition={canvasPosition}
            canvasSize={canvasSize}
            setCanvasPosition={setCanvasPosition}
          />
        ) : (
          <div
            style={{
              width: '300px',
              height: '200px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #ddd',
            }}
          >
            {isBackgroundProcessing
              ? '배경 제거 설정 중...'
              : '카메라를 불러오는 중...'}
          </div>
        )}

        {remoteTracks.map((remoteTrack) =>
          remoteTrack.trackPublication.kind === 'video' ? (
            <VideoComponent
              key={remoteTrack.trackPublication.trackSid}
              track={remoteTrack.trackPublication.videoTrack!}
              participantIdentity={remoteTrack.participantIdentity}
            />
          ) : (
            <AudioComponent
              key={remoteTrack.trackPublication.trackSid}
              track={remoteTrack.trackPublication.audioTrack!}
            />
          ),
        )}

        <div style={{ marginTop: '10px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}
          >
            현재 크기: {canvasSize.width.toFixed(0)} x{' '}
            {canvasSize.height.toFixed(0)}
          </label>
          <input
            id="size-slider"
            type="range"
            min="200"
            max="1000"
            value={canvasSize.height}
            onChange={(e) => {
              const newHeight = Number(e.target.value)
              setCanvasSize({ width: newHeight * 1.6, height: newHeight })
            }}
            style={{
              appearance: 'none',
              position: 'relative',
              verticalAlign: 'middle',
              width: '100px',
              borderRadius: '20px',
              background: 'hsl(0,0%,80%)',
              boxShadow: '0 1px 0 hsla(0,0%,100%,.6)',
              overflow: 'hidden',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Session
