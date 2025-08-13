import React, { useEffect, useState } from 'react'
import { nCutAPI } from '@/api/ncut'
import type { FrameCutResponse } from '@/types/ncut'
import * as S from '@styles/components/NCut/Edit/SelectFrameStyle'

interface SelectFrameProps {
  cutCount: number
  selectedUrls: string[]
  selectedFrame: string
  onSelectFrame: (frameId: string) => void
  isHost: boolean
}

const SelectFrame: React.FC<SelectFrameProps> = ({
  cutCount,
  selectedUrls,
  selectedFrame,
  onSelectFrame,
  isHost,
}) => {
  const [frames, setFrames] = useState<FrameCutResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await nCutAPI.getFrames(cutCount)
        setFrames(response)
      } catch {
        setError('프레임을 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchFrames()
  }, [cutCount])

  const combinedImage = (
    <S.FrameWrapper urlCount={selectedUrls.length}>
      {selectedUrls.map((url, idx) => (
        <>
          {url.endsWith('.png') ? (
            <S.ImageStrip key={idx} src={url} alt={`Selected Cut ${idx + 1}`} />
          ) : (
            <S.VideoStrip key={idx} src={url} autoPlay muted loop />
          )}
        </>
      ))}
    </S.FrameWrapper>
  )

  return (
    <S.FrameCutContainer>
      {/* 왼쪽: Combined Image (3fr) */}
      <S.FrameImageContainer>{combinedImage}</S.FrameImageContainer>

      {/* 오른쪽: Frame Selection (8fr) */}
      <S.FrameSelectionContainer
        style={{
          pointerEvents: isHost ? 'auto' : 'none',
          opacity: isHost ? 1 : 0.7,
        }}
      >
        <S.FrameSelectionHeader>
          <h3>프레임 선택</h3>
          <p>
            {isHost
              ? `${cutCount}컷용 프레임을 선택하세요`
              : '호스트가 프레임을 선택 중입니다...'}
          </p>
        </S.FrameSelectionHeader>

        {loading ? (
          <S.LoadingMessage>프레임을 불러오는 중...</S.LoadingMessage>
        ) : error ? (
          <S.ErrorMessage>{error}</S.ErrorMessage>
        ) : (
          <S.FrameGrid>
            {frames.map((frame, idx) => (
              <S.FrameImageBox
                key={frame.frameUuid || idx}
                onClick={() => isHost && onSelectFrame(frame.frameUuid)}
                isSelected={selectedFrame === frame.frameUuid}
                disabled={!isHost}
              >
                <S.FrameImage
                  src={frame.frameUrl}
                  alt={`Frame ${frame.frameUuid || idx + 1}`}
                  loading="lazy" // 성능 최적화
                />
                {!isHost && <S.DisabledOverlay>호스트 전용</S.DisabledOverlay>}
              </S.FrameImageBox>
            ))}
          </S.FrameGrid>
        )}
      </S.FrameSelectionContainer>
    </S.FrameCutContainer>
  )
}

export default SelectFrame
