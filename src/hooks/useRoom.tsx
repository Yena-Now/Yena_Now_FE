import { useState, useRef, useCallback } from 'react'
import {
  Room,
  RoomEvent,
  LocalVideoTrack,
  RemoteTrackPublication,
  RemoteVideoTrack,
  Participant,
  DataPacket_Kind,
  RemoteParticipant,
} from 'livekit-client'
import { useToast } from '@hooks/useToast'
import type { ChatMessage } from '@/types/Chat'

type TrackInfo = {
  track: RemoteVideoTrack
  participantIdentity: string
  element: HTMLVideoElement
  position: { x: number; y: number }
  size: { width: number; height: number }
  brightness: number
}

export type CountdownInfo = {
  action: 'capture' | 'record'
  initiator: string
}

export const useRoom = () => {
  const [room, setRoom] = useState<Room | undefined>(undefined)
  const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(
    undefined,
  )
  const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<string>('준비 중...')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [sharedUrls, setSharedUrls] = useState<string[]>([])
  const [countdownInfo, setCountdownInfo] = useState<CountdownInfo | null>(null)
  const [allUsersSelections, setAllUsersSelections] = useState<{
    [userId: string]: string[]
  }>({})
  const [currentEditPage, setCurrentEditPage] = useState<number>(0)
  const [isHost, setIsHost] = useState<boolean>(false)

  const connectionAttemptRef = useRef<boolean>(false)
  const roomRef = useRef<Room | undefined>(undefined)
  const { error } = useToast()

  const handleDataReceived = useCallback(
    (payload: Uint8Array, participant?: RemoteParticipant) => {
      if (!participant) return
      const decoder = new TextDecoder()
      const data = JSON.parse(decoder.decode(payload))

      if (data.type === 'positionUpdate') {
        setRemoteTracks((prev) =>
          prev.map((t) =>
            t.participantIdentity === participant.identity
              ? {
                  ...t,
                  position: data.position,
                  size: data.size,
                  brightness: data.brightness ?? 1,
                }
              : t,
          ),
        )
      } else if (data.type === 'chatMessage') {
        const newMessage: ChatMessage = {
          participantIdentity: data.nickname || participant.identity,
          message: data.message,
          timestamp: Date.now(),
        }
        setChatMessages((prev) => [...prev, newMessage])
      } else if (data.type === 'urlsUpdate') {
        setSharedUrls(data.urls)
      } else if (data.type === 'countdownStart') {
        setCountdownInfo({
          action: data.action,
          initiator: participant.identity,
        })
        setTimeout(() => setCountdownInfo(null), 3500)
      } else if (data.type === 'navigateToEdit') {
        sessionStorage.setItem('editData', JSON.stringify(data.editData))
        window.location.href = `/film/room/${data.roomCode}/edit`
      } else if (data.type === 'userSelection') {
        setAllUsersSelections((prev) => ({
          ...prev,
          [participant.identity]: data.selectedUrls,
        }))
      } else if (data.type === 'pageSync') {
        setCurrentEditPage(data.page)
      } else if (data.type === 'decorateUpdate') {
        window.dispatchEvent(
          new CustomEvent('decorateUpdate', { detail: data }),
        )
      }
    },
    [],
  )

  const broadcastPageChange = useCallback(
    (page: number) => {
      if (room && isHost) {
        const encoder = new TextEncoder()
        const data = encoder.encode(
          JSON.stringify({
            type: 'pageSync',
            page,
          }),
        )
        room.localParticipant
          .publishData(
            data,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            DataPacket_Kind.RELIABLE,
          )
          .then(() => {
            setCurrentEditPage(page)
          })
      }
    },
    [room, isHost],
  )

  const broadcastDecorateUpdate = useCallback(
    (decorateData: unknown) => {
      if (room) {
        const encoder = new TextEncoder()
        const data = encoder.encode(
          JSON.stringify({
            type: 'decorateUpdate',
            ...(typeof decorateData === 'object' && decorateData !== null
              ? decorateData
              : {}),
          }),
        )
        room.localParticipant
          .publishData(
            data,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            DataPacket_Kind.RELIABLE,
          )
          .then(() => {})
      }
    },
    [room],
  )

  const broadcastSelection = useCallback(
    (selectedUrls: string[]) => {
      if (room) {
        const encoder = new TextEncoder()
        const data = encoder.encode(
          JSON.stringify({
            type: 'userSelection',
            selectedUrls,
          }),
        )
        room.localParticipant
          .publishData(
            data,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            DataPacket_Kind.RELIABLE,
          )
          .then((r) => console.log(r))
      }
    },
    [room],
  )

  const handleTrackSubscribed = useCallback(
    (
      track: RemoteVideoTrack,
      _publication: RemoteTrackPublication,
      participant: Participant,
    ) => {
      if (track.kind !== 'video') return

      const element = track.attach()
      element.style.display = 'none'
      document.body.appendChild(element)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setRemoteTracks((prev) => [
        ...prev,
        {
          track,
          participantIdentity: participant.identity,
          element,
          position: { x: 0, y: 0 }, // 초기 위치
          size: { width: 320, height: 180 }, // 초기 크기
          brightness: 1, // 초기 밝기
        },
      ])
    },
    [],
  )

  const handleTrackUnsubscribed = useCallback(
    (_track: RemoteVideoTrack, publication: RemoteTrackPublication) => {
      setRemoteTracks((prev) =>
        prev.filter((t) => {
          if (t.track.sid === publication.trackSid) {
            t.track.detach(t.element)
            t.element.remove()
            return false
          }
          return true
        }),
      )
    },
    [],
  )

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        newRoom.on(RoomEvent.TrackSubscribed, handleTrackSubscribed)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        newRoom.on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
        newRoom.on(RoomEvent.DataReceived, handleDataReceived)

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
    [error, handleTrackSubscribed, handleTrackUnsubscribed, handleDataReceived],
  )

  const leaveRoom = useCallback(async () => {
    if (roomRef.current) {
      await roomRef.current.disconnect()
    }
    remoteTracks.forEach((t) => {
      t.track.detach(t.element)
      t.element.remove()
    })
    setRoom(undefined)
    setLocalTrack(undefined)
    setRemoteTracks([])
    connectionAttemptRef.current = false
  }, [remoteTracks])

  const sendData = useCallback(
    (
      position: { x: number; y: number },
      size: { width: number; height: number },
      brightness: number,
    ) => {
      if (roomRef.current) {
        const encoder = new TextEncoder()
        const data = encoder.encode(
          JSON.stringify({
            type: 'positionUpdate',
            position,
            size,
            brightness,
          }),
        )
        roomRef.current.localParticipant
          .publishData(
            data,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            DataPacket_Kind.RELIABLE,
          )
          // 이것도 .then을 사용하여 성공적으로 전송되었는지 확인할 수 있습니다.
          // 안쓰면 빨간줄 뜸!
          .then((r) => {
            console.log('Position data sent:', r)
          })
      }
    },
    [],
  )

  const sendChatMessage = useCallback((message: string) => {
    if (roomRef.current && message.trim()) {
      const nickname = localStorage.getItem('nickname') || 'Anonymous'

      const chatData = {
        type: 'chatMessage',
        message: message.trim(),
        nickname: nickname,
        timestamp: Date.now(),
      }

      const encoder = new TextEncoder()
      const data = encoder.encode(JSON.stringify(chatData))

      roomRef.current.localParticipant
        .publishData(
          data,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          DataPacket_Kind.RELIABLE,
        )
        .then(() => {
          const newMessage: ChatMessage = {
            participantIdentity: nickname as unknown as string,
            message: chatData.message,
            timestamp: chatData.timestamp,
          }
          setChatMessages((prev) => [...prev, newMessage])
        })
    }
  }, [])

  const sendUrls = useCallback((urls: string[]) => {
    if (roomRef.current) {
      const encoder = new TextEncoder()
      const data = encoder.encode(
        JSON.stringify({
          type: 'urlsUpdate',
          urls,
        }),
      )
      roomRef.current.localParticipant
        .publishData(
          data,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          DataPacket_Kind.RELIABLE,
        )
        .then(() => {
          setSharedUrls(urls)
        })
    }
  }, [])

  const sendNavigateToEdit = useCallback(
    (roomCode: string, editData: unknown) => {
      if (roomRef.current) {
        const encoder = new TextEncoder()
        const data = encoder.encode(
          JSON.stringify({
            type: 'navigateToEdit',
            roomCode,
            editData,
          }),
        )
        roomRef.current.localParticipant
          .publishData(
            data,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            DataPacket_Kind.RELIABLE,
          )
          .then(() => {
            console.log('Navigate to edit sent')
          })
      }
    },
    [],
  )

  const startSharedCountdown = useCallback((action: 'capture' | 'record') => {
    if (roomRef.current) {
      const data = { type: 'countdownStart', action }
      const encoder = new TextEncoder()
      const encodedData = encoder.encode(JSON.stringify(data))
      roomRef.current.localParticipant
        .publishData(
          encodedData,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          DataPacket_Kind.RELIABLE,
        )
        .then(() => {
          setCountdownInfo({
            action,
            initiator: roomRef.current!.localParticipant.identity,
          })
          setTimeout(() => setCountdownInfo(null), 3500)
        })
    }
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
    sendData,
    chatMessages,
    sendChatMessage,
    sharedUrls,
    sendUrls,
    countdownInfo,
    startSharedCountdown,
    sendNavigateToEdit,
    allUsersSelections,
    broadcastSelection,
    currentEditPage,
    setCurrentEditPage,
    isHost,
    setIsHost,
    broadcastPageChange,
    broadcastDecorateUpdate,
  }
}
