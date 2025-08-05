import React from 'react'
import * as S from '@styles/components/NCut/SessionPromptStyle'

interface SessionPromptProps {
  onStart: () => void
}

export const SessionPrompt: React.FC<SessionPromptProps> = ({ onStart }) => {
  return (
    <S.SessionPromptContainer>
      <S.SessionPromptTitle>세션 시작 준비</S.SessionPromptTitle>
      <S.SessionPromptDescription>
        배경 제거 기능을 사용하기 위해 브라우저 권한이 필요합니다.
        <br />
        아래 버튼을 클릭하여 세션을 시작해주세요.
      </S.SessionPromptDescription>
      <S.SessionPromptButton onClick={onStart}>
        세션 시작하기
      </S.SessionPromptButton>
    </S.SessionPromptContainer>
  )
}
