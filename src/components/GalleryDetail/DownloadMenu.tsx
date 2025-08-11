import React, { useEffect, useRef } from 'react'
import * as S from '@/styles/components/GalleryDetail/DownloadMenuStyle'
import { BsCamera } from 'react-icons/bs'
import { HiOutlineGif } from 'react-icons/hi2'
import { IoVideocam } from 'react-icons/io5'

interface DownloadMenuProps {
  onImageSave: () => void
  onGifSave: () => void
  onVideoSave: () => void
  onClose: () => void // 바깥 클릭 시 닫기
}

const DownloadMenu: React.FC<DownloadMenuProps> = ({
  onImageSave,
  onGifSave,
  onVideoSave,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <S.Dropdown ref={menuRef}>
      <S.MenuItem onClick={onImageSave}>
        사진 저장 <BsCamera size={20} />
      </S.MenuItem>
      <S.MenuItem onClick={onGifSave}>
        GIF 저장 <HiOutlineGif size={20} />
      </S.MenuItem>
      <S.MenuItem onClick={onVideoSave}>
        영상 저장 <IoVideocam size={20} />
      </S.MenuItem>
    </S.Dropdown>
  )
}

export default DownloadMenu
