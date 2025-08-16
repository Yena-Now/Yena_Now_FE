import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GalleryTabMenu from '@components/Gallery/GalleryTabMenu'
import GalleryList from '@components/Gallery/GalleryList'
import type { NCut } from '@/types/NCutList'
import { galleryAPI } from '@/api/gallerylist'
import { useToast } from '@/hooks/useToast'
import * as S from '@/styles/components/Common/LoadingStyle'
import styled from 'styled-components'

type TabType = 'PUBLIC' | 'FOLLOW'

const PageContainer = styled.div`
  min-height: 100vh;
  background: var(--color-surface-2);
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-16);
  text-align: center;
  color: var(--color-text-muted);

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: var(--spacing-4);
    opacity: 0.5;
  }

  p {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-2);
  }

  span {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
  }
`

const GalleryPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('PUBLIC')
  const [items, setItems] = useState<NCut[]>([])
  const [loading, setLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const { error } = useToast()
  const navigate = useNavigate()

  const handleClick = (item: NCut) => {
    navigate(`/gallery/${item.ncutUuid}`)
  }

  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab)
    setItems([])
    setPageNumber(0)
    setHasMore(true)
  }

  useEffect(() => {
    let cancelled = false
    const fetchList = async () => {
      try {
        setLoading(true)
        const data =
          currentTab === 'PUBLIC'
            ? await galleryAPI.getPublicGalleryList(0)
            : await galleryAPI.getFollowGalleryList(0)
        if (!cancelled) setItems(data.ncuts)
        setPageNumber(1)
        setHasMore(data.ncuts.length > 0)
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

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const data =
        currentTab === 'PUBLIC'
          ? await galleryAPI.getPublicGalleryList(pageNumber)
          : await galleryAPI.getFollowGalleryList(pageNumber)
      setItems((prev) => [...prev, ...data.ncuts])
      setPageNumber((prev) => prev + 1)
      setHasMore(data.ncuts.length > 0)
    } catch {
      error('더 불러오기에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, currentTab, pageNumber, error])

  useEffect(() => {
    if (!observerRef.current) return
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 1 },
    )
    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [observerRef, hasMore, loading, loadMore])

  return (
    <PageContainer>
      <main>
        <GalleryTabMenu currentTab={currentTab} onClickTab={handleTabChange} />

        {loading ? (
          <S.LoaderWrapper>
            <S.Spinner />
            <S.LoadingText>로딩 중입니다...</S.LoadingText>
          </S.LoaderWrapper>
        ) : items.length === 0 ? (
          <EmptyState>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
            <p>표시할 갤러리가 없습니다</p>
            <span>새로운 콘텐츠를 확인해보세요</span>
          </EmptyState>
        ) : (
          <>
            <GalleryList data={items} onItemClick={handleClick} />
            <div ref={observerRef} style={{ height: 32 }} />
            {loading && (
              <S.LoaderWrapper>
                <S.Spinner />
                <S.LoadingText>더 불러오는 중...</S.LoadingText>
              </S.LoaderWrapper>
            )}
          </>
        )}
      </main>
    </PageContainer>
  )
}

export default GalleryPage
