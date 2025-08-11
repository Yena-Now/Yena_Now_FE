import React, { useState } from 'react'
import * as S from '@styles/components/GalleryDetail/VisibilityEditContentStyle'

type VisibilityType = 'PUBLIC' | 'FOLLOW' | 'PRIVATE'

interface VisibilityEditContentProps {
  currentValue: VisibilityType
  onChange: (newValue: VisibilityType) => void
}

const VisibilityEditContent: React.FC<VisibilityEditContentProps> = ({
  currentValue,
  onChange,
}) => {
  const [selected, setSelected] = useState<VisibilityType>(currentValue)

  const handleChange = (value: VisibilityType) => {
    setSelected(value)
  }

  return (
    <S.Container>
      <S.RadioGroup>
        <label>
          <input
            type="radio"
            value="PUBLIC"
            checked={selected === 'PUBLIC'}
            onChange={() => handleChange('PUBLIC')}
          />
          전체 공개
        </label>
        <label>
          <input
            type="radio"
            value="FOLLOW"
            checked={selected === 'FOLLOW'}
            onChange={() => handleChange('FOLLOW')}
          />
          팔로워 공개
        </label>
        <label>
          <input
            type="radio"
            value="PRIVATE"
            checked={selected === 'PRIVATE'}
            onChange={() => handleChange('PRIVATE')}
          />
          나만 보기
        </label>
      </S.RadioGroup>

      <S.Button onClick={() => onChange(selected)}>완료</S.Button>
    </S.Container>
  )
}

export default VisibilityEditContent
