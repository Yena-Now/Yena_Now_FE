import apiClient from '@/api/client'
import type { NCutList } from '@/types/NCutList'

export const galleryAPI = {
  getPublicGalleryList: async (): Promise<NCutList> => {
    try {
      const { data } = await apiClient.get<NCutList>('/gallery/public')
      return data
    } catch (error) {
      console.error('[PublicGalleryList] Error:', error)
      throw error
    }
  },

  getFollowGalleryList: async (): Promise<NCutList> => {
    try {
      const { data } = await apiClient.get<NCutList>('/gallery/followings')
      return data
    } catch (error) {
      console.error('[FollowGalleryList] Error:', error)
      throw error
    }
  },
}
