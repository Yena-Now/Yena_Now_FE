import React from 'react'
import * as S from '@styles/components/GalleryDetail/DeletePostContentStyle'
import { useToast } from '@/hooks/useToast'

interface DeletePostContentProps {
  onDelete: () => void
  onCancel: () => void
}

const DeletePostContent: React.FC<DeletePostContentProps> = ({
  onDelete,
  onCancel,
}) => {
  const { success } = useToast()

  const handleDelete = () => {
    onDelete()
    success('N컷이 삭제되었습니다.')
  }

  return (
    <S.Container>
      <S.ButtonWrapper>
        <S.YesButton onClick={handleDelete}>네</S.YesButton>
        <S.NoButton onClick={onCancel}>아니오</S.NoButton>
      </S.ButtonWrapper>
    </S.Container>
  )
}

export default DeletePostContent
