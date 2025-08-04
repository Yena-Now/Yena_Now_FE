import { useState, useRef, useCallback } from 'react'
import {
  Room,
  RoomEvent,
  LocalVideoTrack,
  RemoteTrackPublication,
} from 'livekit-client'
import { useToast } from '@hooks/useToast'

type TrackInfo = {
  trackPublication: RemoteTrackPublication
  participantIdentity: string
}

export const useRoom = () => {
  const [room, setRoom] = useState<Room | undefined>(undefined)
  const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(
    undefined,
  )
  const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<string>('준비 중...')

  const connectionAttemptRef = useRef<boolean>(false)
  const roomRef = useRef<Room | undefined>(undefined)
  const { error } = useToast()

  const connectToRoom = useCallback(
    async (
      token: string,
      createBackgroundRemovedTrack: () => Promise<LocalVideoTrack>,
    ) => {
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
        roomRef.current = newRoom
        setConnectionStatus('서버 연결 중...')
        await newRoom.connect(import.meta.env.VITE_LIVEKIT_URL, token)

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
    [error],
  )

  const leaveRoom = useCallback(async () => {
    if (roomRef.current) {
      await roomRef.current.disconnect()
    }
    setRoom(undefined)
    setLocalTrack(undefined)
    setRemoteTracks([])
    connectionAttemptRef.current = false
  }, [])

  return {
    room,
    localTrack,
    remoteTracks,
    isConnecting,
    connectionStatus,
    connectToRoom,
    leaveRoom,
    setIsConnecting,
  }
}
