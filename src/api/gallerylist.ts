import apiClient from '@/api/client'
import type { NCutList } from '@/types/NCutList'

export const galleryAPI = {
  getPublicGalleryList: async (pageNumber: number): Promise<NCutList> => {
    const { data } = await apiClient.get<NCutList>(
      `/gallery/public?pageNum=${pageNumber}`,
    )
    return data
  },

  getFollowGalleryList: async (pageNumber: number): Promise<NCutList> => {
    const { data } = await apiClient.get<NCutList>(
      `/gallery/followings?pageNum=${pageNumber}`,
    )
    return data
  },
  getMyGalleryList: async (pageNumber: number): Promise<NCutList> => {
    const { data } = await apiClient.get<NCutList>(
      `/gallery/me?pageNum=${pageNumber}`,
    )
    return data
  },
  getUserGalleryList: async (
    userUuid: string,
    pageNumber: number,
  ): Promise<NCutList> => {
    const { data } = await apiClient.get<NCutList>(
      `/gallery/${userUuid}?pageNum=${pageNumber}`,
    )
    return data
  },
}
