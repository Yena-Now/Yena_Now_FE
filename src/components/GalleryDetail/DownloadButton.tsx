import React, { useState } from 'react'
import { useToast } from '@/hooks/useToast'
import { useNavigate } from 'react-router-dom'
import * as S from '@/styles/components/GalleryDetail/DownloadButtonStyle'
import DownloadMenu from './DownloadMenu'

interface DownloadButtonProps {
  fileUrl: string
  ncutUuid: string
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  fileUrl,
  ncutUuid,
}) => {
  const { error, success } = useToast()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const extension = fileUrl.split('.').pop()?.toLowerCase()
  const isVideo = ['mp4'].includes(extension || '')
  const isImage = ['jpg', 'png'].includes(extension || '')

  const downloadFile = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error()
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)

      success('다운로드 완료!')
    } catch {
      error('다운로드 실패!')
    }
  }

  const handleImageSave = () => {
    if (!isImage) return error('사진 저장은 jpg, png만 가능해요')
    downloadFile(fileUrl, `${ncutUuid}.${extension}`)
    setOpen(false)
  }

  const handleGifSave = () => {
    if (!isVideo) return error('GIF는 영상에서만 추출 가능해요')
    navigate(`/gif-extract?video=${encodeURIComponent(fileUrl)}`)
    setOpen(false)
  }

  const handleVideoSave = () => {
    if (!isVideo) return error('영상만 저장 가능해요')
    downloadFile(fileUrl, `${ncutUuid}.${extension}`)
    setOpen(false)
  }

  return (
    <S.Container>
      <S.DownloadButton
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        size={24}
      />
      {open && (
        <DownloadMenu
          onImageSave={handleImageSave}
          onGifSave={handleGifSave}
          onVideoSave={handleVideoSave}
          onClose={() => setOpen(false)}
        />
      )}
    </S.Container>
  )
}

export default DownloadButton
