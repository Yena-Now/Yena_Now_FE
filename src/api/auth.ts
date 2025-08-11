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

export const authAPI = {
  sendEmailVerification: async (
    email: EmailVerificationRequest,
  ): Promise<AxiosResponse<object>> => {
    try {
      const response = await apiClient.post(
        '/users/verification-email',
        email,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return response
    } catch (err) {
      console.log(err)
      throw err
    }
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
    const response = await apiClient.post('/auth/login', loginData, {
      withCredentials: true,
    })
    apiClient.defaults.headers.common['Authorization'] =
      `Bearer ${response.data.accessToken}`
    return response.data
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout')
    localStorage.clear()
    delete apiClient.defaults.headers.common['Authorization']
    window.dispatchEvent(new Event('authChange'))
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
