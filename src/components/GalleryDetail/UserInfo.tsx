import React from 'react'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/GalleryDetail/UserInfo'

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
      <ProfileImage src={profileUrl} alt={`${nickname}의 프로필`} />
      <S.UserInfo>
        <S.Nickname>{nickname}</S.Nickname>
        <S.Date>{createdAt}</S.Date>
      </S.UserInfo>
    </S.UserInfoWrapper>
  )
}

export default UserInfo
