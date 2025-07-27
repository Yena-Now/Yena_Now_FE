import React from 'react'

import logoImage from '/header_logo.png'
import * as S from '@styles/components/Common/LogoStyle'

interface LogoProps {
  marginTop?: string
}

const Logo: React.FC<LogoProps> = ({ marginTop }) => {
  return (
    <S.LogoWrapper marginTop={marginTop ?? undefined}>
      <S.LogoImage src={logoImage} alt="로고" />
    </S.LogoWrapper>
  )
}

export default Logo
