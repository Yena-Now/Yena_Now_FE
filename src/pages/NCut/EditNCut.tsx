import React, { useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useToast } from '@hooks/useToast'

import SelectCuts from '@components/NCut/Edit/SelectCuts'
import SelectFrame from '@components/NCut/Edit/SelectFrame'
import DecorateNCut from '@components/NCut/Edit/DecorateNCut'
import Saving from '@components/NCut/Edit/Saving'

import * as S from '@styles/pages/NCut/EditNCutStyle'
import { useRoom } from '@hooks/useRoom'
import { nCutAPI } from '@/api/ncut'
import MakingThumbnail from '@components/NCut/Edit/MakingThumbnail'

type LocationState = {
  sharedUrls: string[]
  cutCount: number
  roomCode: string
}

type FormData = {
  roomCode: string
  frameUuid: string
  contentUrls: { contentUrl: string | null; order: number }[]
}

type SaveFormData = {
  ncutUrl: string
  thumbnailUrl: string
  content: string
  visibility: 'PUBLIC' | 'PRIVATE' | 'FOLLOW'
  isRelay: boolean
}

const EditNCut: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { error } = useToast()
  const { allUsersSelections, broadcastSelection, leaveRoom } = useRoom()

  let sharedUrls: string[], cutCount: number, roomCode: string

  if (location.state) {
    ;({ sharedUrls, cutCount, roomCode } = location.state as LocationState)
  } else {
    const storedData = sessionStorage.getItem('editData')
    if (storedData) {
      ;({ sharedUrls, cutCount, roomCode } = JSON.parse(storedData))
      sessionStorage.removeItem('editData')
    } else {
      sharedUrls = []
      cutCount = 0
      roomCode = ''
    }
  }

  const [selectedUrls, setSelectedUrls] = useState<string[]>([])
  const [selectedFrame, setSelectedFrame] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    roomCode: roomCode || '',
    frameUuid: '',
    contentUrls: Array.from({ length: cutCount }, (_, index) => ({
      contentUrl: null,
      order: index + 1,
    })),
  })
  const [mergedUrl, setMergedUrl] = useState<string>('')
  const [decoratedImageUrl, setDecoratedImageUrl] = useState<string>('')
  const [saveData, setSaveData] = useState<SaveFormData>({
    ncutUrl: '',
    thumbnailUrl: '',
    content: '',
    visibility: 'PUBLIC',
    isRelay: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSelectCut = (url: string) => {
    setSelectedUrls((prev) => {
      let newSelection: string[]
      if (prev.includes(url)) {
        newSelection = prev.filter((u) => u !== url)
      } else if (prev.length < cutCount) {
        newSelection = [...prev, url]
      } else {
        error('최대 컷 수를 초과할 수 없습니다.')
        return prev
      }

      broadcastSelection(newSelection)
      return newSelection
    })
  }

  const handleSelectFrame = (frameId: string) => {
    setSelectedFrame(frameId)
    setFormData((prev) => ({
      ...prev,
      frameUuid: frameId,
    }))
  }

  const handleDecoratedImageReady = useCallback((imageUrl: string) => {
    setDecoratedImageUrl(imageUrl)
    // 꾸민 이미지를 mergedUrl로 설정하거나 별도로 처리
    setMergedUrl(imageUrl)
  }, [])

  const handleSavingSubmit = useCallback(
    (content: string, visibility: 'PUBLIC' | 'PRIVATE' | 'FOLLOW') => {
      setSaveData((prev) => ({
        ...prev,
        content,
        visibility,
        ncutUrl: decoratedImageUrl,
        thumbnailUrl: decoratedImageUrl,
      }))
    },
    [decoratedImageUrl],
  )

  if (!sharedUrls || !cutCount) {
    return (
      <div>
        <h2>세션 정보가 없습니다.</h2>
        <p>세션을 다시 시작해주세요.</p>
      </div>
    )
  }

  const handleNext = () => {
    if (currentPage === 0 && selectedUrls.length != cutCount) {
      error(`컷을 ${cutCount}개 선택해주세요.`)
      return
    }
    if (currentPage === 1 && !selectedFrame) {
      error('프레임을 선택해주세요.')
      return
    }

    if (currentPage === 0) {
      setFormData((prev) => ({ ...prev, selectedUrls }))
    }

    setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1))
  }
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0))
  }

  const handleMerge = async () => {
    if (selectedUrls.length !== cutCount) {
      error(`컷을 ${cutCount}개 선택해주세요.`)
      return
    }
    if (!selectedFrame) {
      error('프레임을 선택해주세요.')
      return
    }

    const contentUrls = selectedUrls.map((url, index) => ({
      contentUrl: url,
      order: index + 1,
    }))

    const formDataToMerge: FormData = {
      roomCode: formData.roomCode,
      contentUrls,
      frameUuid: selectedFrame,
    }

    const response = await nCutAPI.mergeNCut(formDataToMerge)

    setMergedUrl(response.resultUrl)
    setCurrentPage(currentPage + 1)
  }

  const handleSubmit = async () => {
    if (!mergedUrl) {
      error('병합된 URL이 없습니다. 다시 시도해주세요.')
      return
    }

    setIsSubmitting(true)

    const response = await nCutAPI.saveNCut(saveData)
    if (response) {
      setIsSubmitting(false)
      leaveRoom()
      navigate('/gallery')
    } else {
      setIsSubmitting(false)
      error('NCut 저장 실패: ' + response.message)
    }
  }

  const pages = [
    <SelectCuts
      key="cuts"
      sharedUrls={sharedUrls}
      selectedUrls={selectedUrls}
      onSelectCut={handleSelectCut}
      cutCount={cutCount}
      allUsersSelections={allUsersSelections}
    />,
    <SelectFrame
      key="frame"
      cutCount={cutCount}
      selectedUrls={selectedUrls}
      selectedFrame={selectedFrame}
      onSelectFrame={handleSelectFrame}
    />,
    <DecorateNCut
      key="decorate"
      selectedUrls={selectedUrls}
      selectedFrame={selectedFrame}
      onDecoratedImageReady={handleDecoratedImageReady}
    />,
    <MakingThumbnail />,
    <Saving
      key="saving"
      mergedUrl={mergedUrl}
      onSubmit={handleSavingSubmit}
      isSubmitting={isSubmitting}
    />,
  ]

  return (
    <S.EditNCutContainer>
      {pages[currentPage]}
      {currentPage > 0 && (
        <S.EditNCutPrevButton onClick={handlePrev}>이전</S.EditNCutPrevButton>
      )}
      {currentPage === 1 ? (
        <S.EditNCutNextButton onClick={handleMerge}>병합</S.EditNCutNextButton>
      ) : currentPage < pages.length - 1 ? (
        <S.EditNCutNextButton onClick={handleNext}>다음</S.EditNCutNextButton>
      ) : (
        <S.EditNCutNextButton onClick={handleSubmit}>제출</S.EditNCutNextButton>
      )}
    </S.EditNCutContainer>
  )
}

export default EditNCut
