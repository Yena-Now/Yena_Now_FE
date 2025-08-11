import axios, { AxiosError } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import type { TokenReissueResponse } from '@/types/auth'
import { useAuthStore } from '@/store/authStore'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// 리프레시 중인지 플래그 + 대기열
let isRefreshing = false
let subscribers: Array<(token: string) => void> = []

const onTokenRefreshed = (token: string) => {
  subscribers.forEach((cb) => cb(token))
  subscribers = []
}
const addSubscriber = (cb: (token: string) => void) => subscribers.push(cb)

// 리프레시 요청은 Authorization 없이 인터셉터도 없는 별도 인스턴스
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // 이미 만료된 토큰을 넣을 필요x
})

export const reissueToken = async (): Promise<TokenReissueResponse> => {
  const { data } = await refreshClient.post('/auth/tokens')
  return data
}

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState()
    if (!config.url?.includes('/auth/tokens') && accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { logout, setAuth } = useAuthStore.getState()

    const status = error.response?.status
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined

    if (!originalRequest || !(status === 401 || status === 403))
      return Promise.reject(error)

    // 리프레시 요청 자체가 401이면 더 이상 시도하지 않고 로그아웃
    if (originalRequest.url?.includes('/auth/tokens')) {
      logout()
      window.location.href = '/login'
      return Promise.reject(error)
    }

    // 이미 재시도헌 요청은 그대로 실패
    if (originalRequest._retry) {
      return Promise.reject(error)
    }
    originalRequest._retry = true

    try {
      if (!isRefreshing) {
        isRefreshing = true
        const { accessToken } = await reissueToken()
        // 전역 상태 갱신
        setAuth(accessToken, null)
        // 기본 헤더 갱신
        apiClient.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`
        isRefreshing = false
        onTokenRefreshed(accessToken)

        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
        return apiClient(originalRequest) // 즉시 재시도 (첫 요청이 대기 안 함)
      }

      // 리프레시 중이면 큐에 넣고 끝나면 재시도
      return new Promise((resolve, reject) => {
        addSubscriber((newToken: string) => {
          try {
            originalRequest.headers = originalRequest.headers ?? {}
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`
            resolve(apiClient(originalRequest))
          } catch (e) {
            reject(e)
          }
        })
      })
    } catch (e) {
      isRefreshing = false
      logout()
      window.location.href = '/login'
      return Promise.reject(e)
    }
  },
)

export default apiClient
