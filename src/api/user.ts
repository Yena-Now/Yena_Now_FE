import apiClient from '@api/client'
import type {
  UserMeInfoPatchRequest,
  UserMeResponse,
  UserImagePatchRequest,
  UserImagePatchResponse,
  NicknameVerificationRequest,
  NicknameVerificationResponse,
  ChangePasswordRequest,
} from '@/types/User'
import { useAuthStore } from '@/store/authStore'

export const userAPI = {
  patchUserMeInfo: async (
    requestData: Partial<UserMeInfoPatchRequest>,
  ): Promise<UserMeResponse> => {
    const response = await apiClient.patch('/users/me', requestData)
    return response.data
  },

  getUserMeInfo: async (): Promise<UserMeResponse> => {
    const response = await apiClient.get('/users/me')
    return response.data
  },

  patchUserImage: async (
    requestData: UserImagePatchRequest,
  ): Promise<UserImagePatchResponse> => {
    const response = await apiClient.patch('/users/image', requestData)
    return response.data
  },

  deleteUserImage: async (): Promise<void> => {
    await apiClient.delete('/users/image')
  },

  deleteUser: async (): Promise<void> => {
    const { logout } = useAuthStore.getState()
    await apiClient.delete('/users/me')
    logout()
    localStorage.clear()
  },

  verifyNickname: async (
    nickname: NicknameVerificationRequest,
  ): Promise<NicknameVerificationResponse> => {
    const response = await apiClient.post('/users/nickname', nickname, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  },

  changePassword: async (requestData: ChangePasswordRequest): Promise<void> => {
    await apiClient.patch('/users/password', requestData)
  },
}
