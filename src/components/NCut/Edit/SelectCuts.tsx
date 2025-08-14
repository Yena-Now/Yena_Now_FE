import React, { useEffect, useRef, useState } from 'react'
import * as S from '@styles/components/NCut/Edit/SelectCutsStyle'

interface SelectCutsProps {
  sharedUrls: string[]
  selectedUrls: string[]
  onSelectCut: (url: string) => void
  cutCount: number
  allUsersSelections?: { [userId: string]: string[] }
  isHost: boolean
}

const SelectCuts: React.FC<SelectCutsProps> = ({
  sharedUrls,
  selectedUrls,
  onSelectCut,
  cutCount,
  allUsersSelections = {},
  isHost,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleHostSelection = (event: CustomEvent) => {
      const { selectedUrls: hostSelectedUrls } = event.detail
      if (hostSelectedUrls && !isHost) {
        const hostSelectedIndex = sharedUrls.indexOf(hostSelectedUrls[0])
        if (hostSelectedIndex !== -1) {
          setCurrentImageIndex(hostSelectedIndex)
        }
      }
    }

    const handleNavigateToNextPage = (event: CustomEvent) => {
      const { selectedUrls: hostSelectedUrls } = event.detail
      if (hostSelectedUrls && !isHost) {
        const hostSelectedIndex = sharedUrls.indexOf(hostSelectedUrls[0])
        if (hostSelectedIndex !== -1) {
          setCurrentImageIndex(hostSelectedIndex)
        }
      }
    }

    window.addEventListener(
      'hostSelection',
      handleHostSelection as EventListener,
    )
    window.addEventListener(
      'navigateToNextPage',
      handleNavigateToNextPage as EventListener,
    )
    return () => {
      window.removeEventListener(
        'hostSelection',
        handleHostSelection as EventListener,
      )
      window.removeEventListener(
        'navigateToNextPage',
        handleNavigateToNextPage as EventListener,
      )
    }
  }, [isHost, sharedUrls])

  const getSelectionCount = (url: string) => {
    return Object.values(allUsersSelections).filter((urls) =>
      urls.includes(url),
    ).length
  }

  const totalParticipants = Object.keys(allUsersSelections).length

  const currentImageUrl = sharedUrls[currentImageIndex]
  const isCurrentImageSelected =
    currentImageUrl && selectedUrls.includes(currentImageUrl)

  const handlePrevious = () => {
    const prevIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : sharedUrls.length - 1
    setCurrentImageIndex(prevIndex)

    if (containerRef.current) {
      const thumbnailElement = containerRef.current.children[0] as HTMLElement
      const thumbnailWidth = thumbnailElement.offsetWidth
      containerRef.current.scrollLeft = prevIndex * thumbnailWidth
    }
  }

  const handleNext = () => {
    const nextIndex =
      currentImageIndex < sharedUrls.length - 1 ? currentImageIndex + 1 : 0
    setCurrentImageIndex(nextIndex)

    if (containerRef.current) {
      const thumbnailElement = containerRef.current.children[0] as HTMLElement
      const thumbnailWidth = thumbnailElement.offsetWidth
      containerRef.current.scrollLeft = nextIndex * thumbnailWidth
    }
  }

  const handleSelectCurrent = () => {
    if (currentImageUrl) {
      onSelectCut(currentImageUrl)

      const newSelection = selectedUrls.includes(currentImageUrl)
        ? selectedUrls.filter((url) => url !== currentImageUrl)
        : [...selectedUrls, currentImageUrl]

      // 선택 상태 변경을 다른 컴포넌트에 알림
      window.dispatchEvent(
        new CustomEvent('hostSelection', {
          detail: {
            selectedUrl: newSelection,
          },
        }),
      )
    }
  }

  if (!sharedUrls || sharedUrls.length === 0) {
    return (
      <S.NoImagesContainer>
        <h2>선택할 이미지가 없습니다</h2>
        <p>세션에서 촬영한 이미지가 없습니다.</p>
      </S.NoImagesContainer>
    )
  }

  return (
    <S.SelectCutsContainer>
      <S.ImageCounter>
        이미지 {currentImageIndex + 1} / {sharedUrls.length}
      </S.ImageCounter>
      <S.SliderContainer>
        <S.SliderButton onClick={handlePrevious}>←</S.SliderButton>

        <S.SliderImageContainer ref={containerRef}>
          {sharedUrls.map((url, index) => {
            const selectionCount = getSelectionCount(url)

            return (
              <S.ThumbnailWrapper
                key={index}
                $isActive={index === currentImageIndex}
                onClick={() => setCurrentImageIndex(index)}
              >
                {url.endsWith('.png') ? (
                  <S.ThumbnailImage src={url} alt={`thumbnail-${index}`} />
                ) : (
                  <S.ThumbnailVideo src={url} autoPlay muted loop />
                )}
                {selectionCount > 0 && totalParticipants > 1 && (
                  <S.SelectionBadge>{selectionCount}</S.SelectionBadge>
                )}
              </S.ThumbnailWrapper>
            )
          })}
        </S.SliderImageContainer>

        <S.SliderButton onClick={handleNext}>→</S.SliderButton>
      </S.SliderContainer>
      {currentImageUrl && (
        <S.PreviewContainer>
          <S.PreviewImageWrapper $isSelected={!!isCurrentImageSelected}>
            {currentImageUrl.endsWith('.png') ? (
              <S.PreviewImage
                src={currentImageUrl}
                alt={`preview-${currentImageIndex}`}
              />
            ) : (
              <S.PreviewVideo src={currentImageUrl} autoPlay muted loop />
            )}
            {isCurrentImageSelected && (
              <S.SelectedLabel>선택됨</S.SelectedLabel>
            )}
          </S.PreviewImageWrapper>
          <S.CurrentSelectionCount>
            {selectedUrls.length} / {cutCount}
          </S.CurrentSelectionCount>
        </S.PreviewContainer>
      )}

      <S.ButtonContainer>
        <S.SelectButton
          onClick={handleSelectCurrent}
          $isSelected={!!isCurrentImageSelected}
          $disabled={
            (!isCurrentImageSelected && selectedUrls.length >= cutCount) ||
            !isHost
          }
          disabled={
            (!isCurrentImageSelected && selectedUrls.length >= cutCount) ||
            !isHost
          }
        >
          {isHost
            ? isCurrentImageSelected
              ? '선택 해제'
              : '이 이미지 선택'
            : '호스트만 선택 가능'}
        </S.SelectButton>

        {!isCurrentImageSelected && selectedUrls.length >= cutCount && (
          <S.LimitMessage>
            최대 {cutCount}개까지만 선택할 수 있습니다
          </S.LimitMessage>
        )}
      </S.ButtonContainer>
    </S.SelectCutsContainer>
  )
}

export default SelectCuts
