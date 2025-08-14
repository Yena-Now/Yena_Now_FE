import type { NCut } from '@/types/NCutList'
import { GoHeartFill } from 'react-icons/go'
import { FaRotate } from 'react-icons/fa6'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/Common/GalleryCardStyle'
import { useNavigate } from 'react-router-dom'
import HoverVideoPlayer from 'react-hover-video-player'
import LoadingSpinner from './LoadingSpinner'

interface NcutForGalleryProps extends NCut {
  onClick: () => void
  showOwnerAvatar?: boolean
}
const GalleryCard: React.FC<NcutForGalleryProps> = ({
  userUuid,
  profileUrl,
  nickname,
  // ncut_uuid,
  thumbnailUrl,
  ncutUrl,
  likeCount,
  relay,
  onClick,
  showOwnerAvatar = true,
}) => {
  const navigate = useNavigate()

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/profile/${userUuid}`)
  }

  const isVideo = /\.(mp4|webm|ogg|m4v)$/i.test(ncutUrl)
  // console.log({ ncutUrl, thumbnailUrl, profileUrl })

  return (
    <>
      <S.Conainter onClick={onClick}>
        <S.RelayIcon>
          {relay && <FaRotate style={{ color: 'white' }} />}
        </S.RelayIcon>
        <S.PhotoWrapper>
          {isVideo ? (
            <HoverVideoPlayer
              videoSrc={ncutUrl}
              videoStyle={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              pausedOverlay={<S.Thumbnail src={thumbnailUrl} alt="썸네일" />}
              loadingOverlay={<LoadingSpinner />}
              muted
              loop
              sizingMode="container"
              style={{ width: '100%', height: '100%' }}
              // restartOnPaused // 일시정지 재시작
            />
          ) : (
            <S.Photo src={ncutUrl} alt="사진" />
          )}
        </S.PhotoWrapper>
        <S.InfoWrapper>
          {showOwnerAvatar && (
            <S.Box>
              <ProfileImage
                src={profileUrl}
                alt={nickname}
                height="25px"
                width="25px"
                onClick={handleProfileClick}
              />
              <S.UserName onClick={handleProfileClick}>{nickname}</S.UserName>
            </S.Box>
          )}
          <S.Box>
            <GoHeartFill size={12} color="red" />
            <S.likeText>{likeCount}</S.likeText>
          </S.Box>
        </S.InfoWrapper>
      </S.Conainter>
    </>
  )
}

export default GalleryCard
