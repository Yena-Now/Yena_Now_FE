import { useState, useRef, useCallback, useEffect } from 'react'
import { LocalVideoTrack } from 'livekit-client'
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation'
import { useToast } from '@hooks/useToast'

export const useBackgroundRemoval = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [bgImageElement, setBgImageElement] = useState<HTMLImageElement | null>(
    null,
  )
  const [isBackgroundProcessing, setIsBackgroundProcessing] = useState(true)
  const [canvasSize, setCanvasSize] = useState({ width: 160, height: 100 })
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 })

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const selfieSegmentationRef = useRef<SelfieSegmentation | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const { error } = useToast()

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

  const createBackgroundRemovedTrack =
    useCallback(async (): Promise<LocalVideoTrack> => {
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

        const canvasStream = canvas.captureStream(15)
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

  return {
    backgroundImage,
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
  }
}
