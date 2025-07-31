import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@components/Header/Header'
import GalleryTabMenu from '@components/Gallery/GalleryTabMenu'
import GalleryList from '@components/Gallery/GalleryList'
import type { NCut } from '@/types/NCutList'
import { dummyNCutList } from './DummyNcutList'

type TabType = 'public' | 'following'

const GalleryPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('public')
  const navigate = useNavigate()

  const handleClick = (item: NCut) => {
    navigate(`/gallery/${item.ncut_uuid}`)
  }

  return (
    <>
      <Header />
      <GalleryTabMenu currentTab={currentTab} onClickTab={setCurrentTab} />
      <GalleryList data={dummyNCutList.ncuts} onItemClick={handleClick} />
    </>
  )
}

export default GalleryPage
