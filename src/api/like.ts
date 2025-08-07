import type { LikeStatus, LikeDetailResponse } from '@/types/Like'
import apiClient from '@/api/client'

export const likeAPI = {
  getLikes: async (ncutUuid: string): Promise<LikeDetailResponse> => {
    const res = await apiClient.get(`/gallery/ncuts/${ncutUuid}/likes`)
    return res.data
  },

  like: async (ncutUuid: string) => {
    const res = await apiClient.post<LikeStatus>(
      `/gallery/ncuts/${ncutUuid}/likes`,
    )
    return res.data
  },

  unlike: async (ncutUuid: string) => {
    const res = await apiClient.delete<LikeStatus>(
      `/gallery/ncuts/${ncutUuid}/likes`,
    )
    return res.data
  },
}
