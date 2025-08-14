import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GalleryTabMenu from '@components/Gallery/GalleryTabMenu'
import GalleryList from '@components/Gallery/GalleryList'
import type { NCut } from '@/types/NCutList'
import { galleryAPI } from '@/api/gallerylist'
import { useToast } from '@/hooks/useToast'
import * as S from '@/styles/components/Common/LoadingStyle'
import { Empty } from '@styles/components/Gallery/GalleryStyle'

type TabType = 'PUBLIC' | 'FOLLOW'

const GalleryPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('PUBLIC')
  const [items, setItems] = useState<NCut[]>([])
  const [loading, setLoading] = useState(false)
  const { error } = useToast()
  const navigate = useNavigate()

  const handleClick = (item: NCut) => {
    navigate(`/gallery/${item.ncutUuid}`)
  }

  useEffect(() => {
    let cancelled = false
    const fetchList = async () => {
      try {
        setLoading(true)
        const data =
          currentTab === 'PUBLIC'
            ? await galleryAPI.getPublicGalleryList()
            : await galleryAPI.getFollowGalleryList()
        if (!cancelled) setItems(data.ncuts)
      } catch {
        if (!cancelled) {
          setItems([])
          error('갤러리 목록을 불러오지 못했습니다.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchList()
    return () => {
      cancelled = true
    }
  }, [currentTab, error])

  return (
    <>
      <GalleryTabMenu currentTab={currentTab} onClickTab={setCurrentTab} />

      {loading ? (
        <S.LoaderWrapper>
          <S.Spinner />
          <S.LoadingText>로딩 중입니다...</S.LoadingText>
        </S.LoaderWrapper>
      ) : items.length === 0 ? (
        <Empty>표시할 갤러리가 없습니다.</Empty>
      ) : (
        <GalleryList data={items} onItemClick={handleClick} />
      )}
    </>
  )
}

export default GalleryPage
