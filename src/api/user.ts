import apiClient from '@api/client'
import type {
  UserMeInfoPatchRequest,
  UserMeResponse,
  UserImagePatchRequest,
  UserImagePatchResponse,
  NicknameVerificationRequest,
  NicknameVerificationResponse,
} from '@/types/User'

export const userAPI = {
  patchUserMeInfo: async (
    requestData: Partial<UserMeInfoPatchRequest>,
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

  patchUserImage: async (
    requestData: UserImagePatchRequest,
  ): Promise<UserImagePatchResponse> => {
    try {
      const response = await apiClient.patch('/users/image', requestData)
      return response.data
    } catch (err) {
      console.log('이미지 변경 실패', err)
      throw err
    }
  },

  deleteUserImage: async (): Promise<void> => {
    try {
      await apiClient.delete('/users/image')
    } catch (err) {
      console.log('프로필 사진 삭제 실패', err)
      throw err
    }
  },

  deleteUser: async (): Promise<void> => {
    try {
      await apiClient.delete('/users/me')
    } catch (err) {
      console.log('회원 탈퇴 실패', err)
      throw err
    }
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
}
