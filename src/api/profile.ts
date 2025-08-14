import apiClient from '@/api/client'
import type {
  Profile,
  FollowersResponse,
  FollowingsResponse,
} from '@/types/Profile'

type PageOpts = { page?: number; size?: number }
const toParams = (opts?: PageOpts) => ({
  params: {
    pageNum: opts?.page ?? 0,
    display: opts?.size ?? 20,
  },
})

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

  getMyFollowers: async (opts?: PageOpts): Promise<FollowersResponse> => {
    const res = await apiClient.get('/users/me/followers', toParams(opts))
    return res.data
  },
  getMyFollowings: async (opts?: PageOpts): Promise<FollowingsResponse> => {
    const res = await apiClient.get('/users/me/followings', toParams(opts))
    return res.data
  },

  getFollowers: async (
    userUuid: string,
    opts?: PageOpts,
  ): Promise<FollowersResponse> => {
    const res = await apiClient.get(
      `/users/${userUuid}/followers`,
      toParams(opts),
    )
    return res.data
  },
  getFollowings: async (
    userUuid: string,
    opts?: PageOpts,
  ): Promise<FollowingsResponse> => {
    const res = await apiClient.get(
      `/users/${userUuid}/followings`,
      toParams(opts),
    )
    return res.data
  },
}
