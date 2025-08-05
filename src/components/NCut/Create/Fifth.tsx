import * as G from '@styles/components/NCut/Create/GlobalStyle'
import * as S from '@styles/components/NCut/Create/FifthStyle'
import React from 'react'

interface FifthCreateStepProps {
  onFormDataChange: (data: { timeLimit: number }) => void
}

function FifthCreateStep({ onFormDataChange }: FifthCreateStepProps) {
  const [timeLimit, setTimeLimit] = React.useState(10)
  const handleTimeChange = (newTime: number) => {
    const validTime = Math.max(10, Math.min(30, newTime))
    setTimeLimit(validTime)
    onFormDataChange({ timeLimit: validTime })
  }

  return (
    <G.NCutCreateContentContainer>
      <G.NcutCreateHeader>촬영 부스 생성</G.NcutCreateHeader>
      <G.NcutCreateDescription>
        촬영 시간을 설정해주세요.
      </G.NcutCreateDescription>
      <G.NcutCreateSubDescription>
        최소 10초 ~ 최대 30초
      </G.NcutCreateSubDescription>
      <S.TimeDisplayContainer>
        <S.TimeInputContainer>
          <S.TimeInput
            type="number"
            value={timeLimit}
            onChange={(e) => handleTimeChange(Number(e.target.value))}
            min="10"
            max="30"
          />
          <S.TimeUnit>초</S.TimeUnit>
        </S.TimeInputContainer>
      </S.TimeDisplayContainer>
    </G.NCutCreateContentContainer>
  )
}

export default FifthCreateStep
