import * as S from '@styles/pages/Landing/LandingStyle'
import React from 'react'

import landingImage from '@assets/Landing/landing_photo.png'
import photo from '@assets/Landing/photo.svg'
import { Link } from 'react-router-dom'
import Logo from '@components/Common/Logo'

const Landing: React.FC = () => {
  return (
    <S.LandingContainer>
      <header>
        <Logo marginTop="20px" />
      </header>

      <main>
        <S.ContentContainer>
          <S.PhotoCardsContainer>
            <S.PhotoCard1>
              <img src={landingImage} alt="N컷 사진 예시 1" />
            </S.PhotoCard1>
            <S.PhotoCard2>
              <img src={landingImage} alt="N컷 사진 예시 2" />
            </S.PhotoCard2>
          </S.PhotoCardsContainer>
        </S.ContentContainer>
      </main>

      <footer>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <S.StartButton>
            시작하기
            <img src={photo} alt="" aria-hidden="true" />
          </S.StartButton>
        </Link>
      </footer>
    </S.LandingContainer>
  )
}

export default Landing
