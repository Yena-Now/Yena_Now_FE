import React, { useState } from 'react'
import * as S from '@styles/components/GalleryDetail/VisibilityEditContentStyle'

type VisibilityType = 'Public' | 'Follow' | 'Private'

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
            value="Public"
            checked={selected === 'Public'}
            onChange={() => handleChange('Public')}
          />
          전체 공개
        </label>
        <label>
          <input
            type="radio"
            value="Follow"
            checked={selected === 'Follow'}
            onChange={() => handleChange('Follow')}
          />
          팔로워 공개
        </label>
        <label>
          <input
            type="radio"
            value="Private"
            checked={selected === 'Private'}
            onChange={() => handleChange('Private')}
          />
          나만 보기
        </label>
      </S.RadioGroup>

      <S.Button onClick={() => onChange(selected)}>완료</S.Button>
    </S.Container>
  )
}

export default VisibilityEditContent
