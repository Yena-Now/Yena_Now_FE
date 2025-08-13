import * as G from '@styles/components/NCut/Create/GlobalStyle'
import * as S from '@styles/components/NCut/Create/ThirdStyle'
import React from 'react'
import { IoTriangleOutline } from 'react-icons/io5'

interface FourthCreateStepProps {
  onFormDataChange: (data: { cutCount: number }) => void
}

function FourthCreateStep({ onFormDataChange }: FourthCreateStepProps) {
  const [cutCount, setCutCount] = React.useState(2)

  const handleIncrease = () => {
    if (cutCount === 1) {
      setCutCount(2)
      onFormDataChange({ cutCount: 2 })
    } else if (cutCount === 2) {
      setCutCount(4)
      onFormDataChange({ cutCount: 4 })
    } else if (cutCount === 4) {
      setCutCount(6)
      onFormDataChange({ cutCount: 6 })
    }
  }

  const handleDecrease = () => {
    // 1, 2, 4, 6만 허용
    if (cutCount === 6) {
      setCutCount(4)
      onFormDataChange({ cutCount: 4 })
    } else if (cutCount === 4) {
      setCutCount(2)
      onFormDataChange({ cutCount: 2 })
    } else if (cutCount === 2) {
      setCutCount(1)
      onFormDataChange({ cutCount: 1 })
    }
  }

  return (
    <G.NCutCreateContentContainer>
      <G.NcutCreateHeader>촬영 부스 생성</G.NcutCreateHeader>
      <G.NcutCreateDescription>컷 수를 지정해주세요.</G.NcutCreateDescription>
      <G.NcutCreateSubDescription>
        1, 2, 4, 6회 가능합니다.
      </G.NcutCreateSubDescription>
      <S.CounterContainer>
        <S.CounterButton onClick={handleDecrease} disabled={cutCount === 1}>
          <IoTriangleOutline
            size={24}
            style={{ transform: 'rotate(180deg)' }}
          />
        </S.CounterButton>
        <S.CounterDisplay>{cutCount}</S.CounterDisplay>
        <S.CounterButton onClick={handleIncrease} disabled={cutCount === 6}>
          <IoTriangleOutline size={24} />
        </S.CounterButton>
      </S.CounterContainer>
    </G.NCutCreateContentContainer>
  )
}

export default FourthCreateStep
