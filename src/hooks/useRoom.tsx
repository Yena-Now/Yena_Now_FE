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
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

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
  const navigate = useNavigate()
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
  const [selectedUrls, setSelectedUrls] = useState<string[]>([])
  const [selectedFrame, setSelectedFrame] = useState<string>('')
  const [mergedUrl, setMergedUrl] = useState<string>('')
  const connectionAttemptRef = useRef<boolean>(false)
  const roomRef = useRef<Room | undefined>(undefined)
  const { error } = useToast()

  const broadcastPageChange = useCallback(
    (page: number) => {
      const currentRoom = roomRef.current || room

      if (!currentRoom || currentRoom.state !== 'connected') {
        error('연결이 끊어진 상태에서는 페이지를 변경할 수 없습니다.')
        return
      }

      if (!isHost) {
        error('호스트만 페이지를 변경할 수 있습니다.')
        return
      }

      // 로컬 상태 업데이트
      setCurrentEditPage(page)

      const encoder = new TextEncoder()
      const message = encoder.encode(
        JSON.stringify({
          type: 'pageSync',
          page: page,
          timestamp: Date.now(),
          currentSelections: {
            selectedUrls: selectedUrls,
            selectedFrame: selectedFrame,
          },
        }),
      )

      currentRoom.localParticipant
        .publishData(
          message,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          DataPacket_Kind.RELIABLE,
        )
        .then(() => {})
        .catch(() => {
          error('페이지 변경 브로드캐스트에 실패했습니다.')
        })
    },
    [room, isHost, error, setCurrentEditPage, selectedUrls, selectedFrame],
  )

  const broadcastHostSelection = useCallback(
    (data: { selectedUrls?: string[]; selectedFrame?: string }) => {
      const currentRoom = roomRef.current || room
      if (!currentRoom) {
        return
      }
      if (!isHost) {
        return
      }
      if (data.selectedUrls !== undefined) {
        setSelectedUrls(data.selectedUrls)
      }
      if (data.selectedFrame !== undefined) {
        setSelectedFrame(data.selectedFrame)
      }

      const encoder = new TextEncoder()
      const message = encoder.encode(
        JSON.stringify({
          type: 'hostSelection',
          ...data,
        }),
      )

      currentRoom.localParticipant
        .publishData(
          message,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          DataPacket_Kind.RELIABLE,
        )
        .then(() => {})
        .catch(() => {})
    },
    [isHost, room],
  )

  const broadcastDecorateUpdate = useCallback(
    (decorateData: unknown) => {
      const currentRoom = roomRef.current || room

      if (!currentRoom) {
        return
      }

      if (currentRoom.state !== 'connected' || currentRoom.engine.isClosed) {
        return
      }

      const encoder = new TextEncoder()

      const decorateObj = decorateData as {
        type: string
        data: unknown
        imageIndex: number
      }

      const message = encoder.encode(
        JSON.stringify({
          type: 'decorateUpdate',
          actionType: decorateObj.type,
          data: decorateObj.data,
          imageIndex: decorateObj.imageIndex,
        }),
      )

      currentRoom.localParticipant
        .publishData(
          message,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          DataPacket_Kind.RELIABLE,
        )
        .then(() => {})
        .catch(() => {})
    },
    [room],
  )

  const broadcastSelection = useCallback(
    (selectedUrls: string[]) => {
      const currentRoom = roomRef.current || room

      if (currentRoom) {
        const encoder = new TextEncoder()

        const data = encoder.encode(
          JSON.stringify({
            type: 'userSelection',
            selectedUrls,
          }),
        )

        currentRoom.localParticipant
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
  const user = useAuthStore((state) => state.user)

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
        const userToken =
          sessionStorage.getItem('userToken') ||
          localStorage.getItem('userToken') ||
          ''
        const editDataWithToken = {
          ...data.editData,
          token: userToken,
        }
        sessionStorage.setItem('editData', JSON.stringify(editDataWithToken))
        navigate(`/film/room/${data.roomCode}/edit`)
      } else if (data.type === 'userSelection') {
        setAllUsersSelections((prev) => ({
          ...prev,
          [participant.identity]: data.selectedUrls,
        }))
      } else if (data.type === 'pageSync') {
        if (data.currentSelections) {
          if (data.currentSelections.selectedUrls) {
            setSelectedUrls(data.currentSelections.selectedUrls)
          }
          if (data.currentSelections.selectedFrame) {
            setSelectedFrame(data.currentSelections.selectedFrame)
          }
        }

        setCurrentEditPage(data.page)

        window.dispatchEvent(
          new CustomEvent('pageSync', {
            detail: {
              page: data.page,
              currentSelections: data.currentSelections,
            },
          }),
        )
      } else if (data.type === 'hostSelection') {
        if (data.selectedUrls) {
          setSelectedUrls(data.selectedUrls)
        }
        if (data.selectedFrame) {
          setSelectedFrame(data.selectedFrame)
        }
        window.dispatchEvent(
          new CustomEvent('hostSelection', {
            detail: {
              selectedUrls: data.selectedUrls,
              selectedFrame: data.selectedFrame,
            },
          }),
        )
      } else if (data.type === 'decorateUpdate') {
        window.dispatchEvent(
          new CustomEvent('decorateUpdate', {
            detail: {
              type: data.actionType || data.type,
              data: data.data,
              imageIndex: data.imageIndex,
              participantId: participant.identity,
            },
          }),
        )
      } else if (data.type === 'navigateToNextPage') {
        if (data.editData) {
          setSelectedUrls(data.editData.selectedUrls)
        }
        if (data.editData.selectedFrame) {
          setSelectedFrame(data.editData.selectedFrame)
        }
        window.dispatchEvent(
          new CustomEvent('navigateToNextPage', { detail: data.editData }),
        )
      }
    },

    [navigate],
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
      if (roomRef.current) return
      if (connectionAttemptRef.current) return

      connectionAttemptRef.current = true
      setConnectionStatus('룸 생성 중...')

      try {
        const newRoom = new Room({
          audioCaptureDefaults: {
            autoGainControl: false,
            echoCancellation: false,
            noiseSuppression: false,
          },
        })
        roomRef.current = newRoom
        setRoom(newRoom)
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

        setConnectionStatus('서버 연결 중...')

        const connectPromise = newRoom.connect(
          import.meta.env.VITE_LIVEKIT_URL,
          token,
        )

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Connection timeout')), 15000),
        )

        await Promise.race([connectPromise, timeoutPromise])

        // 연결 안정화를 위한 대기 시간 추가
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setConnectionStatus('마이크 활성화 중...')
        await newRoom.localParticipant.setMicrophoneEnabled(true)

        // 마이크 활성화 후 추가 대기
        await new Promise((resolve) => setTimeout(resolve, 500))

        setConnectionStatus('배경 제거 카메라 설정 중...')
        const bgRemovedTrack = await createBackgroundRemovedTrack()

        if (newRoom.state !== 'connected') {
          throw new Error('Room is not connected before publishing track')
        }

        await newRoom.localParticipant.publishTrack(bgRemovedTrack)
        setLocalTrack(bgRemovedTrack)
        setConnectionStatus('연결 완료')
      } catch (err) {
        error(`세션 연결 실패: ${err}`)
        setConnectionStatus(`연결 실패: ${String(err)}`)
        if (roomRef.current) {
          try {
            await roomRef.current.disconnect()
          } catch {
            /* empty */
          }

          roomRef.current = undefined

          setRoom(undefined)
        }

        throw err
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
          .then(() => {})
      }
    },
    [],
  )

  const sendChatMessage = useCallback((message: string) => {
    if (roomRef.current && message.trim()) {
      const nickname = user?.nickname || 'Anonymous'

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { token, ...editDataWithoutToken } = editData as {
          token?: string
          [key: string]: unknown
        }
        const data = encoder.encode(
          JSON.stringify({
            type: 'navigateToEdit',
            roomCode,
            editData: editDataWithoutToken,
          }),
        )
        roomRef.current.localParticipant
          .publishData(
            data,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            DataPacket_Kind.RELIABLE,
          )
          .then(() => {})
      }
    },
    [],
  )

  const sendNavigateToNextPage = useCallback(
    (roomCode: string, editData: unknown) => {
      if (roomRef.current) {
        const encoder = new TextEncoder()
        const data = encoder.encode(
          JSON.stringify({
            type: 'navigateToNextPage',
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
          .then(() => {})
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
    broadcastHostSelection,
    sendNavigateToNextPage,
    selectedUrls,
    selectedFrame,
    setSelectedUrls,
    setSelectedFrame,
    mergedUrl,
    setMergedUrl,
  }
}
