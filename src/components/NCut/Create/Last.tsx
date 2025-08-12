import * as G from '@styles/components/NCut/Create/GlobalStyle'
import * as S from '@styles/components/NCut/Create/LastStyle'
import { FaRegCopy } from 'react-icons/fa6'

interface LastStepProps {
  sessionId: string
  onJoinSession: () => void
}

function LastStep({ sessionId, onJoinSession }: LastStepProps) {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(sessionId)
      .then(() => {
        alert('촬영 코드가 클립보드에 복사되었습니다.')
      })
      .catch(() => {
        alert('촬영 코드 복사에 실패했습니다.')
      })
  }

  const formatSessionId = (id: string) => {
    return id
      .split('')
      .map((digit, index) => <S.CodeDigit key={index}>{digit}</S.CodeDigit>)
  }

  if (!sessionId) {
    return (
      <G.NCutCreateContentContainer>
        <G.NcutCreateHeader>세션 생성 중...</G.NcutCreateHeader>
        <G.NcutCreateDescription>잠시만 기다려주세요.</G.NcutCreateDescription>
      </G.NCutCreateContentContainer>
    )
  }

  return (
    <G.NCutCreateContentContainer>
      <G.NcutCreateHeader>촬영 코드</G.NcutCreateHeader>
      <G.NcutCreateDescription>
        코드가 발급되었습니다.
        <br />
        친구를 초대하시려면 번호를 클릭하세요
      </G.NcutCreateDescription>
      <S.LastStepContainer>
        <S.CodeContainer>
          <S.CodeDigitContainer onClick={handleCopy}>
            {formatSessionId(sessionId)}
          </S.CodeDigitContainer>
          <S.CopyIcon onClick={handleCopy}>
            <FaRegCopy size={20} />
          </S.CopyIcon>
        </S.CodeContainer>
      </S.LastStepContainer>
      <S.ConnectToSessionButton onClick={onJoinSession}>
        입장하기
      </S.ConnectToSessionButton>
    </G.NCutCreateContentContainer>
  )
}

export default LastStep
