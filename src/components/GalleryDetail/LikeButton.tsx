import React, { useState, useEffect } from 'react'
import { IoHeartOutline, IoHeart } from 'react-icons/io5'
import * as S from '@styles/components/GalleryDetail/LikeButtonStyle'
import { useToast } from '@/hooks/useToast'
import { likeAPI } from '@/api/like'
import LikeListModal from '@components/GalleryDetail/LikeListModal'
import type { NCutDetailType } from '@/types/NCutDetail'

interface LikeButtonProps {
  data: NCutDetailType
  onClick?: (liked: boolean) => void
}

const LikeButton: React.FC<LikeButtonProps> = ({ data, onClick }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(data.likeCount)
  const [open, setOpen] = useState(false) // ⬅️ 모달 상태
  const { error } = useToast()

  useEffect(() => {
    if (!data?.ncutUuid) return
    ;(async () => {
      try {
        const res = await likeAPI.getLikes(data.ncutUuid) // LikeDetailResponse
        setIsLiked(res.isLiked)
        setLikeCount(res.likeCount)
      } catch {
        error('좋아요 정보를 불러오지 못했습니다.')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.ncutUuid])

  const handleLikeClick = async () => {
    if (!data?.ncutUuid) return
    const nextLiked = !isLiked

    // 낙관적 업데이트
    setIsLiked(nextLiked)
    setLikeCount((prev) => prev + (nextLiked ? 1 : -1))
    onClick?.(nextLiked)

    try {
      if (nextLiked) await likeAPI.like(data.ncutUuid)
      else await likeAPI.unlike(data.ncutUuid)
    } catch {
      // 실패 시 롤백
      setIsLiked(!nextLiked)
      setLikeCount((prev) => prev + (nextLiked ? -1 : 1))
      error('좋아요 처리 실패')
    }
  }

  return (
    <>
      <S.LikeButtonContainer>
        {/* 하트 아이콘 클릭 = 토글 */}
        <S.LikeButton onClick={handleLikeClick}>
          {isLiked ? (
            <IoHeart color="red" size={25} />
          ) : (
            <IoHeartOutline size={25} />
          )}
        </S.LikeButton>

        {/* 숫자 클릭 = 모달 열기 */}
        <S.LikeCount
          onClick={() => setOpen(true)}
          role="button"
          aria-label="좋아요한 사람 보기"
        >
          {likeCount}
        </S.LikeCount>
      </S.LikeButtonContainer>

      {/* 좋아요 목록 모달 */}
      <LikeListModal
        ncutUuid={data.ncutUuid}
        isOpen={open}
        onClose={() => setOpen(false)}
        initialLikeCount={likeCount} // ⬅️ 지금 화면의 최신 값
        initialIsLiked={isLiked}
      />
    </>
  )
}

export default LikeButton
