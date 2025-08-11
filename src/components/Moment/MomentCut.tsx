import type { RankingNCut } from '@/types/moment'
import * as S from '@styles/components/Moment/MomentCutStyle'

interface MomentCutProps {
  nCut: RankingNCut
}
const MomentCut: React.FC<MomentCutProps> = ({ nCut }) => {
  return (
    <div>
      <p>{nCut.ncutUrl}</p>
      <p>{nCut.ncutUuid}</p>
      <p>{nCut.likeCount}</p>
      <br />
    </div>
  )
}

export default MomentCut
