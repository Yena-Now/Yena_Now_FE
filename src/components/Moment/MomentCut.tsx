import { useNavigate } from 'react-router-dom'
import type { RankingNCut } from '@/types/moment'
import { FaRegHeart } from 'react-icons/fa'
import * as S from '@styles/components/Moment/MomentCutStyle'

interface MomentCutProps extends RankingNCut {
  // nCut: RankingNCut
  idx: number
}
const MomentCut: React.FC<MomentCutProps> = ({
  ncutUrl,
  ncutUuid,
  likeCount,
  idx,
}) => {
  const navigate = useNavigate()
  const getExt = (url: string): string => {
    const clean = url.split('#')[0].split('?')[0]
    const i = clean.lastIndexOf('.')
    return i >= 0 ? clean.slice(i + 1).toLowerCase() : ''
  }

  const getType = (url: string): 'video' | 'image' => {
    const ext = getExt(url)
    if (ext === 'mp4') {
      return 'video'
    }
    if (ext === 'webp' || ext === 'png' || ext === 'jpg') return 'image'
    return 'image'
  }

  const mediaType = getType(ncutUrl)

  return (
    <S.Container onClick={() => navigate(`/gallery/${ncutUuid}`)}>
      {mediaType === 'image' ? (
        <S.Image
          src="https://yenanow.s3.ap-northeast-2.amazonaws.com/ncut/0158ceb1-c448-4d20-b691-0e1502155a0d.png"
          alt={`ncut-${idx}`}
        />
      ) : (
        <S.Video
          src="https://yenanow.s3.ap-northeast-2.amazonaws.com/ncut/5f5dc74b-4ac9-4016-bfff-089f71f2177f.mp4"
          autoPlay
          muted
          loop
        />
      )}
      <S.Overlay>
        <S.LikeCount>
          <S.LikeIcon>
            <FaRegHeart />
          </S.LikeIcon>
          <S.LikeNumber>{likeCount}</S.LikeNumber>
        </S.LikeCount>
      </S.Overlay>
    </S.Container>
  )
}

export default MomentCut
