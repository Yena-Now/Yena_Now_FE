import React, { useCallback, useState } from 'react'
import * as G from '@styles/components/NCut/Create/GlobalStyle'
import { nCutAPI } from '@/api/ncut'
import { useToast } from '@/hooks/useToast'
import { useNavigate } from 'react-router-dom'

import { MdNavigateNext } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa6'
import First from '@components/NCut/Create/First'
import Second from '@components/NCut/Create/Second'
import Third from '@components/NCut/Create/Third'
import Fourth from '@components/NCut/Create/Fourth'
import Fifth from '@components/NCut/Create/Fifth'
import Last from '@components/NCut/Create/Last'
import { s3API } from '@/api/s3'

const CreateSession: React.FC = () => {
  const { error } = useToast()
  const navigate = useNavigate()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [formData, setFormData] = useState({
    backgroundImage: null as File | null,
    backgroundImageUrl: null as string | null,
    selectedFilter: 'basic',
    isImageUploaded: false,
    takeCnt: 6,
    cutCnt: 2,
    timeLimit: 10,
  })
  const [originalImage, setOriginalImage] = useState<{
    file: File | null
    url: string | null
  }>({ file: null, url: null })

  const [roomCode, setRoomCode] = useState('')
  const [sessionToken, setSessionToken] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const applyFilterToImage = useCallback(
    async (
      imageUrl: string,
      filter: string,
    ): Promise<{ file: File; url: string }> => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas?.getContext('2d', { alpha: true })
          if (!ctx) {
            return reject(new Error('Canvas context not available'))
          }
          canvas.width = img.width
          canvas.height = img.height
          ctx.filter = filter
          ctx.drawImage(img, 0, 0)

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const newFile = new File(
                  [blob],
                  imageUrl.split('.png')[0] + '-filtered.png',
                  {
                    type: 'image/png',
                  },
                )
                const newUrl = URL.createObjectURL(newFile)
                resolve({ file: newFile, url: newUrl })
              } else {
                reject(new Error('Blob creation failed'))
              }
            },
            'image/png',
            1,
          )
        }
        img.onerror = (err) => reject(err)
        img.src = imageUrl
      })
    },
    [],
  )

  const handleCreateSession = async () => {
    setIsCreating(true)
    try {
      const fileUrl = await s3API.upload({
        type: 'profile',
        file: formData.backgroundImage as File,
      })
      if (fileUrl) {
        setFormData((prev) => ({
          ...prev,
          backgroundImageUrl: fileUrl as unknown as string,
          isImageUploaded: true,
        }))
      } else {
        error('이미지 업로드 실패')
        return
      }

      const response = await nCutAPI.createSession({
        backgroundUrl: fileUrl as unknown as string,
        takeCnt: formData.takeCnt,
        cutCnt: formData.cutCnt,
        timeLimit: formData.timeLimit,
      })

      setRoomCode(response.roomCode)
      setSessionToken(response.token)
      setCurrentIndex(pages.length - 1) // Last 컴포넌트로 이동
    } catch (err) {
      error(`세션 생성 실패: ${err}`)
    } finally {
      setIsCreating(false)
    }
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, pages.length - 1))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleFormDataChange = useCallback(
    async (newData: Partial<typeof formData>) => {
      // 이미지 업로드 시 원본 이미지 저장
      if (newData.backgroundImage && newData.backgroundImageUrl) {
        setOriginalImage({
          file: newData.backgroundImage,
          url: newData.backgroundImageUrl,
        })
      }

      // 필터 변경 시
      if (newData.selectedFilter && originalImage.url) {
        try {
          const { file, url } = await applyFilterToImage(
            originalImage.url,
            newData.selectedFilter,
          )
          setFormData((prev) => ({
            ...prev,
            ...newData,
            backgroundImage: file,
            backgroundImageUrl: url,
          }))
        } catch (err) {
          error(`필터 적용 실패: ${err}`)
          setFormData((prev) => ({ ...prev, ...newData }))
        }
      } else {
        setFormData((prev) => ({ ...prev, ...newData }))
      }
    },
    [applyFilterToImage, originalImage.url, error],
  )

  const handleJoinSession = async () => {
    let backgroundUrl = formData.backgroundImageUrl || ''

    if (formData.backgroundImage instanceof File && !formData.isImageUploaded) {
      const fileToProcess = formData.backgroundImage

      backgroundUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target && typeof event.target.result === 'string') {
            resolve(event.target.result)
          } else {
            reject(new Error('파일 읽기 실패'))
          }
        }

        reader.onerror = () => reject(new Error('파일 읽기 오류'))
        reader.readAsDataURL(fileToProcess)
      })
    }

    if (roomCode && sessionToken) {
      navigate('/film/room/' + roomCode, {
        state: {
          roomCode: roomCode,
          token: sessionToken,
          isHost: true,
          backgroundImageUrl: backgroundUrl,
          takeCnt: formData.takeCnt,
          cutCnt: formData.cutCnt,
          timeLimit: formData.timeLimit,
        },
      })
    }
  }

  const pages = [
    <First
      backgroundImageUrl={formData.backgroundImageUrl}
      isImageUploaded={formData.isImageUploaded}
      onFormDataChange={handleFormDataChange}
    />,
    <Second
      backgroundImageUrl={formData.backgroundImageUrl}
      isImageUploaded={formData.isImageUploaded}
      onFormDataChange={handleFormDataChange}
    />,
    <Third onFormDataChange={handleFormDataChange} />,
    <Fourth onFormDataChange={handleFormDataChange} />,
    <Fifth onFormDataChange={handleFormDataChange} />,
    <Last sessionId={roomCode} onJoinSession={handleJoinSession} />,
  ]

  return (
    <G.NCutCreateLayout>
      {currentIndex > 0 && currentIndex < pages.length - 1 ? (
        <G.NCutPrvButton onClick={handlePrev}>
          <MdNavigateNext
            style={{
              width: '30px',
              height: '30px',
              color: 'white',
              transform: 'rotate(180deg)',
            }}
          />
        </G.NCutPrvButton>
      ) : (
        <G.NCutButtonWrapper />
      )}
      <G.NcutCreateContainer>
        {pages[currentIndex]}
        {currentIndex < pages.length - 1 && (
          <G.ProgressBar>
            {pages.slice(0, pages.length - 1).map((page, idx) => (
              <G.ProgressBarItem
                key={idx}
                isActive={pages.indexOf(page) === currentIndex}
              />
            ))}
          </G.ProgressBar>
        )}
      </G.NcutCreateContainer>
      {currentIndex < pages.length - 2 ? (
        <G.NCutNextButton onClick={handleNext}>
          <MdNavigateNext
            style={{
              width: '30px',
              height: '30px',
              color: 'white',
            }}
          />
        </G.NCutNextButton>
      ) : currentIndex < pages.length - 2 ? (
        <G.NCutButtonWrapper />
      ) : null}
      {currentIndex === pages.length - 2 && (
        <G.NCutNextButton onClick={handleCreateSession} disabled={isCreating}>
          <FaCheck
            style={{
              width: '30px',
              height: '30px',
              color: 'white',
            }}
          />
        </G.NCutNextButton>
      )}
    </G.NCutCreateLayout>
  )
}

export default CreateSession
