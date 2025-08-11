import React from 'react'
import * as S from '@styles/components/GalleryDetail/ShareModalContentStyle'
import { MdContentCopy } from 'react-icons/md'

interface ShareModalContentProps {
  onCopy: () => void
}

const ShareModalContent: React.FC<ShareModalContentProps> = ({ onCopy }) => {
  const currentPageUrl = window.location.href // 현재 페이지 주소

  return (
    <S.ShareModalContainer>
      <S.ShareLink type="text" value={currentPageUrl} readOnly />
      <S.CopyButton onClick={onCopy}>
        <MdContentCopy size={20} />
      </S.CopyButton>
    </S.ShareModalContainer>
  )
}

export default ShareModalContent
