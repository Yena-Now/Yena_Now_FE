import apiClient from '@/api/client'
import type { NCutList } from '@/types/NCutList'

export const galleryAPI = {
  getPublicGalleryList: async (): Promise<NCutList> => {
    const { data } = await apiClient.get<NCutList>('/gallery/public')
    return data
  },

  getFollowGalleryList: async (): Promise<NCutList> => {
    const { data } = await apiClient.get<NCutList>('/gallery/followings')
    return data
  },
  getMyGalleryList: async (): Promise<NCutList> => {
    const { data } = await apiClient.get<NCutList>('/gallery/me')
    return data
  },
  getUserGalleryList: async (userUuid: string): Promise<NCutList> => {
    const { data } = await apiClient.get<NCutList>(`/gallery/${userUuid}`)
    return data
  },
}
