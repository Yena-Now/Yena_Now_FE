import React from 'react'
import * as S from '@styles/components/GalleryDetail/ShareModalContentStyle'
import { MdContentCopy } from 'react-icons/md'

interface ShareModalContentProps {
  ncutUrl: string
  onCopy: () => void
}

const ShareModalContent: React.FC<ShareModalContentProps> = ({
  ncutUrl,
  onCopy,
}) => {
  return (
    <S.ShareModalContainer>
      <S.ShareLink type="text" value={ncutUrl} readOnly />
      <S.CopyButton onClick={onCopy}>
        <MdContentCopy size={20} />
      </S.CopyButton>
    </S.ShareModalContainer>
  )
}

export default ShareModalContent
