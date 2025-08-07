import * as G from '@styles/components/NCut/Create/GlobalStyle'
import * as S from '@styles/components/NCut/Create/ThirdStyle'
import React from 'react'
import { IoTriangleOutline } from 'react-icons/io5'

interface FourthCreateStepProps {
  onFormDataChange: (data: { cutCnt: number }) => void
}

function FourthCreateStep({ onFormDataChange }: FourthCreateStepProps) {
  const [cutCnt, setCutCnt] = React.useState(2)

  const handleIncrease = () => {
    if (cutCnt < 4) {
      const newCount = cutCnt + 1
      setCutCnt(newCount)
      onFormDataChange({ cutCnt: newCount })
    }
  }

  const handleDecrease = () => {
    if (cutCnt > 2) {
      const newCount = cutCnt - 1
      setCutCnt(newCount)
      onFormDataChange({ cutCnt: newCount })
    }
  }

  return (
    <G.NCutCreateContentContainer>
      <G.NcutCreateHeader>촬영 부스 생성</G.NcutCreateHeader>
      <G.NcutCreateDescription>컷 수를 지정해주세요.</G.NcutCreateDescription>
      <G.NcutCreateSubDescription>
        최소 2회 ~ 최대 4회까지 가능합니다.
      </G.NcutCreateSubDescription>
      <S.CounterContainer>
        <S.CounterButton onClick={handleDecrease} disabled={cutCnt === 2}>
          <IoTriangleOutline
            size={24}
            style={{ transform: 'rotate(180deg)' }}
          />
        </S.CounterButton>
        <S.CounterDisplay>{cutCnt}</S.CounterDisplay>
        <S.CounterButton onClick={handleIncrease} disabled={cutCnt === 4}>
          <IoTriangleOutline size={24} />
        </S.CounterButton>
      </S.CounterContainer>
    </G.NCutCreateContentContainer>
  )
}

export default FourthCreateStep
