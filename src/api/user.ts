import apiClient from '@api/client'
import type { UserMeInfoEditRequest, UserMeResponse } from '@/types/User'

export const userAPI = {
  editUserMeInfo: async (
    requestData: Partial<UserMeInfoEditRequest>,
  ): Promise<UserMeResponse> => {
    const response = await apiClient.patch('/users/me', requestData)
    return response.data
  },

  getUserMeInfo: async (): Promise<UserMeResponse> => {
    try {
      const response = await apiClient.get('/users/me')
      return response.data
    } catch (err) {
      console.log('내 정보 가져오기 실패', err)
      throw err
    }
  },
}
