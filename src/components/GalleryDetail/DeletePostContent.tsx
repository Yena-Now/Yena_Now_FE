import React from 'react'
import * as S from '@styles/components/GalleryDetail/DeletePostContentStyle'

interface DeletePostContentProps {
  onDelete: () => void
  onCancel: () => void
}

const DeletePostContent: React.FC<DeletePostContentProps> = ({
  onDelete,
  onCancel,
}) => {
  return (
    <S.Container>
      <S.ButtonWrapper>
        <S.YesButton onClick={onDelete}>네</S.YesButton>
        <S.NoButton onClick={onCancel}>아니오</S.NoButton>
      </S.ButtonWrapper>
    </S.Container>
  )
}

export default DeletePostContent
