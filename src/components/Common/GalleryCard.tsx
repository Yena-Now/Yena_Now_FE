import type { NCut } from '@/types/NCutList'
import { GoHeartFill } from 'react-icons/go'
import { FaRotate } from 'react-icons/fa6'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/Common/GalleryCardStyle'
import { useNavigate } from 'react-router-dom'
import HoverVideoPlayer from 'react-hover-video-player'

interface NcutForGalleryProps extends NCut {
  onClick: () => void
}
const GalleryCard: React.FC<NcutForGalleryProps> = ({
  userUuid,
  profileUrl,
  nickname,
  ncut_uuid,
  thumbnailUrl,
  ncutURL,
  likeCount,
  isRelay,
  onClick,
}) => {
  const navigate = useNavigate()

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/profile/${userUuid}`)
  }

  const isVideo = /\.(mp4|webm|ogg|m4v)$/i.test(ncutURL)

  return (
    <>
      <S.Conainter onClick={onClick}>
        <S.RelayIcon>
          {isRelay && <FaRotate style={{ color: 'white' }} />}
        </S.RelayIcon>
        <S.PhotoWrapper>
          {isVideo ? (
            <HoverVideoPlayer
              videoSrc={ncutURL}
              pausedOverlay={<S.Photo src={thumbnailUrl} alt="썸네일" />}
              loadingOverlay={<div>Loading...</div>}
              muted
              loop
              sizingMode="overlay"
              // restartOnPaused // 일시정지 재시작
            />
          ) : (
            <S.Photo src={ncutURL} alt="썸네일" />
          )}
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
            <S.UserName onClick={handleProfileClick}>{nickname}</S.UserName>
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
