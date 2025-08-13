// hooks/useFfmpegGif.ts
import { useEffect, useRef, useState } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'

type ExtractParams = {
  src: string // 비디오 절대 URL 또는 File(Blob URL도 OK)
  start: number // 초(소수 가능)
  duration?: number // 기본 3
  fps?: number // 기본 15
  width?: number // 기본 1080
}

export function useFfmpegGif() {
  const ffmpegRef = useRef<FFmpeg | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const load = async () => {
      if (ffmpegRef.current) return
      const ffmpeg = new FFmpeg()
      ffmpeg.on('log', ({ message }) => {
        // console.log(message)
      })
      ffmpeg.on('progress', ({ progress }) => {
        setProgress(Math.round(progress * 100))
      })
      // wasm/worker 파일은 CDN이나 public 경로에 둬도 됨 (자동 fetch)
      await ffmpeg.load()
      ffmpegRef.current = ffmpeg
      setIsReady(true)
    }
    load()
  }, [])

  const extractGif = async ({
    src,
    start,
    duration = 3,
    fps = 10,
    width = 480,
  }: ExtractParams) => {
    if (!ffmpegRef.current) throw new Error('FFmpeg not ready')
    const ffmpeg = ffmpegRef.current
    setProgress(0)

    // 입력 파일 이름 고정
    const inputName = 'input.mp4'
    const paletteName = 'palette.png'
    const outputName = 'output.gif'

    // 원격 URL 가능 (CORS 허용 필요). File/Blob도 fetchFile로 처리 가능.
    const data = await fetchFile(src)
    await ffmpeg.writeFile(inputName, data)

    // split로 palettegen + paletteuse 한 번에 (3초 고정)
    // 정확 컷팅 위해 -ss/-t를 입력 뒤에 둠
    await ffmpeg.exec([
      '-i',
      inputName,
      '-ss',
      String(start),
      '-t',
      String(duration),
      '-vf',
      `fps=${fps},scale=${width}:-1:flags=lanczos,split[s0][s1];` +
        `[s0]palettegen=max_colors=256:stats_mode=diff[p];` +
        `[s1][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle`,
      '-loop',
      '0',
      outputName,
    ])

    const file = await ffmpeg.readFile(outputName)
    const blob = new Blob([file], { type: 'image/gif' })
    const url = URL.createObjectURL(blob)

    // 정리 (필수는 아님)
    try {
      await ffmpeg.deleteFile(inputName)
      await ffmpeg.deleteFile(paletteName) // 없어도 에러 안나게 try
      await ffmpeg.deleteFile(outputName)
    } catch (err) {
      console.log(err)
    }

    return { blob, url }
  }

  return { isReady, progress, extractGif }
}
