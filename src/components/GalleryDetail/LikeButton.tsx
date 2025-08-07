import React, { useState, useEffect } from 'react'
import { IoHeartOutline, IoHeart } from 'react-icons/io5'
import * as S from '@styles/components/GalleryDetail/LikeButtonStyle'
import { useToast } from '@/hooks/useToast'
import { likeAPI } from '@/api/like'
import type { NCutDetailType } from '@/types/NCutDetail'

interface LikeButtonProps {
  data: NCutDetailType
  onClick?: (liked: boolean) => void
}

const LikeButton: React.FC<LikeButtonProps> = ({ data, onClick }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(data.likeCount)
  const { error } = useToast()

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const res = await likeAPI.getLikes(data.ncutUuid)
        setIsLiked(res.isLiked)
        setLikeCount(res.likeCount)
      } catch {
        error('좋아요 정보를 불러오지 못했습니다.')
      }
    }

    fetchLikeStatus()
  }, [data.ncutUuid])

  const handleLikeClick = async () => {
    const nextLiked = !isLiked

    try {
      if (nextLiked) {
        await likeAPI.like(data.ncutUuid)
      } else {
        await likeAPI.unlike(data.ncutUuid)
      }

      setIsLiked(nextLiked)
      setLikeCount((prev) => prev + (nextLiked ? 1 : -1))
      onClick?.(nextLiked)
    } catch {
      error('좋아요 처리 실패')
    }
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
