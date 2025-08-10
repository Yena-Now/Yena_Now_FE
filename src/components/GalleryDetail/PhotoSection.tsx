import React from 'react'
import * as S from '@styles/components/GalleryDetail/PhotoSectionStyle'

interface PhotoSectionProps {
  ncutUrl: string
}

const PhotoSection: React.FC<PhotoSectionProps> = ({ ncutUrl }) => {
  const isVideo = /\.(mp4|webm|ogg|m4v)$/i.test(ncutUrl)
  return (
    <S.PhotoContainer>
      <S.PhotoFrame>
        {isVideo ? (
          <S.Video
            src={ncutUrl}
            muted
            autoPlay
            loop
            controls
            controlsList="nodownload"
          />
        ) : (
          <S.Photo src={ncutUrl} alt="N컷 이미지" />
        )}
      </S.PhotoFrame>
    </S.PhotoContainer>
  )
}

export default PhotoSection
