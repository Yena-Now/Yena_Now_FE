import type { NCut } from '@/types/NCutList'
import { GoHeartFill } from 'react-icons/go'
import { FaRotate } from 'react-icons/fa6'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/Common/GalleryCardStyle'
import { useNavigate } from 'react-router-dom'

const GalleryCard: React.FC<NCut> = ({
  userUuid,
  profileUrl,
  nickname,
  // ncut_uuid,
  thumbnailUrl,
  likeCount,
  isRelay,
}) => {
  const navigate = useNavigate()

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/profile/${userUuid}`)
  }

  return (
    <>
      <S.Conainter>
        <S.PhotoWrapper>
          <S.RelayIcon>
            {isRelay && <FaRotate style={{ color: 'white' }} />}
          </S.RelayIcon>
          <S.Photo src={thumbnailUrl} alt="" />
        </S.PhotoWrapper>
        <S.InfoWrapper>
          <S.Box>
            <ProfileImage
              src={profileUrl}
              alt={nickname}
              height="25px"
              width="25px"
              onClick={handleProfileClick}
            />
            <S.UserName>{nickname}</S.UserName>
          </S.Box>
          <S.Box>
            <GoHeartFill size={12} />
            <S.likeText>{likeCount}</S.likeText>
          </S.Box>
        </S.InfoWrapper>
      </S.Conainter>
    </>
  )
}

export default GalleryCard
