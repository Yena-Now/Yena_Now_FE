import apiClient from '@/api/client'
import type { UserSearchResponse } from '@/types/UserSearchModal'

export const searchAPI = {
  search: async (keyword: string, pageNum = 0, display = 10) => {
    const res = await apiClient.get<UserSearchResponse>('/users/search', {
      params: { keyword, pageNum, display },
    })
    return res.data
  },
}
