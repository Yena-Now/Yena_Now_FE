import React, { useEffect, useState } from 'react'
import { nCutAPI } from '@/api/ncut'
import type { FrameCutResponse } from '@/types/ncut'
import * as S from '@styles/components/NCut/Edit/SelectFrameStyle'

interface SelectFrameProps {
  cutCount: number
  selectedUrls: string[]
  selectedFrame: string
  onSelectFrame: (frameId: string) => void
}

const SelectFrame: React.FC<SelectFrameProps> = ({
  cutCount,
  selectedUrls,
  selectedFrame,
  onSelectFrame,
}) => {
  const [frames, setFrames] = useState<FrameCutResponse[]>([])

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const response = await nCutAPI.getFrames(cutCount)
        setFrames(response)
      } catch (error) {
        console.error('프레임을 불러오는 중 오류 발생:', error)
      }
    }

    fetchFrames().then(() => {})
  }, [cutCount])

  const combinedImage = (
    <S.FrameWrapper urlCount={selectedUrls.length}>
      {selectedUrls.map((url, idx) => (
        <S.ImageStrip key={idx} src={url} alt="Selected Cut" />
      ))}
    </S.FrameWrapper>
  )

  return (
    <S.FrameCutContainer>
      <S.FrameImageContainer>{combinedImage}</S.FrameImageContainer>

      <S.FrameSelectionContainer>
        {frames.map((frame, idx) => (
          <S.FrameImageBox
            key={idx}
            onClick={() => onSelectFrame(frame.frameUuid)}
            isSelected={selectedFrame === frame.frameUuid}
          >
            <S.FrameImage
              src={frame.frameUrl}
              alt={`Frame ${frame.frameUuid}`}
            />
          </S.FrameImageBox>
        ))}
      </S.FrameSelectionContainer>
    </S.FrameCutContainer>
  )
}

export default SelectFrame
