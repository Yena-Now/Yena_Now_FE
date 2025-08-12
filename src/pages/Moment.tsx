import { useSearchParams } from 'react-router-dom'
import { momentAPI } from '@/api/moment'
import type { RankingResponse } from '@/types/moment'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/useToast'
import MomentLayout from '@components/Moment/MomentLayout'
import * as S from '@styles/pages/Moment/MomentStyle'

const Moment = () => {
  const [searchParams] = useSearchParams()
  const weekly = searchParams.has('weekly')

  const { error } = useToast()

  const [dailyMoment, setDailyMoment] = useState<RankingResponse>([])
  const [weeklyMoment, setWeeklyMoment] = useState<RankingResponse>([])

  useEffect(() => {
    const fetchMoment = async () => {
      try {
        const dailyResponse = await momentAPI.getDailyMoment()
        const weeklyResponse = await momentAPI.getWeeklyMoment()
        setDailyMoment(dailyResponse)
        setWeeklyMoment(weeklyResponse)
      } catch {
        error('moment 불러오기 실패')
      }
    }
    fetchMoment()
  }, [])

  return (
    <S.Container>
      {weekly ? (
        <MomentLayout nCuts={weeklyMoment} />
      ) : (
        <MomentLayout nCuts={dailyMoment} />
      )}
    </S.Container>
  )
}

export default Moment
