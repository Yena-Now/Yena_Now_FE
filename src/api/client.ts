import axios, { AxiosError } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import type { TokenReissueResponse } from '@/types/auth'
import { useAuthStore } from '@/store/authStore'

declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuth?: boolean
  }
}

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

const AUTH_FREE_PATHS = [
  '/auth/tokens',
  '/oauth2/authorization',
  '/auth/callback',
  '/signup',
  '/reset-password',
]

const isAuthFree = (url?: string) =>
  !!url && AUTH_FREE_PATHS.some((p) => url.includes(p))

// 리프레시 요청은 Authorization 없이. 인터셉터도 없는 별도 인스턴스
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export const reissueToken = async (): Promise<TokenReissueResponse> => {
  const { data } = await refreshClient.post(
    '/auth/tokens',
    {},
    { skipAuth: true },
  )
  return data
}

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.skipAuth || isAuthFree(config.url)) return config

    const { accessToken } = useAuthStore.getState()
    if (accessToken) {
      config.headers = config.headers ?? {}
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

    if (!error.response) return Promise.reject(error)

    const status = error.response.status
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined

    if (!originalRequest) return Promise.reject(error)

    if (originalRequest.skipAuth || isAuthFree(originalRequest.url)) {
      return Promise.reject(error)
    }

    if (!(status === 401 || status === 403)) {
      return Promise.reject(error)
    }

    // 이미 재시도한 요청은 그대로 실패
    if (originalRequest._retry) {
      return Promise.reject(error)
    }
    originalRequest._retry = true

    try {
      if (!isRefreshing) {
        isRefreshing = true
        const { accessToken } = await reissueToken()
        setAuth(accessToken, null)
        apiClient.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`
        isRefreshing = false
        onTokenRefreshed(accessToken)

        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
        return apiClient(originalRequest)
      }

      // 리프레시 중이면 큐에 넣고, 완료되면 재시도
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
