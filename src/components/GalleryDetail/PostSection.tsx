import React, { useState, useEffect } from 'react'
import * as S from '@styles/components/GalleryDetail/PostSectionStyle'
import { useToast } from '@/hooks/useToast'

interface PostSectionProps {
  content: string
  isMine?: boolean
  isEditingFromParent?: boolean
  onUpdateContent?: (newContent: string) => void
  onFinishEdit?: () => void
}

const PostSection: React.FC<PostSectionProps> = ({
  content,
  isEditingFromParent = false,
  onUpdateContent,
  onFinishEdit,
}) => {
  const { success } = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(content)

  useEffect(() => {
    if (isEditingFromParent) {
      setIsEditing(true)
    }
  }, [isEditingFromParent])

  const handleSave = () => {
    setIsEditing(false)
    if (editValue.trim() !== content && onUpdateContent) {
      onUpdateContent(editValue)
      success('글이 수정되었습니다.')
    }
    if (onFinishEdit) onFinishEdit()
  }

  return (
    <S.PostContainer>
      {isEditing ? (
        <S.EditWrapper>
          <S.PostContentInput
            value={editValue}
            autoFocus
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <S.SaveButton onClick={handleSave}>저장</S.SaveButton>
        </S.EditWrapper>
      ) : (
        <S.PostContent>{content}</S.PostContent>
      )}
    </S.PostContainer>
  )
}

export default PostSection
