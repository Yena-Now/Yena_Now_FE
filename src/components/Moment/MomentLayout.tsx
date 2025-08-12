import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import type { RankingResponse } from '@/types/moment'
import MomentCut from '@components/Moment/MomentCut'
import { IoIosArrowForward } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'
import { FaRegHeart } from 'react-icons/fa'
import * as S from '@styles/components/Moment/MomentLayoutStyle'
import * as T from '@styles/components/Moment/MomentCutStyle'

interface MomentLayoutProps {
  nCuts: RankingResponse
}

const MomentLayout: React.FC<MomentLayoutProps> = ({ nCuts }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const weekly = searchParams.has('weekly')

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const [orient, setOrient] = useState<'portrait' | 'landscape'>('landscape')
  const handleVideoLoad = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    const { videoWidth, videoHeight } = v
    setOrient(videoWidth >= videoHeight ? 'landscape' : 'portrait')
  }, [])

  const handleImageLoad = useCallback(() => {
    const i = imgRef.current
    if (!i) return
    setOrient(i.naturalWidth >= i.naturalHeight ? 'landscape' : 'portrait')
  }, [])

  const getExt = (url: string): string => {
    const clean = url.split('#')[0].split('?')[0]
    const i = clean.lastIndexOf('.')
    return i >= 0 ? clean.slice(i + 1).toLowerCase() : ''
  }

  const getType = (url: string): 'video' | 'image' => {
    const ext = getExt(url)
    if (ext === 'mp4') {
      return 'video'
    }
    if (ext === 'webp' || ext === 'png' || ext === 'jpg') return 'image'
    return 'image'
  }

  const hasCuts = Array.isArray(nCuts) && nCuts.length > 0
  const url = hasCuts && nCuts ? nCuts[0].ncutUrl : ''
  const mediaType = getType(url)

  const chunk3 = <T,>(arr: T[]) => {
    const out: T[][] = []
    for (let i = 0; i < arr.length; i += 3) out.push(arr.slice(i, i + 3))
    return out
  }
  const rows = useMemo(() => chunk3(nCuts.slice(1)), [nCuts]) // 1등제외 2등~10등

  const rowRefs = useRef<HTMLDivElement[]>([])
  const [visibleRow, setVisibleRow] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.index)
          if (e.isIntersecting) {
            setVisibleRow((prev) => ({ ...prev, [idx]: true }))
          }
        })
      },
      {
        root: null,
        threshold: 0.55,
      },
    )

    rowRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [rows.length])

  return (
    <S.Container>
      {hasCuts ? (
        <>
          <S.MainWrapper weekly={weekly}>
            <S.Left weekly={weekly}>
              {weekly ? (
                <div>
                  <S.TitleWrapper weekly={weekly}>
                    <S.SubTitle>가장 많이 머물렀던 순간이에요</S.SubTitle>
                    <S.Title>지난주의 순간</S.Title>
                  </S.TitleWrapper>
                  <S.MoveText
                    weekly={weekly}
                    onClick={() => navigate('/daily-moment')}
                  >
                    <IoIosArrowBack /> 어제의 가장 빛났던 순간도 놓치지 마세요
                  </S.MoveText>
                </div>
              ) : (
                <div>
                  <S.TitleWrapper weekly={weekly}>
                    <S.SubTitle>지난 일주일의 하이라이트</S.SubTitle>
                    <S.Title>어제의 순간</S.Title>
                  </S.TitleWrapper>
                  <S.MoveText
                    weekly={weekly}
                    onClick={() => navigate('/daily-moment?weekly')}
                  >
                    지난 주엔 어떤 순간들이 있었을까요?
                    <IoIosArrowForward />
                  </S.MoveText>
                </div>
              )}
            </S.Left>
            <S.FirstNCut
              className={orient}
              weekly={weekly}
              onClick={() => navigate(`/gallery/${nCuts[0].ncutUuid}`)}
            >
              {mediaType === 'video' ? (
                <T.Video
                  src={`https://yenanow.s3.ap-northeast-2.amazonaws.com/${url}`}
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onLoadedMetadata={handleVideoLoad}
                />
              ) : (
                <T.Image
                  ref={imgRef}
                  src={`https://yenanow.s3.ap-northeast-2.amazonaws.com/${url}`}
                  onLoad={handleImageLoad}
                />
              )}
              <T.Overlay>
                <T.LikeCount>
                  <T.LikeIcon>
                    <FaRegHeart />
                  </T.LikeIcon>
                  <T.LikeNumber>{nCuts[0].likeCount}</T.LikeNumber>
                </T.LikeCount>
              </T.Overlay>
            </S.FirstNCut>
          </S.MainWrapper>
          <S.SubWrapper>
            {rows.map((row, idx) => (
              <S.Row
                key={idx}
                data-index={idx}
                ref={(el) => {
                  if (el) rowRefs.current[idx] = el
                }}
                className={visibleRow[idx] ? 'in' : ''}
              >
                {row.map((cut) => (
                  <MomentCut key={cut.ncutUuid} nCut={cut} />
                ))}
              </S.Row>
            ))}
          </S.SubWrapper>
        </>
      ) : (
        <S.EmptyText>
          <p> 아직 등록된 N컷이 없습니다</p>
        </S.EmptyText>
      )}
    </S.Container>
  )
}

export default MomentLayout
