import React, { useState, useEffect } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import * as S from '@styles/components/GalleryDetail/PostSectionStyle'

interface PostSectionProps {
  content: string
  isMine?: boolean
  isEditingFromParent?: boolean
  onUpdateContent?: (newContent: string) => void
  onFinishEdit?: () => void
}

const PostSection: React.FC<PostSectionProps> = ({
  content,
  // isMine,
  isEditingFromParent = false,
  onUpdateContent,
  onFinishEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(content)

  // 부모에서 수정 모드 트리거 시
  useEffect(() => {
    if (isEditingFromParent) {
      setIsEditing(true)
    }
  }, [isEditingFromParent])

  const handleSave = () => {
    setIsEditing(false)
    if (editValue.trim() !== content && onUpdateContent) {
      onUpdateContent(editValue)
    }
    if (onFinishEdit) onFinishEdit()
  }

  return (
    <S.PostContainer>
      <S.PostFrame>
        {isEditing ? (
          <S.InputWrapper>
            <S.PostContentInput
              type="text"
              value={editValue}
              autoFocus
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave()
                if (e.key === 'Escape') {
                  setEditValue(content)
                  setIsEditing(false)
                  if (onFinishEdit) onFinishEdit()
                }
              }}
            />
            <S.EditIcon onClick={handleSave}>
              <FiEdit3 />
            </S.EditIcon>
          </S.InputWrapper>
        ) : (
          <S.PostContent>{content}</S.PostContent>
        )}
      </S.PostFrame>
    </S.PostContainer>
  )
}

export default PostSection
