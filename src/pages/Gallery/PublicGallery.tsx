import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@components/Header/Header'
import GalleryList from '@components/Gallery/GalleryList'
import type { NCut } from '@/types/NCutList'
import { dummyNCutList } from './DummyNcutList'
import * as S from '@styles/pages/Gallery/PublicGalleryStyles'

const PublicGallery: React.FC<NCut> = () => {
  const navigate = useNavigate()

  const handleClick = (items: NCut) => {
    navigate(`/gallery/${items.ncut_uuid}`)
  }

  const goToFollowingGallery = () => {
    navigate('/gallery/followings')
  }

  return (
    <>
      <Header />
      <S.TitleWrapper>
        <S.text>공개 갤러리</S.text>
        <S.FriendText onClick={goToFollowingGallery}>친구 갤러리</S.FriendText>
      </S.TitleWrapper>
      <S.Divider />
      <GalleryList data={dummyNCutList.ncuts} onItemClick={handleClick} />
    </>
  )
}

export default PublicGallery
