import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import * as S from '@/styles/components/Gif/TimeLineStyle'

type Props = {
  src: string
  durationFixed?: number // 기본 3초
  currentStart?: number // 외부에서 현재 선택 반영(선택사항)
  onChangeStart?: (startSec: number) => void
  thumbCount?: number // 썸네일 개수 (기본 30)
}

const TimeLine: React.FC<Props> = ({
  src,
  durationFixed = 3,
  currentStart = 0,
  onChangeStart,
  thumbCount = 30,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const trackRef = useRef<HTMLDivElement | null>(null)
  const [duration, setDuration] = useState<number>(0)
  const [thumbs, setThumbs] = useState<string[]>([])
  const [start, setStart] = useState<number>(0) // 내부 start (초)
  const [isDragging, setIsDragging] = useState(false)

  // 외부 상태와 동기화 (필수는 아님)
  useEffect(() => {
    setStart(currentStart ?? 0)
  }, [currentStart])

  // 비디오 메타데이터 로드 → 총 길이
  useEffect(() => {
    const v = document.createElement('video')
    v.preload = 'metadata'
    v.crossOrigin = 'anonymous'
    v.src = src
    const onLoaded = () => {
      setDuration(v.duration || 0)
    }
    v.addEventListener('loadedmetadata', onLoaded)
    videoRef.current = v
    return () => {
      v.removeEventListener('loadedmetadata', onLoaded)
      v.src = ''
      v.load()
      videoRef.current = null
    }
  }, [src])

  // 썸네일 생성
  useEffect(() => {
    if (!videoRef.current || duration === 0) return
    const v = videoRef.current
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const captures: string[] = []
    const count = Math.max(thumbCount, 8)
    const times = Array.from(
      { length: count },
      (_, i) => (duration * i) / (count - 1),
    )

    let cancelled = false

    const drawAt = (time: number) =>
      new Promise<void>((resolve) => {
        const onSeeked = () => {
          // 캔버스 크기: 가로 기준 균일 썸네일
          const w = 120
          const r = v.videoWidth / v.videoHeight || 1.777
          c.width = w
          c.height = Math.round(w / r)
          ctx.drawImage(v, 0, 0, c.width, c.height)
          captures.push(c.toDataURL('image/jpeg', 0.75))
          v.removeEventListener('seeked', onSeeked)
          resolve()
        }
        v.addEventListener('seeked', onSeeked)
        v.currentTime = Math.min(
          Math.max(time, 0),
          Math.max(duration - 0.01, 0),
        )
      })

    ;(async () => {
      // iOS 등에서 play()가 필요한 경우가 있어 mute 처리
      try {
        v.muted = true
        await v.play()
        v.pause()
      } catch (err) {
        console.log(err)
      }
      for (const t of times) {
        if (cancelled) break
        // eslint-disable-next-line no-await-in-loop
        await drawAt(t)
      }
      if (!cancelled) setThumbs(captures)
    })()

    return () => {
      cancelled = true
    }
  }, [duration, thumbCount])

  // 포지션 → 시간 변환
  const pxToTime = useCallback(
    (clientX: number) => {
      const el = trackRef.current
      if (!el) return 0
      const rect = el.getBoundingClientRect()
      const ratio = (clientX - rect.left) / rect.width
      const t = Math.max(0, Math.min(duration, ratio * duration))
      // 3초 윈도우가 나가지 않게 clamp
      return Math.max(0, Math.min(t, Math.max(duration - durationFixed, 0)))
    },
    [duration, durationFixed],
  )

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true)
      const t = pxToTime(e.clientX)
      setStart(t)
      onChangeStart?.(t)
    },
    [pxToTime, onChangeStart],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return
      const t = pxToTime(e.clientX)
      setStart(t)
      onChangeStart?.(t)
    },
    [isDragging, pxToTime, onChangeStart],
  )

  const onPointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // 선택 윈도우(3초)의 가로폭 %
  const windowStyle = useMemo(() => {
    if (duration <= 0) return { left: '0%', width: '0%' }
    const left = (start / duration) * 100
    const width = (Math.min(durationFixed, duration) / duration) * 100
    return { left: `${left}%`, width: `${width}%` }
  }, [start, duration, durationFixed])

  return (
    <Wrap>
      <Label>원하는 구간을 선택하세요. (3초)</Label>

      <Track
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <ThumbRow>
          {thumbs.map((src, i) => (
            <Thumb key={i} src={src} alt={`thumb-${i}`} draggable={false} />
          ))}
        </ThumbRow>

        {/* 선택 윈도우 */}
        <Window style={windowStyle}>
          <WindowInner />
        </Window>
      </Track>

      <Meta>
        <span>시작: {start.toFixed(2)}s</span>
        <span> / 길이: {Math.min(durationFixed, duration).toFixed(2)}s</span>
      </Meta>
    </Wrap>
  )
}

export default TimeLine
const Wrap = styled.div`
  width: 100%;
  margin-top: 1.25rem;
  user-select: none;
`

const Label = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 600;
`

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 96px;
  border-radius: 8px;
  background: #fafafa;
  overflow: hidden;
  border: 1px solid #eee;
  touch-action: none; /* 모바일 드래그 */
  cursor: pointer;
`

const ThumbRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 120px;
  gap: 0px;
  height: 100%;
`

const Thumb = styled.img`
  width: 120px;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
`

const Window = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  /* left, width는 인라인 style로 퍼센티지 지정 */
  border: 2px solid #ffb300;
  box-shadow: inset 0 0 0 9999px rgba(255, 179, 0, 0.15);
  pointer-events: none;
  transition: left 0.06s linear;
  border-radius: 6px;
`

const WindowInner = styled.div`
  position: absolute;
  inset: 0;
  border-left: 3px solid #ffb300;
  border-right: 3px solid #ffb300;
`

const Meta = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 12px;
  color: #666;
  font-size: 0.9rem;
`
