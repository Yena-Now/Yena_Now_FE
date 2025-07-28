import apiClient from './client'
import type {
  SignupRequest,
  SignupResponse,
  NicknameVerificationResponse,
} from '@/types/auth'

export const authAPI = {
  verifyNickname: async (
    nickname: string,
  ): Promise<NicknameVerificationResponse> => {
    const response = await apiClient.get('/nickname/verify', {
      params: { nickname },
    })
    return response.data
  },

  signup: async (signupData: SignupRequest): Promise<SignupResponse> => {
    const formData = new FormData()

    Object.entries(signupData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString())
      }
    })

    const response = await apiClient.post('/users/signup', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })

    return response.data
  },

  login: async (email: string, password: string) => {
    const response = await apiClient.post(
      '/auth/login',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return response.data
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout')
    localStorage.removeItem('accessToken')
    return response.data
  },
}
