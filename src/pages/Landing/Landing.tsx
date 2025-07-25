import * as S from '@styles/pages/Landing/LandingStyle'
import React from 'react'

import landingImage from '@assets/Landing/landing_photo.png'
import photo from '@assets/Landing/photo.svg'
import { Link } from 'react-router-dom'
import Logo from '@components/Common/Logo'

const Landing: React.FC = () => {
  return (
    <S.LandingContainer>
      <Logo marginTop="20px" />
      <S.ContentContainer>
        <S.PhotoCardsContainer>
          <S.PhotoCard1>
            <img src={landingImage} alt="" />
          </S.PhotoCard1>
          <S.PhotoCard2>
            <img src={landingImage} alt="" />
          </S.PhotoCard2>
        </S.PhotoCardsContainer>
      </S.ContentContainer>
      <Link to="/login">
        <S.StartButton>
          시작하기
          <img src={photo} alt="" />
        </S.StartButton>
      </Link>
    </S.LandingContainer>
  )
}

export default Landing
