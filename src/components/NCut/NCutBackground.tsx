import type React from 'react'
import * as S from '@styles/components/NCut/BackgroundStyle'

interface NCutBackgroundProps {
  backgroundImageUrls: string[]
  onBackgroundChange: (url: string) => void
}

const NCutBackground: React.FC<NCutBackgroundProps> = ({
  backgroundImageUrls,
  onBackgroundChange,
}) => {
  const handleBackgroundChange = (url: string) => {
    onBackgroundChange(url)
  }

  return (
    <S.BackgroundImageWrapper>
      {backgroundImageUrls.map((url, idx) => (
        <S.BackgroundImage
          key={idx}
          src={url}
          alt="Background"
          onClick={() => handleBackgroundChange(url)}
          style={{
            cursor: 'pointer',
          }}
        />
      ))}
    </S.BackgroundImageWrapper>
  )
}

export default NCutBackground
