import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@components/Header/Header'
import GalleryList from '@components/Gallery/GalleryList'
import type { NCut } from '@/types/NCutList'
import { dummyNCutList } from './DummyNcutList'

const MyGallery: React.FC = () => {
  const navigate = useNavigate()

  const myUserUuid = 'userA' // 더미 테스트용

  const myCuts = dummyNCutList.ncuts.filter(
    (item) => item.userUuid === myUserUuid,
  )

  const handleClick = (items: NCut) => {
    navigate(`/gallery/${items.ncut_uuid}`)
  }

  return (
    <>
      <Header />
      <GalleryList data={myCuts} onItemClick={handleClick} />
    </>
  )
}

export default MyGallery
