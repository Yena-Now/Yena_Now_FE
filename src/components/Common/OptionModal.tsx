import React, { useRef, useEffect, useCallback } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import * as S from '@/styles/components/Common/OptionModalStyle'

interface OptionModalProps {
  title: string
  children: React.ReactNode
  onClose: () => void
}

const OptionModal: React.FC<OptionModalProps> = ({
  title,
  children,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleCloseModal = useCallback((e: MouseEvent) => {
    if (modalRef.current === null) {
      return
    }
    if (!modalRef.current.contains(e.target as HTMLElement)) {
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 모달 외부 영역 클릭 시 닫기
  useEffect(() => {
    window.addEventListener('click', handleCloseModal, true)
    return () => {
      window.removeEventListener('click', handleCloseModal, true)
    }
  }, [handleCloseModal])

  // esc 키로 모달창 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <S.OverLay>
      <S.Container ref={modalRef}>
        <S.TopBox>
          <S.CloseIcon>
            <IoCloseOutline
              onClick={onClose}
              size={18}
              style={{ color: '#777777' }}
            />
          </S.CloseIcon>
        </S.TopBox>
        <S.ContentBox>
          <S.TitleBox>{title}</S.TitleBox>
          <S.Content>{children}</S.Content>
        </S.ContentBox>
      </S.Container>
    </S.OverLay>
  )
}

export default OptionModal
