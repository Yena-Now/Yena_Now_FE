import React from 'react'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/GalleryDetail/CommentStyle'
// import { MdOutlineModeEdit } from "react-icons/md";
// import { RiDeleteBin6Line } from "react-icons/ri";
interface CommentSectionProps {
  profileUrl: string
  nickname: string
  comment: string
}

const CommentSection: React.FC<CommentSectionProps> = ({
  profileUrl,
  comment,
  nickname,
}) => {
  return (
    <S.CommentWrapper>
      <S.CommentUser>
        <ProfileImage src={profileUrl} alt={`${nickname}의 프로필`} />
        <S.Nickname>{nickname}</S.Nickname>
      </S.CommentUser>
      <S.Comment>{comment}</S.Comment>
    </S.CommentWrapper>
  )
}

export default CommentSection
