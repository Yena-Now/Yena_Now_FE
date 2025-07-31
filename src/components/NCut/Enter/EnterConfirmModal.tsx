import React, { useEffect, useRef } from 'react'
import * as S from '@styles/components/NCut/Enter/EnterModalStyle'
import { IoIosClose } from 'react-icons/io'
import { BiError } from 'react-icons/bi'

interface ParticipationModalProps {
  isOpen: boolean
  onClose: () => void
  isExist: boolean
  onConfirm: () => void
  onCancel: () => void
}

const ParticipationModal: React.FC<ParticipationModalProps> = ({
  isOpen,
  onClose,
  isExist,
  onConfirm,
  onCancel,
}) => {

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      inputRef.current?.focus()
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <S.ModalBackdrop onClick={onClose}>
      <S.ModalContainer>
        <S.ModalCloseButton onClick={onClose}>
          <IoIosClose />
        </S.ModalCloseButton>
        {isExist ? (
          <>
            <S.ModalTitle>세션 참여</S.ModalTitle>
            <S.ModalDescription>입장 하시겠습니까?</S.ModalDescription>
            <S.ModalButtonContainer>
              <S.ModalButton className="cancel" onClick={onCancel}>
                나가기
              </S.ModalButton>
              <S.ModalButton className="confirm" onClick={onConfirm}>
                입장하기
              </S.ModalButton>
            </S.ModalButtonContainer>
          </>
        ): (
          <>
            <S.ErrorIcon>
            <BiError/>
            </S.ErrorIcon>
            <S.ModalTitle>존재하지 않는 세션입니다.</S.ModalTitle>
            <S.ModalDescription>다시 시도해주세요.</S.ModalDescription>
          </>
          )}
      </S.ModalContainer>
    </S.ModalBackdrop>
  )
}

export default ParticipationModal
