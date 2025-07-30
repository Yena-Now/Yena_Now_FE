import * as G from '@styles/components/NCut/Create/GlobalStyle'
import * as S from '@styles/components/NCut/Create/ThirdStyle'
import React from 'react'
import { IoTriangleOutline } from 'react-icons/io5'

interface ThirdCreateStepProps {
  onFormDataChange: (data: { takeCnt: number }) => void
}

function ThirdCreateStep({ onFormDataChange }: ThirdCreateStepProps) {
  const [takeCnt, setTakeCnt] = React.useState(6)

  const handleIncrease = () => {
    if (takeCnt < 10) {
      const newCount = takeCnt + 1
      setTakeCnt(newCount)
      onFormDataChange({ takeCnt: newCount })
    }
  }

  const handleDecrease = () => {
    if (takeCnt > 6) {
      const newCount = takeCnt - 1
      setTakeCnt(newCount)
      onFormDataChange({ takeCnt: newCount })
    }
  }

  return (
    <G.NCutCreateContentContainer>
      <G.NcutCreateHeader>촬영 부스 생성</G.NcutCreateHeader>
      <G.NcutCreateDescription>
        촬영 횟수를 지정해주세요.
      </G.NcutCreateDescription>
      <G.NcutCreateSubDescription>
        최소 6회 ~ 최대 10회까지 가능합니다.
      </G.NcutCreateSubDescription>
      <S.CounterContainer>
        <S.CounterButton onClick={handleDecrease} disabled={takeCnt === 6}>
          <IoTriangleOutline
            size={24}
            style={{ transform: 'rotate(180deg)' }}
          />
        </S.CounterButton>
        <S.CounterDisplay>{takeCnt}</S.CounterDisplay>
        <S.CounterButton onClick={handleIncrease} disabled={takeCnt === 10}>
          <IoTriangleOutline size={24} />
        </S.CounterButton>
      </S.CounterContainer>
    </G.NCutCreateContentContainer>
  )
}

export default ThirdCreateStep
