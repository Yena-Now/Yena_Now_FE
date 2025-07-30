import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '@components/Header/Header'
import GalleryList from '@components/Gallery/GalleryList'
import type { NCut } from '@/types/NCutList'
import { dummyNCutList } from './DummyNcutList'

const UserGallery: React.FC = () => {
  const navigate = useNavigate()
  const { userUuid } = useParams<{ userUuid: string }>()

  const filteredNCut = dummyNCutList.ncuts.filter(
    (item) => item.userUuid === userUuid, // 테스트용 필터링
  )

  const handleClick = (items: NCut) => {
    navigate(`/gallery/${items.ncut_uuid}`)
  }

  return (
    <>
      <Header />
      <GalleryList data={filteredNCut} onItemClick={handleClick} />
    </>
  )
}

export default UserGallery
