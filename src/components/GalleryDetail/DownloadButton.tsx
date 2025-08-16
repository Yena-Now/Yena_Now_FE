import React, { useState } from 'react'
import { useToast } from '@/hooks/useToast'
import { useNavigate } from 'react-router-dom'
import * as S from '@/styles/components/GalleryDetail/DownloadButtonStyle'
import DownloadMenu from '@components/GalleryDetail/DownloadMenu'

interface DownloadButtonProps {
  fileUrl: string
  ncutUuid: string
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  fileUrl,
  ncutUuid,
}) => {
  const { info, error, success } = useToast()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const ext = fileUrl.split('.').pop()?.toLowerCase() || ''
  const isVideo = ['mp4', 'mov', 'webm'].includes(ext)
  const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(ext)

  const downloadFile = async (url: string, filename: string) => {
    try {
      const changedUrl = `${url}?${Date.now()}`
      const res = await fetch(changedUrl)
      if (!res.ok) throw new Error('fetch failed')
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = blobUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)

      success('다운로드 완료!')
    } catch {
      error('다운로드 실패!')
    }
  }

  const handleImageSave = () => {
    if (!isImage) return info('사진만 가능해요')
    downloadFile(fileUrl, `${ncutUuid}.${ext || 'png'}`)
    setOpen(false)
  }

  const handleGifSave = () => {
    if (!isVideo) return info('현재 준비중인 기능이에요')
    navigate(`/gif-extract?video=${encodeURIComponent(fileUrl)}`)
    setOpen(false)
  }

  const handleVideoSave = () => {
    if (!isVideo) return info('영상만 저장 가능해요')
    downloadFile(fileUrl, `${ncutUuid}.${ext || 'mp4'}`)
    setOpen(false)
  }

  return (
    <S.Container>
      <S.DownloadButton
        type="button"
        onClick={() => setOpen((v) => !v)}
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
