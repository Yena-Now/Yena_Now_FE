import React from 'react'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/GalleryDetail/UserInfoStyle'
import { useNavigate } from 'react-router-dom'
import { formatKoreanDateTime } from '@/utils/date'

interface UserInfoProps {
  profileUrl: string
  userUuid?: string
  nickname: string
  createdAt: string
  onClick: () => void
}

const UserInfo: React.FC<UserInfoProps> = ({
  profileUrl,
  userUuid,
  nickname,
  createdAt,
  onClick,
}) => {
  const navigate = useNavigate()
  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/profile/${userUuid}`)
  }

  return (
    <S.UserInfoWrapper onClick={onClick}>
      <S.UserInfo onClick={handleProfileClick}>
        <ProfileImage src={profileUrl} alt={`${nickname}의 프로필`} />
        <S.Nickname>{nickname}</S.Nickname>
      </S.UserInfo>
      <S.Date>{formatKoreanDateTime(createdAt)}</S.Date>
    </S.UserInfoWrapper>
  )
}

export default UserInfo
