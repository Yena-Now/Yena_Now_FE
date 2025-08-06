import React, { useState } from 'react'
import { IoHeartOutline, IoHeart } from 'react-icons/io5'
import * as S from '@styles/components/GalleryDetail/LikeButtonStyle'
import type { NCutDetail } from '@/types/NCutDetail'

interface LikeButtonProps {
  data: NCutDetail
  onClick?: (liked: boolean) => void
}

const LikeButton: React.FC<LikeButtonProps> = ({ data, onClick }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(data.likeCount)

  const handleLikeClick = () => {
    const nextLiked = !isLiked
    setIsLiked(nextLiked)
    setLikeCount((prev) => prev + (nextLiked ? 1 : -1))
    onClick?.(nextLiked)
  }

  return (
    <S.LikeButtonContainer>
      <S.LikeButton onClick={handleLikeClick}>
        {isLiked ? (
          <IoHeart color="red" size={25} />
        ) : (
          <IoHeartOutline size={25} />
        )}
      </S.LikeButton>
      <S.LikeCount>{likeCount}</S.LikeCount>
    </S.LikeButtonContainer>
  )
}

export default LikeButton
