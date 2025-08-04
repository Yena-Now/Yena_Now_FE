import {
  LocalVideoTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
} from 'livekit-client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useToast } from '@hooks/useToast'
import VideoComponent from '@components/NCut/VideoComponent'
import AudioComponent from '@components/NCut/AudioComponent'
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation'

type TrackInfo = {
  trackPublication: RemoteTrackPublication
  participantIdentity: string
}

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL

export const Session: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const localParticipantIdentity =
    localStorage.getItem('nickname') || 'Anonymous'
  const { error } = useToast()

  const [room, setRoom] = useState<Room | undefined>(undefined)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [bgImageElement, setBgImageElement] = useState<HTMLImageElement | null>(
    null,
  )
  const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(
    undefined,
  )
  const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([])
  const [, setRoomCode] = useState('')
  const [, setIsHost] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [hasAttemptedConnection, setHasAttemptedConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<string>('준비 중...')
  const [isBackgroundProcessing, setIsBackgroundProcessing] = useState(true)
  const [userInteracted, setUserInteracted] = useState(false)
  const [showInteractionPrompt, setShowInteractionPrompt] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 160, height: 100 })

  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 })

  const connectionAttemptRef = useRef<boolean>(false)
  const roomRef = useRef<Room | undefined>(undefined)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const selfieSegmentationRef = useRef<SelfieSegmentation | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    roomRef.current = room
  }, [room])

  useEffect(() => {
    if (backgroundImage) {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = () => setBgImageElement(img)
      img.onerror = (err) => error(`배경 이미지 로드 실패: ${err}`)
      img.src = backgroundImage
    } else {
      setBgImageElement(null)
    }
  }, [backgroundImage, error])

  const initializeSelfieSegmentation = useCallback(async () => {
    if (selfieSegmentationRef.current) return
    const selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    })
    selfieSegmentation.setOptions({ modelSelection: 1, selfieMode: true })
    await selfieSegmentation.initialize()
    selfieSegmentationRef.current = selfieSegmentation
  }, [])

  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current = null
    }
    if (selfieSegmentationRef.current) {
      selfieSegmentationRef.current.close()
      selfieSegmentationRef.current = null
    }
    canvasRef.current = null
  }, [])

  const createBackgroundRemovedTrack = useCallback(async () => {
    try {
      setIsBackgroundProcessing(true)
      await initializeSelfieSegmentation()

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1920, height: 1080, frameRate: 30 },
        audio: false,
      })

      const video = document.createElement('video')
      video.srcObject = stream
      video.autoplay = true
      video.muted = true
      video.playsInline = true
      videoRef.current = video

      const canvas = document.createElement('canvas')
      canvasRef.current = canvas

      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => {
          video
            .play()
            .then(() => {
              canvas.width = video.videoWidth
              canvas.height = video.videoHeight
              resolve()
            })
            .catch(reject)
        }
      })

      const canvasStream = canvas.captureStream(15) // 입력 프레임과 일치
      const videoTrack = canvasStream.getVideoTracks()[0]
      if (!videoTrack) throw new Error('비디오 트랙을 생성할 수 없습니다.')

      const localVideoTrack = new LocalVideoTrack(videoTrack)
      setIsBackgroundProcessing(false)
      return localVideoTrack
    } catch (err) {
      error(`배경 제거 설정 오류: ${err}`)
      setIsBackgroundProcessing(false)
      throw err
    }
  }, [initializeSelfieSegmentation, error])

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
  }, [bgImageElement, canvasPosition, canvasSize])

  const connectToRoom = useCallback(
    async (token: string) => {
      if (connectionAttemptRef.current) return
      connectionAttemptRef.current = true
      setConnectionStatus('룸 생성 중...')

      try {
        const newRoom = new Room()
        newRoom.on(RoomEvent.Connected, () => setConnectionStatus('연결 완료'))
        newRoom.on(RoomEvent.Disconnected, (reason) =>
          setConnectionStatus(`연결 끊김: ${reason}`),
        )
        newRoom.on(RoomEvent.ConnectionStateChanged, (state) =>
          setConnectionStatus(`연결 상태: ${state}`),
        )
        newRoom.on(
          RoomEvent.TrackSubscribed,
          (_track, publication, participant) => {
            setRemoteTracks((prev) => [
              ...prev,
              {
                trackPublication: publication,
                participantIdentity: participant.identity,
              },
            ])
          },
        )
        newRoom.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
          setRemoteTracks((prev) =>
            prev.filter((t) => t.trackPublication !== publication),
          )
        })

        setRoom(newRoom)
        setConnectionStatus('서버 연결 중...')
        await newRoom.connect(LIVEKIT_URL, token)

        setConnectionStatus('배경 제거 카메라 설정 중...')
        await newRoom.localParticipant.setMicrophoneEnabled(true)
        const bgRemovedTrack = await createBackgroundRemovedTrack()
        await newRoom.localParticipant.publishTrack(bgRemovedTrack)
        setLocalTrack(bgRemovedTrack)
        setConnectionStatus('연결 완료')
      } catch (err) {
        console.error('Connection error:', err)
        error(`세션 연결 실패: ${err}`)
        setConnectionStatus(`연결 실패: ${String(err)}`)
        if (roomRef.current) {
          await roomRef.current.disconnect()
        }
      } finally {
        connectionAttemptRef.current = false
      }
    },
    [createBackgroundRemovedTrack, error],
  )

  const leaveRoom = useCallback(async () => {
    cleanup()
    if (roomRef.current) {
      await roomRef.current.disconnect()
    }
    setRoom(undefined)
    setLocalTrack(undefined)
    setRemoteTracks([])
    connectionAttemptRef.current = false
    navigate('/film')
  }, [navigate, cleanup])

  const handleUserInteraction = useCallback(async () => {
    setUserInteracted(true)
    setShowInteractionPrompt(false)

    try {
      await initializeSelfieSegmentation()
      if (location.state && !hasAttemptedConnection) {
        const {
          roomCode: newRoomCode,
          token,
          isHost: hostStatus,
        } = location.state
        if (newRoomCode && token) {
          setRoomCode(newRoomCode)
          setIsHost(hostStatus || false)
          setBackgroundImage(location.state.backgroundImageUrl || null)
          setIsConnecting(true)
          setHasAttemptedConnection(true)
          connectToRoom(token).finally(() => setIsConnecting(false))
        }
      }
    } catch (err) {
      console.error('User interaction setup error:', err)
      error(`초기화 실패: ${err}`)
    }
  }, [
    location.state,
    hasAttemptedConnection,
    initializeSelfieSegmentation,
    connectToRoom,
    error,
  ])

  useEffect(() => {
    if (hasAttemptedConnection) return
    if (location.state) {
      const { roomCode: newRoomCode, token } = location.state
      if (newRoomCode && token) {
        if (!userInteracted) setShowInteractionPrompt(true)
      } else {
        error('세션 정보가 올바르지 않습니다.')
        navigate('/')
      }
    } else {
      navigate('/')
    }
  }, [location.state, hasAttemptedConnection, userInteracted, error, navigate])

  useEffect(() => {
    return () => {
      cleanup()
      if (roomRef.current) {
        roomRef.current.disconnect().then((r) => {
          console.log('Disconnected from room:', r)
        })
      }
    }
  }, [cleanup])

  if (showInteractionPrompt) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '20px',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
          세션 시작 준비
        </div>
        <div style={{ fontSize: '14px', color: '#666', maxWidth: '400px' }}>
          배경 제거 기능을 사용하기 위해 브라우저 권한이 필요합니다.
          <br />
          아래 버튼을 클릭하여 세션을 시작해주세요.
        </div>
        <button
          onClick={handleUserInteraction}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          세션 시작하기
        </button>
      </div>
    )
  }

  if (isConnecting) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <div>세션에 연결 중...</div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          {connectionStatus}
        </div>
        {isBackgroundProcessing && (
          <div style={{ fontSize: '12px', color: '#888' }}>
            배경 제거 처리 중...
          </div>
        )}
      </div>
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
            onClick={leaveRoom}
          >
            나가기
          </button>
        </div>
      </div>
      <div id="layout-container">
        {localTrack ? (
          <div
            style={{
              position: 'relative',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const mouseX = e.clientX - rect.left
              const mouseY = e.clientY - rect.top

              // 비디오 이미지 영역을 클릭했는지 확인
              if (
                mouseX >= canvasPosition.x &&
                mouseX <= canvasPosition.x + canvasSize.width &&
                mouseY >= canvasPosition.y &&
                mouseY <= canvasPosition.y + canvasSize.height
              ) {
                setIsDragging(true)
                setDragOffset({
                  x: mouseX - canvasPosition.x,
                  y: mouseY - canvasPosition.y,
                })
              }
            }}
            onMouseMove={(e) => {
              if (!isDragging) return
              const rect = e.currentTarget.getBoundingClientRect()
              const mouseX = e.clientX - rect.left
              const mouseY = e.clientY - rect.top

              const newX = mouseX - dragOffset.x
              const newY = mouseY - dragOffset.y

              // 캔버스 경계 내에서만 이동하도록 제한
              const boundedX = Math.max(
                0,
                Math.min(newX, 1920 - canvasSize.width),
              )
              const boundedY = Math.max(
                0,
                Math.min(newY, 1080 - canvasSize.height),
              )

              setCanvasPosition({ x: boundedX, y: boundedY })
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            <VideoComponent
              track={localTrack}
              participantIdentity={localParticipantIdentity || '나'}
              local={true}
            />
          </div>
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
            style={{
              display: 'block',
              marginBottom: '5px',
              fontSize: '14px',
            }}
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
              setCanvasSize({
                width: newHeight * 1.6,
                height: newHeight,
              })
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
