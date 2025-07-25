import {
  ContentContainer,
  LandingContainer,
  Logo,
  PhotoCard1,
  PhotoCard2,
  PhotoCardsContainer,
  StartButton,
} from '@styles/Landing/LandingStyle'
import React from 'react'

import logoImage from '/header_logo.png'
import landingImage from '@assets/Landing/landing_photo.png'
import photo from '@assets/Landing/photo.svg'
import { LogoContainer } from '@styles/Header/HeaderStyle'
import { Link } from 'react-router-dom'

const Landing: React.FC = () => {
  return (
    <LandingContainer>
      <LogoContainer>
        <Logo>
          <img src={logoImage} alt="로고" />
        </Logo>
      </LogoContainer>
      <ContentContainer>
        <PhotoCardsContainer>
          <PhotoCard1>
            <img src={landingImage} alt="" />
          </PhotoCard1>
          <PhotoCard2>
            <img src={landingImage} alt="" />
          </PhotoCard2>
        </PhotoCardsContainer>
      </ContentContainer>
      <Link to="/login">
        <StartButton>
          시작하기
          <img src={photo} alt="" />
        </StartButton>
      </Link>
    </LandingContainer>
  )
}

export default Landing
