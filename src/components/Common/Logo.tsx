import React from 'react'

import logoImage from '/header_logo.png'
import * as S from '@styles/components/Common/LogoStyle'
import { Link } from 'react-router-dom'

interface LogoProps {
  marginTop?: string
}

const Logo: React.FC<LogoProps> = ({ marginTop }) => {
  return (
    <S.LogoWrapper marginTop={marginTop ?? undefined}>
      <Link to="/">
        <S.LogoImage src={logoImage} alt="로고" />
      </Link>
    </S.LogoWrapper>
  )
}

export default Logo
