import React from 'react'
import * as S from '@styles/components/NCut/LoadingScreenStyle'

interface LoadingScreenProps {
  connectionStatus: string
  isBackgroundProcessing: boolean
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  connectionStatus,
  isBackgroundProcessing,
}) => {
  return (
    <S.LoadingScreenContainer>
      <div>세션에 연결 중...</div>
      <S.ConnectionStatus>{connectionStatus}</S.ConnectionStatus>
      {isBackgroundProcessing && (
        <S.BackgroundProcessingStatus>
          배경 제거 처리 중...
        </S.BackgroundProcessingStatus>
      )}
    </S.LoadingScreenContainer>
  )
}
