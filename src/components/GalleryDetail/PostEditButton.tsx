import React, { useState, useRef, useEffect } from 'react'
import { SlOptions } from 'react-icons/sl'
import PostEditMenu from './PostEditMenu'
import OptionModal from '@components/Common/OptionModal'
import VisibilityEditContent from './VisibilityEditContent'
import DeletePostContent from './DeletePostContent'
import * as S from '@styles/components/GalleryDetail/PostEditButtonStyle'

type VisibilityType = 'Public' | 'Follow' | 'Private'

interface PostEditButtonProps {
  onEdit: () => void
  initialVisibility: VisibilityType
  onChangeVisibility: (newValue: VisibilityType) => void
}

const PostEditButton: React.FC<PostEditButtonProps> = ({
  onEdit,
  initialVisibility,
  onChangeVisibility,
}) => {
  const [open, setOpen] = useState(false)
  const [visibilityModalOpen, setVisibilityModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <S.Container ref={menuRef}>
      {/* 옵션 버튼 */}
      <S.IconButton onClick={() => setOpen((prev) => !prev)}>
        <SlOptions size={20} />
      </S.IconButton>

      {/* 드롭다운 메뉴 */}
      {open && (
        <PostEditMenu
          onEdit={() => {
            onEdit()
            setOpen(false)
          }}
          onChangeVisibility={() => {
            setVisibilityModalOpen(true)
            setOpen(false)
          }}
          onDelete={() => {
            setDeleteModalOpen(true)
            setOpen(false)
          }}
        />
      )}

      {/* 공개 범위 수정 모달 */}
      {visibilityModalOpen && (
        <OptionModal
          title="공개 범위 수정"
          onClose={() => setVisibilityModalOpen(false)}
        >
          <VisibilityEditContent
            currentValue={initialVisibility}
            onChange={(newVisibility) => {
              onChangeVisibility(newVisibility)
              setVisibilityModalOpen(false)
            }}
          />
        </OptionModal>
      )}

      {/* 게시글 삭제 모달 */}
      {deleteModalOpen && (
        <OptionModal
          title="글을 삭제하시겠습니까?"
          onClose={() => setDeleteModalOpen(false)}
        >
          <DeletePostContent
            onDelete={() => {
              console.log('게시글 삭제 실행')
              setDeleteModalOpen(false)
            }}
            onCancel={() => setDeleteModalOpen(false)}
          />
        </OptionModal>
      )}
    </S.Container>
  )
}

export default PostEditButton
