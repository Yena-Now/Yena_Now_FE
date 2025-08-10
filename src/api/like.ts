import apiClient from './client'
import type { LikeDetailResponse } from '@/types/Like'

export const likeAPI = {
  /** 좋아요 상태+목록 */
  getLikes: async (
    ncutUuid: string,
    pageNum = 0,
    display = 20,
  ): Promise<LikeDetailResponse> => {
    const { data } = await apiClient.get(`/gallery/ncuts/${ncutUuid}/likes`, {
      params: { pageNum, display },
    })
    return {
      isLiked: !!data.isLiked,
      likeCount:
        data.likeCount ?? (Array.isArray(data.likes) ? data.likes.length : 0),
      likes: Array.isArray(data.likes) ? data.likes : [],
    }
  },

  like: (ncutUuid: string) =>
    apiClient.post(`/gallery/ncuts/${ncutUuid}/likes`),
  unlike: (ncutUuid: string) =>
    apiClient.delete(`/gallery/ncuts/${ncutUuid}/likes`),
}
