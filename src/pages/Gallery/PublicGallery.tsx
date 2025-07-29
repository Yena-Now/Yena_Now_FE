import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@components/Header/Header'
import GalleryCard from '@components/Common/GalleryCard'
import type { NCut, NCutList } from '@/types/NCutList'
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
      <S.GalleryList>
        {dummyNCutList.ncuts.map((item) => (
          <GalleryCard
            key={item.ncut_uuid}
            {...item}
            onclick={() => handleClick(item)}
          />
        ))}
      </S.GalleryList>
    </>
  )
}

export default PublicGallery
