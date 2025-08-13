import React from 'react'
import ProfileImage from '@components/Common/ProfileImage'
import type { Profile } from '@/types/Profile'
import * as S from '@styles/components/UserProfile/ProfileHeaderStyle'

interface ProfileHeaderProps {
  data: Profile
  onEditProfile?: () => void
  onToggleFollow?: () => void
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  data,
  onEditProfile,
  onToggleFollow,
}) => {
  return (
    <S.HeaderWrapper>
      <S.LeftArea>
        <ProfileImage
          src={data.profileUrl ?? undefined}
          alt="프로필사진"
          width="160px"
          height="160px"
        />
        <S.NameBlock>
          <S.Nickname>{data.nickname}</S.Nickname>
          {data.name && <S.Name>{data.name}</S.Name>}
          {data.mine ? (
            <S.MyBtn onClick={onEditProfile}>내 정보 조회</S.MyBtn>
          ) : (
            <S.FollowBtn onClick={onToggleFollow}>
              {data.following ? '팔로잉' : '팔로우'}
            </S.FollowBtn>
          )}
        </S.NameBlock>
      </S.LeftArea>

      <S.CountRow>
        <S.CountItem>
          <S.CountNum>{data.totalCut}</S.CountNum>
          <S.CountLabel>Cuts</S.CountLabel>
        </S.CountItem>
        <S.CountItem>
          <S.CountNum>{data.followerCount}</S.CountNum>
          <S.CountLabel>팔로워</S.CountLabel>
        </S.CountItem>
        <S.CountItem>
          <S.CountNum>{data.followingCount}</S.CountNum>
          <S.CountLabel>팔로잉</S.CountLabel>
        </S.CountItem>
      </S.CountRow>
    </S.HeaderWrapper>
  )
}

export default ProfileHeader
