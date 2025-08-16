import type { NCut } from '@/types/NCutList'
import { GoHeartFill } from 'react-icons/go'
import { FaRotate } from 'react-icons/fa6'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/Common/GalleryCardStyle'
import { useNavigate } from 'react-router-dom'
import HoverVideoPlayer from 'react-hover-video-player'
import LoadingSpinner from './LoadingSpinner'
import { useEffect, useState } from 'react'

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
  const [convertedThumbnailUrl, setConvertedThumbnailUrl] = useState<
    string | null
  >(null)

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/profile/${userUuid}`)
  }

  const isVideo = /\.(mp4|webm|ogg|m4v)$/i.test(ncutUrl)

  useEffect(() => {
    setConvertedThumbnailUrl(null) // 초기화
    if (!isVideo) {
      setConvertedThumbnailUrl(thumbnailUrl)
      return
    }

    // 비디오의 첫 프레임을 캡처하여 썸네일로 사용
    if (isVideo) {
      const video = document.createElement('video')
      video.crossOrigin = 'anonymous'
      video.src = `${ncutUrl}#t=0.001`
      video.load()
      video.play()
      video.currentTime = 0
      video.onseeked = () => {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const context = canvas.getContext('2d')
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
          setConvertedThumbnailUrl(canvas.toDataURL('image/png'))
        }
      }
      video.onerror = () => {
        setConvertedThumbnailUrl(thumbnailUrl)
      }
    }
  }, [isVideo, ncutUrl, thumbnailUrl])

  return (
    <>
      <S.Conainter onClick={onClick}>
        <S.RelayIcon>
          {relay && <FaRotate style={{ color: 'white' }} />}
        </S.RelayIcon>
        <S.PhotoWrapper>
          {isVideo ? (
            <>
              {!convertedThumbnailUrl ? (
                <LoadingSpinner />
              ) : (
                <HoverVideoPlayer
                  videoSrc={ncutUrl}
                  videoStyle={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  pausedOverlay={
                    <S.Thumbnail
                      src={convertedThumbnailUrl || thumbnailUrl}
                      alt=""
                    />
                  }
                  loadingOverlay={<LoadingSpinner />}
                  muted
                  loop
                  sizingMode="container"
                  style={{ width: '100%', height: '100%' }}
                  // restartOnPaused // 일시정지 재시작
                />
              )}
            </>
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
