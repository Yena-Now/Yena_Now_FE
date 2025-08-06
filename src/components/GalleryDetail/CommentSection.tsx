import React, { useState } from 'react'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/GalleryDetail/CommentStyle'
import { MdOutlineModeEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'
import { useToast } from '@/hooks/useToast'

interface CommentSectionProps {
  profileUrl: string
  nickname: string
  comment: string
  isMyComment?: boolean
  isMine?: boolean
  onEdit?: (newComment: string) => void
  onDelete?: () => void
  onOwnerDelete?: () => void
}

const CommentSection: React.FC<CommentSectionProps> = ({
  profileUrl,
  nickname,
  comment,
  isMyComment,
  isMine,
  onEdit,
  onDelete,
  onOwnerDelete,
}) => {
  const { success } = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(comment)

  const handleSave = () => {
    if (onEdit) onEdit(editValue)
    setIsEditing(false)
    success('댓글이 수정되었습니다.')
  }

  const handleDelete = () => {
    if (onDelete) onDelete()
    success('댓글이 삭제되었습니다.')
  }

  const handleOwnerDelete = () => {
    if (onOwnerDelete) onOwnerDelete()
    success('댓글이 제거되었습니다.')
  }

  return (
    <S.CommentWrapper>
      <S.CommentLeft>
        <S.CommentUser>
          <ProfileImage src={profileUrl} alt={`${nickname}의 프로필`} />
          <S.Nickname>{nickname}</S.Nickname>
        </S.CommentUser>

        {isEditing ? (
          <S.EditInput
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        ) : (
          <S.Comment>{comment}</S.Comment>
        )}
      </S.CommentLeft>

      <S.ActionButtons>
        {isMyComment && !isEditing && (
          <S.IconButton onClick={() => setIsEditing(true)}>
            <MdOutlineModeEdit size={23} />
          </S.IconButton>
        )}
        {isMyComment && !isEditing && (
          <S.IconButton onClick={handleDelete}>
            <RiDeleteBin6Line size={23} />
          </S.IconButton>
        )}
        {isMine && !isMyComment && (
          <S.IconButton onClick={handleOwnerDelete}>
            <RxCross2 size={23} />
          </S.IconButton>
        )}
        {isEditing && <S.SaveButton onClick={handleSave}>저장</S.SaveButton>}
      </S.ActionButtons>
    </S.CommentWrapper>
  )
}

export default CommentSection
