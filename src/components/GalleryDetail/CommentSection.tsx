import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/GalleryDetail/CommentStyle'
import { MdOutlineModeEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'

interface CommentSectionProps {
  profileUrl: string
  nickname: string
  comment: string
  userUuid?: string
  ncutUuid: string
  isMyComment?: boolean
  isMine?: boolean
  onEdit?: (newComment: string) => void
  onDelete?: () => void // 부모에서 실제 삭제 API 호출
  onOwnerDelete?: () => void // (게시글 소유자용)
}

const CommentSection: React.FC<CommentSectionProps> = ({
  profileUrl,
  nickname,
  comment,
  userUuid,
  isMyComment,
  isMine,
  onEdit,
  onDelete,
  onOwnerDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(comment)
  const navigate = useNavigate()

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/profile/${userUuid}`)
  }

  const handleSave = () => {
    if (onEdit) onEdit(editValue)
    setIsEditing(false)
  }

  // ✅ 버튼 클릭 시 폼 제출 막고 부모 콜백만 호출
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onDelete?.()
  }

  const handleOwnerDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('[CS] owner delete clicked')
    onOwnerDelete?.()
  }

  return (
    <S.CommentWrapper>
      <S.CommentLeft>
        <S.CommentUser>
          <ProfileImage
            src={profileUrl}
            alt={`${nickname}의 프로필`}
            height="50px"
            width="50px"
            onClick={handleProfileClick}
          />
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
          <S.IconButton
            as="button"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            <MdOutlineModeEdit size={23} />
          </S.IconButton>
        )}
        {isMyComment && !isEditing && (
          <S.IconButton as="button" type="button" onClick={handleDelete}>
            <RiDeleteBin6Line size={23} />
          </S.IconButton>
        )}
        {isMine && !isMyComment && (
          <S.IconButton as="button" type="button" onClick={handleOwnerDelete}>
            <RxCross2 size={23} />
          </S.IconButton>
        )}
        {isEditing && (
          <S.SaveButton as="button" type="button" onClick={handleSave}>
            저장
          </S.SaveButton>
        )}
      </S.ActionButtons>
    </S.CommentWrapper>
  )
}

export default CommentSection
