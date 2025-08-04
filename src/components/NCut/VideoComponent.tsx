import { LocalVideoTrack, RemoteVideoTrack } from 'livekit-client'
import './VideoComponent.css'
import { useEffect, useRef } from 'react'

interface VideoComponentProps {
  track: LocalVideoTrack | RemoteVideoTrack
  participantIdentity: string
  local?: boolean
  hidden?: boolean // 숨김 처리 옵션 추가
}

function VideoComponent({
  track,
  participantIdentity,
  hidden = false,
}: VideoComponentProps) {
  const videoElement = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (videoElement.current) {
      track.attach(videoElement.current)
    }

    return () => {
      track.detach()
    }
  }, [track])

  return (
    <div
      id={'camera-' + participantIdentity}
      className="video-container"
      style={{ display: hidden ? 'none' : 'block' }}
    >
      <video
        ref={videoElement}
        id={track.sid}
        style={{ width: '70%', height: '100%' }}
      />
    </div>
  )
}

export default VideoComponent
