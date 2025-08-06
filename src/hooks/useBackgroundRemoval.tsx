import { useState, useRef, useCallback } from 'react'
import { LocalVideoTrack } from 'livekit-client'
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation'
import { useToast } from '@hooks/useToast'

export const useBackgroundRemoval = () => {
  const [isBackgroundProcessing, setIsBackgroundProcessing] = useState(true)
  const [canvasSize, setCanvasSize] = useState({ width: 320, height: 200 })
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 })

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const selfieSegmentationRef = useRef<SelfieSegmentation | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const { error } = useToast()

  const initializeSelfieSegmentation = useCallback(async () => {
    if (selfieSegmentationRef.current) return selfieSegmentationRef.current
    const selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    })
    selfieSegmentation.setOptions({ modelSelection: 1, selfieMode: true })
    await selfieSegmentation.initialize()
    selfieSegmentationRef.current = selfieSegmentation
    return selfieSegmentation
  }, [])

  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      if (videoRef.current.parentNode) {
        videoRef.current.parentNode.removeChild(videoRef.current)
      }
      videoRef.current = null
    }
    if (selfieSegmentationRef.current) {
      selfieSegmentationRef.current.close()
      selfieSegmentationRef.current = null
    }
    canvasRef.current = null
  }, [])

  const createBackgroundRemovedTrack =
    useCallback(async (): Promise<LocalVideoTrack> => {
      setIsBackgroundProcessing(true)
      try {
        const selfieSegmentation = await initializeSelfieSegmentation()

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, frameRate: 15 },
          audio: false,
        })

        const video = document.createElement('video')
        video.srcObject = stream
        video.autoplay = true
        video.muted = true
        video.playsInline = true
        videoRef.current = video

        video.style.display = 'none'
        document.body.appendChild(video)

        const canvas = document.createElement('canvas')
        canvasRef.current = canvas

        await new Promise<void>((resolve, reject) => {
          video.onloadedmetadata = () => {
            video
              .play()
              .then(() => {
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight
                setCanvasSize({
                  width: video.videoWidth / 2,
                  height: video.videoHeight / 2,
                })
                resolve()
              })
              .catch(reject)
          }
          video.onerror = reject
        })

        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) throw new Error('Canvas context를 가져올 수 없습니다.')

        selfieSegmentation.onResults((results) => {
          ctx.save()
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height)
          ctx.globalCompositeOperation = 'destination-in'
          ctx.drawImage(
            results.segmentationMask,
            0,
            0,
            canvas.width,
            canvas.height,
          )
          ctx.globalCompositeOperation = 'source-over'
          ctx.restore()
        })

        const sendFrame = async () => {
          if (
            videoRef.current &&
            videoRef.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
            !videoRef.current.paused
          ) {
            await selfieSegmentation.send({ image: videoRef.current })
          }
          animationFrameRef.current = requestAnimationFrame(sendFrame)
        }
        sendFrame()

        const canvasStream = canvas.captureStream(15)
        const videoTrack = canvasStream.getVideoTracks()[0]
        if (!videoTrack) throw new Error('비디오 트랙을 생성할 수 없습니다.')

        const localVideoTrack = new LocalVideoTrack(videoTrack)
        setIsBackgroundProcessing(false)
        return localVideoTrack
      } catch (err) {
        error(`배경 제거 설정 오류: ${err}`)
        cleanup()
        setIsBackgroundProcessing(false)
        throw err
      }
    }, [initializeSelfieSegmentation, error, cleanup])

  return {
    isBackgroundProcessing,
    canvasSize,
    setCanvasSize,
    canvasPosition,
    setCanvasPosition,
    canvasRef,
    createBackgroundRemovedTrack,
    cleanup,
  }
}
