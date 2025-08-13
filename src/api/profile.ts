import apiClient from '@/api/client'
import type { Profile } from '@/types/Profile'

export const profileAPI = {
  get: async (userUuid: string): Promise<Profile> => {
    const res = await apiClient.get(`/users/profile/${userUuid}`)
    return res.data
  },

  follow: async (userUuid: string) => {
    const res = await apiClient.post(`/users/${userUuid}/followers`)
    return res.data
  },

  unfollow: async (userUuid: string) => {
    const res = await apiClient.delete(`/users/${userUuid}/followers/me`)
    return res.data
  },
}
