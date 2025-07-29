import axios from 'axios'
import type { TokenReissueResponse } from '@/types/auth'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // refreshToken 전송
})

// 토큰 재발급
const reissueToken = async (): Promise<TokenReissueResponse> => {
  const response = await apiClient.post('/auth/tokens')
  console.log('reissueToken', response)
  return response.data
}

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response?.status === 401 &&
      !originalRequest._retry && // 재발급 요청 실패 flag 변수
      error.config.url !== '/auth/tokens' // 재발급 요청이 실패해서 다시 토큰 재발급으로 보내는 요청 방지
    ) {
      originalRequest._retry = true
      try {
        const { accessToken } = await reissueToken() // 401일 경우 토큰 재발급
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
        localStorage.setItem('accessToken', accessToken)
        return apiClient(originalRequest)
      } catch (err) {
        // 재발급 요청 실패 시 토큰 삭제 및 로그인 페이지로 리다이렉트
        console.log('토큰 재발급 실패', err)
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

export default apiClient
