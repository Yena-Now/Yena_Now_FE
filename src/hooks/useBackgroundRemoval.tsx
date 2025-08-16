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
          audio: true,
        })

        const video = document.createElement('video')
        video.srcObject = stream
        video.autoplay = true
        video.muted = false
        video.playsInline = true
        videoRef.current = video

        video.style.display = 'none'
        document.body.appendChild(video)

        // previewCanvas: 로컬 화면에 보여지는 캔버스 (투명 배경)
        const previewCanvas = document.createElement('canvas')
        // captureCanvas: 네트워크로 전송될 캔버스 (초록 배경으로 채움)
        const captureCanvas = document.createElement('canvas')

        // previewCanvas를 외부에서 참조할 수 있게 설정
        canvasRef.current = previewCanvas

        await new Promise<void>((resolve, reject) => {
          video.onloadedmetadata = () => {
            video
              .play()
              .then(() => {
                // 두 캔버스 크기를 비디오 크기로 설정
                previewCanvas.width = video.videoWidth
                previewCanvas.height = video.videoHeight
                captureCanvas.width = video.videoWidth
                captureCanvas.height = video.videoHeight

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

        // 컨텍스트 준비
        const pctx = previewCanvas.getContext('2d', { alpha: true })
        const cctx = captureCanvas.getContext('2d', { alpha: false })
        if (!pctx || !cctx)
          throw new Error('Canvas context를 가져올 수 없습니다.')

        selfieSegmentation.onResults((results) => {
          const w = previewCanvas.width
          const h = previewCanvas.height

          // 임시 캔버스에 인물 알파 합성 (공통)
          const tmp = document.createElement('canvas')
          tmp.width = w
          tmp.height = h
          const tctx = tmp.getContext('2d')

          const maskCanvas = document.createElement('canvas')
          maskCanvas.width = w
          maskCanvas.height = h
          const mctx = maskCanvas.getContext('2d')

          if (tctx && mctx) {
            tctx.clearRect(0, 0, w, h)
            tctx.drawImage(results.image, 0, 0, w, h)

            // 마스크 블러로 가장자리 페더링
            mctx.clearRect(0, 0, w, h)
            mctx.filter = 'blur(2px)'
            mctx.drawImage(results.segmentationMask, 0, 0, w, h)
            mctx.filter = 'none'

            const maskData = mctx.getImageData(0, 0, w, h)
            const imgData = tctx.getImageData(0, 0, w, h)

            // 마스크를 알파로 적용
            for (let i = 0; i < maskData.data.length; i += 4) {
              const m = maskData.data[i]
              imgData.data[i + 3] = m
            }

            // 스필 보정
            for (let i = 0; i < imgData.data.length; i += 4) {
              const a = imgData.data[i + 3]
              if (a > 0 && a < 255) {
                const r = imgData.data[i]
                const g = imgData.data[i + 1]
                const b = imgData.data[i + 2]
                const alphaNorm = a / 255
                if (g > r + 20 && g > b + 20) {
                  const reduction = Math.round(
                    (g - Math.max(r, b)) * (1 - alphaNorm),
                  )
                  imgData.data[i + 1] = Math.max(0, g - reduction)
                }
              }
            }

            tctx.putImageData(imgData, 0, 0)

            // preview: 투명 배경 위에 인물만 그림
            pctx.clearRect(0, 0, w, h)
            pctx.drawImage(tmp, 0, 0, w, h)

            // capture: 초록 배경을 채운 뒤 인물 그림 -> 전송 프레임은 초록배경
            cctx.clearRect(0, 0, w, h)
            cctx.fillStyle = 'lime'
            cctx.fillRect(0, 0, w, h)
            cctx.drawImage(tmp, 0, 0, w, h)
          }
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

        // captureCanvas에서 스트림을 생성해서 publish
        const canvasStream = captureCanvas.captureStream(15)
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
