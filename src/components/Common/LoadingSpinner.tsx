import React from 'react'
import * as S from '@styles/pages/Gallery/LoadingSpinnerStyle'

const LoadingSpinner: React.FC = () => {
  return (
    <S.Overlay>
      <S.Spinner />
    </S.Overlay>
  )
}

export default LoadingSpinner
