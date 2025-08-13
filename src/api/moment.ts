import apiClient from '@api/client'
import type { RankingResponse } from '@/types/moment'

export const momentAPI = {
  getDailyMoment: async (): Promise<RankingResponse> => {
    const response = await apiClient.get('/gallery/ranking/daily')
    return response.data
  },

  getWeeklyMoment: async (): Promise<RankingResponse> => {
    const response = await apiClient.get('/gallery/ranking/weekly')
    return response.data
  },
}
