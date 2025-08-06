import React from 'react'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/GalleryDetail/UserInfoStyle'

interface UserInfoProps {
  profileUrl: string
  nickname: string
  createdAt: string
}

const UserInfo: React.FC<UserInfoProps> = ({
  profileUrl,
  nickname,
  createdAt,
}) => {
  return (
    <S.UserInfoWrapper>
      <S.UserInfo>
        <ProfileImage src={profileUrl} alt={`${nickname}의 프로필`} />
        <S.Nickname>{nickname}</S.Nickname>
      </S.UserInfo>
      <S.Date>{createdAt}</S.Date>
    </S.UserInfoWrapper>
  )
}

export default UserInfo
