import { IoShareSocialOutline } from 'react-icons/io5'
import React, { useState } from 'react'
import { useToast } from '@/hooks/useToast'
import * as S from '@styles/components/GalleryDetail/ShareButtonStyle'
import OptionModal from '@components/Common/OptionModal'
import ShareModalContent from '@components/GalleryDetail/ShareModalContent'

interface ShareButtonProps {
  ncutUrl: string
}

const ShareButton: React.FC<ShareButtonProps> = ({ ncutUrl }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { success, error } = useToast()

  const handleCopy = () => {
    navigator.clipboard
      .writeText(ncutUrl)
      .then(() => {
        success('링크가 복사되었습니다.')
      })
      .catch(() => {
        error('링크 복사에 실패했습니다.')
      })
  }

  return (
    <>
      <S.ShareButton onClick={() => setIsOpen(true)}>
        <IoShareSocialOutline size={25} />
      </S.ShareButton>

      {isOpen && (
        <OptionModal title="공유 링크 복사" onClose={() => setIsOpen(false)}>
          <ShareModalContent ncutUrl={ncutUrl} onCopy={handleCopy} />
        </OptionModal>
      )}
    </>
  )
}

export default ShareButton
