import React from 'react'
import * as S from '@styles/components/GalleryDetail/PostSectionStyle'
interface PostSectionProps {
  content: string
}
const PostSection: React.FC<PostSectionProps> = ({ content }) => {
  return (
    <S.PostContainer>
      <S.PostFrame>
        <S.PostContent>{content}</S.PostContent>
      </S.PostFrame>
    </S.PostContainer>
  )
}

export default PostSection
