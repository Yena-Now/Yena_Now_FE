import React from 'react'

import defaultProfileImage from '/user_default_profile.png'
import * as S from '@styles/components/Common/ProfileImageStyle'

interface ProfileImageProps {
  src?: string
  alt?: string
  height?: string
  width?: string
  onClick?: (() => void) | React.MouseEventHandler<HTMLImageElement>
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src = defaultProfileImage,
  alt = '프로필 이미지',
  height = '40px',
  width = '40px',
  onClick = () => {},
}) => {
  return (
    <S.ProfileImageWrapper onClick={onClick}>
      <S.ProfileImage
        src={src || defaultProfileImage}
        alt={alt}
        width={width}
        height={height}
      />
    </S.ProfileImageWrapper>
  )
}

export default ProfileImage
