import React, { useEffect, useState } from 'react'
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
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : sharedUrls.length - 1,
    )
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev < sharedUrls.length - 1 ? prev + 1 : 0,
    )
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

        <S.SliderImageContainer>
          {sharedUrls.map((url, index) => {
            const selectionCount = getSelectionCount(url)

            return (
              <S.ThumbnailWrapper
                key={index}
                $isActive={index === currentImageIndex}
                onClick={() => setCurrentImageIndex(index)}
              >
                <S.ThumbnailImage src={url} alt={`thumbnail-${index}`} />
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
            <S.PreviewImage
              src={currentImageUrl}
              alt={`preview-${currentImageIndex}`}
            />
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
          {isCurrentImageSelected ? '선택 해제' : '이 이미지 선택'}
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
