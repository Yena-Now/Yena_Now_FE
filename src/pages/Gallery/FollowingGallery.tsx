import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@components/Header/Header'
import type { NCut } from '@/types/NCutList'
import GalleryList from '@components/Gallery/GalleryList'
import * as S from '@styles/pages/Gallery/FollowingGalleryStyle'
import { dummyNCutList } from './DummyNcutList'

const FollowingGallery: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = (items: NCut) => {
    navigate(`/gallery/${items.ncut_uuid}`)
  }

  const goToPublicGallery = () => {
    navigate('/gallery/public')
  }

  return (
    <>
      <Header />
      <S.TitleWrapper>
        <S.PublicText onClick={goToPublicGallery}>공개 갤러리</S.PublicText>
        <S.Text>친구 갤러리</S.Text>
      </S.TitleWrapper>
      <S.Divider />
      <GalleryList data={dummyNCutList.ncuts} onItemClick={handleClick} />
    </>
  )
}

export default FollowingGallery
