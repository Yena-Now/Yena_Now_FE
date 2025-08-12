import { useNavigate } from 'react-router-dom'
import type { RankingNCut } from '@/types/moment'
import { FaRegHeart } from 'react-icons/fa'
import * as S from '@styles/components/Moment/MomentCutStyle'

interface MomentCutProps {
  nCut: RankingNCut
}

const MomentCut: React.FC<MomentCutProps> = ({ nCut }) => {
  const { ncutUrl, ncutUuid, likeCount } = nCut
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
        <S.Image src={ncutUrl} />
      ) : (
        <S.Video src={ncutUrl} autoPlay muted loop />
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
