import apiClient from '@api/client'
import type { AxiosResponse } from 'axios'
import type {
  EmailVerificationRequest,
  EmailVerifyRequest,
  EmailVerifyResponse,
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
} from '@/types/auth'
import { useAuthStore } from '@/store/authStore'
import { userAPI } from '@/api/user'

export const authAPI = {
  sendEmailVerification: async (
    email: EmailVerificationRequest,
  ): Promise<AxiosResponse<object>> => {
    const response = await apiClient.post('/users/verification-email', email, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
    const { setAuth } = useAuthStore.getState()
    const response = await apiClient.post('/auth/login', loginData, {
      withCredentials: true,
      skipAuth: true,
    })
    const { accessToken, userUuid, user } = response.data
    setAuth(accessToken, user ?? null)
    localStorage.setItem('userUuid', userUuid)
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    const me = await userAPI.getUserMeInfo()
    setAuth(accessToken, me)
    return response.data
  },

  logout: async () => {
    const { logout } = useAuthStore.getState()
    const response = await apiClient.post('/auth/logout')
    logout()
    localStorage.clear()
    delete apiClient.defaults.headers.common['Authorization']
    return response.data
  },

  sendResetEmailVerification: async (
    email: EmailVerificationRequest,
  ): Promise<AxiosResponse<object>> => {
    return await apiClient.post('/auth/verification-email', email, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  verifyResetEmail: async (
    req: EmailVerifyRequest,
  ): Promise<EmailVerifyResponse> => {
    const response = await apiClient.post('/auth/verify-email', req, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  },

  requestPasswordReset: async (
    email: EmailVerificationRequest,
  ): Promise<AxiosResponse<object>> => {
    return await apiClient.post('/auth/password', email, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}
