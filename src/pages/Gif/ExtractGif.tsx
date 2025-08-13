import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { nCutDetail } from '@/api/ncutdetail'
import { useToast } from '@/hooks/useToast'
import { FiDownload } from 'react-icons/fi'
import Video from '@/components/Gif/Video'
import TimeLine from '@/components/Gif/TimeLine'
import * as S from '@styles/pages/Gif/ExtractGifStyle'
import * as T from '@/styles/components/Common/LoadingStyle'
import { useFfmpegGif } from '@/hooks/useFfmpegGif'

const ExtractGif = () => {
  const [searchParams] = useSearchParams()
  const { error } = useToast()
  const [nCutUrl, setNCutUrl] = useState<string>('')
  const [startSec, setStartSec] = useState<number>(0) // 3초 고정의 시작점
  const [gifUrl, setGifUrl] = useState<string>('')

  const { isReady, progress, extractGif } = useFfmpegGif()

  // 절대 URL 보정 (이미 절대 경로면 그대로 사용)
  const absoluteSrc = useMemo(() => {
    if (!nCutUrl) return ''
    // nCutUrl이 키/상대경로라면 S3 도메인 붙이기
    const isAbsolute = /^https?:\/\//i.test(nCutUrl)
    return isAbsolute
      ? nCutUrl
      : `https://yenanow.s3.ap-northeast-2.amazonaws.com/${nCutUrl}`
  }, [nCutUrl])

  useEffect(() => {
    const nCutUuid = searchParams.get('video')
    if (!nCutUuid) return
    const getNCutDetail = async () => {
      try {
        const response = await nCutDetail.getNCutDetail(nCutUuid)
        setNCutUrl(response.ncutUrl)
      } catch {
        error('다시 시도해주세요')
      }
    }
    getNCutDetail()
  }, [])

  const handleExport = async () => {
    try {
      if (!absoluteSrc) return
      if (!isReady) {
        error('준비 중입니다. 잠시 후 다시 시도해 주세요.')
        return
      }
      // 기존 결과 URL 정리
      if (gifUrl) URL.revokeObjectURL(gifUrl)

      const { url } = await extractGif({
        src: absoluteSrc,
        start: Math.max(startSec, 0),
        duration: 3,
        fps: 15,
        width: 1080,
      })
      setGifUrl(url)

      // 자동 다운로드
      const a = document.createElement('a')
      a.href = url
      a.download = `clip_${Date.now()}.gif`
      document.body.appendChild(a)
      a.click()
      a.remove()
    } catch {
      error('GIF 변환에 실패했습니다.')
    }
  }

  return (
    <>
      {absoluteSrc ? (
        <S.Container>
          <S.TitleText>GIF로 내보내기</S.TitleText>

          {/* 미리보기 비디오 */}
          <Video src={absoluteSrc} />

          {/* 타임라인: 시작점만 선택하면 3초 고정 */}
          <TimeLine
            src={absoluteSrc}
            durationFixed={3}
            onChangeStart={(sec: number) => setStartSec(sec)}
            // 선택 구간 시각화를 위해 현재 startSec 전달(선택 사항)
            currentStart={startSec}
          />

          {/* 진행상태 / 완료 버튼 */}
          <S.ButtonSection>
            <button onClick={handleExport} disabled={!isReady}>
              <FiDownload />
              {isReady
                ? progress > 0 && progress < 100
                  ? `처리 중... ${progress}%`
                  : '완료'
                : '로딩 중...'}
            </button>
          </S.ButtonSection>

          {/* 결과 미리보기(선택) */}
          {gifUrl && (
            // <S.ResultPreview>
            <div>
              <img src={gifUrl} alt="gif result" />
            </div>
            // </S.ResultPreview>
          )}
        </S.Container>
      ) : (
        <T.LoaderWrapper>
          <T.Spinner />
          <T.LoadingText>로딩 중입니다...</T.LoadingText>
        </T.LoaderWrapper>
      )}
    </>
  )
}

export default ExtractGif
