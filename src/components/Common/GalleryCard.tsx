import type { NCut } from '@/types/NCutList'
import { GoHeartFill  } from "react-icons/go";
import * as S from '@styles/components/Common/GalleryCardStyle'

const GalleryCard:React.FC<NCut> = ({userUuid, profileUrl, nickname, ncut_uuid, thumbnailUrl, likeCount, isRelay}) => {
  return (
    <>
    <S.Conainter>
        <S.PhotoWrapper>
            <S.Photo src={thumbnailUrl} alt="" />
        </S.PhotoWrapper>
        <S.InfoWrapper>
            <S.Box>
                <S.ProfileImage src={profileUrl} /> 
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