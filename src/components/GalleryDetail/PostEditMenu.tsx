import React from 'react'
import { FiEdit, FiLock, FiTrash2 } from 'react-icons/fi'
import * as S from '@styles/components/GalleryDetail/PostEditMenuStyle'

interface PostMenuProps {
  onEdit: () => void
  onChangeVisibility: () => void
  onDelete: () => void
}

const PostEditMenu: React.FC<PostMenuProps> = ({
  onEdit,
  onChangeVisibility,
  onDelete,
}) => {
  return (
    <S.Dropdown>
      <S.MenuItem onClick={onEdit}>
        글 수정 <FiEdit size={20} />
      </S.MenuItem>
      <S.MenuItem onClick={onChangeVisibility}>
        공개 범위 수정 <FiLock size={20} />
      </S.MenuItem>
      <S.MenuItem onClick={onDelete}>
        게시글 삭제 <FiTrash2 size={20} color="red" />
      </S.MenuItem>
    </S.Dropdown>
  )
}

export default PostEditMenu
