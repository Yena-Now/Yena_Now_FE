import React from 'react'

import defaultProfileImage from '/user_default_profile.png'
import * as S from '@styles/components/Common/ProfileImageStyle'

interface ProfileImageProps {
  src?: string
  alt?: string
  onClick?: () => void
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src = defaultProfileImage,
  alt = '프로필 이미지',
  onClick = () => {},
}) => {
  return (
    <S.ProfileImageWrapper onClick={onClick}>
      <S.ProfileImage src={src} alt={alt} />
    </S.ProfileImageWrapper>
  )
}

export default ProfileImage
