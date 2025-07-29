import apiClient from './client'
import type { AxiosResponse } from 'axios'
import type {
  EmailVerificationRequest,
  EmailVerifyRequest,
  EmailVerifyResponse,
  NicknameVerificationRequest,
  NicknameVerificationResponse,
  SignupRequest,
  SignupResponse,
  NicknameVerificationResponse,
  LoginRequest,
  LoginResponse,
} from '@/types/auth'

export const authAPI = {
  sendEmailVerification: async (
    email: EmailVerificationRequest,
  ): Promise<AxiosResponse<object>> => {
    const response = await apiClient.post('/users/verification-email', email, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    return response
  },

  verifyEmail: async (
    req: EmailVerifyRequest,
  ): Promise<EmailVerifyResponse> => {
    const response = await apiClient.post('/users/verify-email', req, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
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

  login: async (loginData: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login', loginData)
    return response.data
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout')
    localStorage.removeItem('accessToken')
    return response.data
  },
}
