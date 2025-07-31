import apiClient from '@api/client'
import type { UserMeInfoEditRequest, UserMeResponse } from '@/types/User'

export const userAPI = {
  editUserMeInfo: async (
    requestData: UserMeInfoEditRequest,
  ): Promise<UserMeResponse> => {
    const response = await apiClient.patch('/users/me', requestData)
    return response
  },
}
