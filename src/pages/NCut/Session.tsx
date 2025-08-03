import {
  LocalVideoTrack,
  RemoteParticipant,
  RemoteTrack,
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
  const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(
    undefined,
  )
  const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([])
  const [roomCode, setRoomCode] = useState('')
  const [isHost, setIsHost] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [hasAttemptedConnection, setHasAttemptedConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<string>('준비 중...')
  const [isBackgroundProcessing, setIsBackgroundProcessing] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const [showInteractionPrompt, setShowInteractionPrompt] = useState(false)

  const connectionAttemptRef = useRef<boolean>(false)
  const roomRef = useRef<Room | undefined>(undefined)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const selfieSegmentationRef = useRef<SelfieSegmentation | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    roomRef.current = room
  }, [room])

  // MediaPipe Selfie Segmentation 초기화
  const initializeSelfieSegmentation = useCallback(() => {
    if (!selfieSegmentationRef.current) {
      const selfieSegmentation = new SelfieSegmentation({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
        },
      })

      selfieSegmentation.setOptions({
        modelSelection: 1,
        selfieMode: true,
      })

      selfieSegmentationRef.current = selfieSegmentation
    }
  }, [])

  // 배경 제거 처리 함수
  const processVideoFrame = useCallback(() => {
    if (
      !canvasRef.current ||
      !videoRef.current ||
      !selfieSegmentationRef.current
    ) {
      return
    }

    const canvas = canvasRef.current
    const video = videoRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx || video.readyState !== video.HAVE_ENOUGH_DATA) {
      animationFrameRef.current = requestAnimationFrame(processVideoFrame)
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    selfieSegmentationRef.current.onResults((results) => {
      ctx.save()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 배경 색상 (원하는 색상으로 변경 가능)
      ctx.fillStyle = '#00ff00' // 크로마키용 녹색
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 마스크 적용
      ctx.globalCompositeOperation = 'destination-atop'
      ctx.drawImage(results.segmentationMask, 0, 0, canvas.width, canvas.height)

      // 사람 부분 그리기
      ctx.globalCompositeOperation = 'source-over'
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      ctx.restore()
    })

    selfieSegmentationRef.current.send({ image: video })
    animationFrameRef.current = requestAnimationFrame(processVideoFrame)
  }, [])

  // 배경 제거가 적용된 비디오 트랙 생성
  const createBackgroundRemovedTrack = useCallback(async () => {
    try {
      setIsBackgroundProcessing(true)

      // MediaPipe가 초기화되지 않았다면 초기화
      if (!selfieSegmentationRef.current) {
        initializeSelfieSegmentation()
      }

      // 캔버스 생성
      const canvas = document.createElement('canvas')
      canvas.style.display = 'none'
      document.body.appendChild(canvas)
      canvasRef.current = canvas

      // 원본 비디오 스트림 가져오기
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      })

      // 비디오 요소 생성
      const video = document.createElement('video')
      video.srcObject = stream
      video.autoplay = true
      video.muted = true
      videoRef.current = video

      await video.play()

      // 비디오가 준비되면 처리 시작
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        processVideoFrame()
      }

      // 캔버스에서 스트림 생성
      const canvasStream = canvas.captureStream(30)
      const videoTrack = canvasStream.getVideoTracks()[0]

      if (videoTrack) {
        const localVideoTrack = new LocalVideoTrack(videoTrack)
        setIsBackgroundProcessing(false)
        return localVideoTrack
      }

      throw new Error('비디오 트랙 생성 실패')
    } catch (err) {
      console.error('Background removal setup error:', err)
      setIsBackgroundProcessing(false)
      throw err
    }
  }, [initializeSelfieSegmentation, processVideoFrame])

  // 정리 함수
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current = null
    }

    if (canvasRef.current && canvasRef.current.parentNode) {
      canvasRef.current.parentNode.removeChild(canvasRef.current)
      canvasRef.current = null
    }
  }, [])

  const connectToRoom = useCallback(
    async (token: string) => {
      if (connectionAttemptRef.current) {
        return
      }

      connectionAttemptRef.current = true
      setConnectionStatus('룸 생성 중...')

      try {
        const newRoom = new Room()

        // 이벤트 핸들러 등록
        newRoom.on(RoomEvent.Connected, () => {
          console.log('Room connected successfully')
          setConnectionStatus('연결 완료')
        })

        newRoom.on(RoomEvent.Disconnected, (reason) => {
          console.log('Room disconnected:', reason)
          setConnectionStatus(`연결 끊김: ${reason}`)
        })

        newRoom.on(RoomEvent.ConnectionStateChanged, (state) => {
          console.log('Connection state changed:', state)
          setConnectionStatus(`연결 상태: ${state}`)
        })

        newRoom.on(
          RoomEvent.TrackSubscribed,
          (
            _track: RemoteTrack,
            publication: RemoteTrackPublication,
            participant: RemoteParticipant,
          ) => {
            console.log(
              'Track subscribed:',
              publication.kind,
              participant.identity,
            )
            setRemoteTracks((prevTracks) => [
              ...prevTracks,
              {
                trackPublication: publication,
                participantIdentity: participant.identity,
              },
            ])
          },
        )

        newRoom.on(
          RoomEvent.TrackUnsubscribed,
          (_track: RemoteTrack, publication: RemoteTrackPublication) => {
            console.log('Track unsubscribed:', publication.kind)
            setRemoteTracks((prevTracks) =>
              prevTracks.filter(
                (trackInfo) => trackInfo.trackPublication !== publication,
              ),
            )
          },
        )

        setRoom(newRoom)
        setConnectionStatus('서버 연결 중...')

        await newRoom.connect(LIVEKIT_URL, token)
        setConnectionStatus('배경 제거 카메라 설정 중...')

        try {
          // 오디오는 일반적으로 활성화
          await newRoom.localParticipant.setMicrophoneEnabled(true)

          // 배경 제거가 적용된 비디오 트랙 생성 및 발행
          const backgroundRemovedTrack = await createBackgroundRemovedTrack()
          await newRoom.localParticipant.publishTrack(backgroundRemovedTrack)
          setLocalTrack(backgroundRemovedTrack)

          setConnectionStatus('연결 완료')
        } catch (mediaError) {
          console.error('Media setup error:', mediaError)
          error(`카메라 설정 실패: ${mediaError}`)
          setConnectionStatus('미디어 설정 실패')
        }
      } catch (err) {
        console.error('Connection error:', err)
        error(`세션 연결 실패: ${err}`)
        setConnectionStatus(`연결 실패: ${err}`)
        await leaveRoom()
      } finally {
        connectionAttemptRef.current = false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [error, createBackgroundRemovedTrack],
  )

  const leaveRoom = useCallback(async () => {
    cleanup()

    if (roomRef.current) {
      try {
        await roomRef.current.disconnect()
        console.log('Room disconnected successfully')
      } catch (err) {
        console.warn('Disconnect failed:', err)
      }
    }

    setRoom(undefined)
    setLocalTrack(undefined)
    setRemoteTracks([])
    connectionAttemptRef.current = false
    navigate('/film')
  }, [navigate, cleanup])

  // 사용자 상호작용 처리 - connectToRoom이 정의된 후에 위치
  const handleUserInteraction = useCallback(async () => {
    setUserInteracted(true)
    setShowInteractionPrompt(false)

    // 사용자 제스처 후 MediaPipe 초기화
    try {
      initializeSelfieSegmentation()

      // 연결 정보가 있다면 방 연결 시작
      if (location.state && !hasAttemptedConnection) {
        const {
          roomCode: newRoomCode,
          token,
          isHost: hostStatus,
        } = location.state

        if (newRoomCode && token) {
          console.log('Connecting to room:', newRoomCode)
          setRoomCode(newRoomCode)
          setIsHost(hostStatus || false)
          setIsConnecting(true)
          setHasAttemptedConnection(true)

          connectToRoom(token).finally(() => {
            setIsConnecting(false)
          })
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

  // useEffect: 사용자 상호작용 확인
  useEffect(() => {
    if (hasAttemptedConnection) {
      return
    }

    if (location.state) {
      const { roomCode: newRoomCode, token } = location.state

      if (newRoomCode && token) {
        if (!userInteracted) {
          setShowInteractionPrompt(true)
        }
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
        try {
          roomRef.current.disconnect()
        } catch (err) {
          console.warn('Cleanup disconnect failed:', err)
        }
      }
    }
  }, [cleanup])

  // 사용자 상호작용 프롬프트
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

  // 연결 중 화면
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

  // 연결 실패 화면
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
        <button onClick={() => navigate('/film')}>메인으로 돌아가기</button>
      </div>
    )
  }

  // 준비 중 화면
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

  // 메인 화면
  return (
    <div id="room">
      <div id="room-header">
        <h2 id="room-title">
          방 코드: {roomCode} {isHost && '(방장)'}
        </h2>
        <div style={{ fontSize: '12px', color: '#666' }}>
          {connectionStatus} • 배경 제거 활성화됨
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
          <VideoComponent
            track={localTrack}
            participantIdentity={localParticipantIdentity || '나'}
            local={true}
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
      </div>
    </div>
  )
}

export default Session
