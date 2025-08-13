import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useToast } from '@hooks/useToast'
import { useAuthStore } from '@/store/authStore'
import apiClient from '@/api/client'
import { userAPI } from '@/api/user'

const SocialCallback: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { error } = useToast()
  const setAuth = useAuthStore((s) => s.setAuth)

  useEffect(() => {
    ;(async () => {
      try {
        const accessToken = searchParams.get('accessToken')
        if (!accessToken) {
          throw new Error('토큰 없음')
        }
        setAuth(accessToken, null)
        apiClient.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`
        const me = await userAPI.getUserMeInfo()
        setAuth(accessToken, me)
        navigate('/gallery', { replace: true })
      } catch {
        error('소셜 로그인에 실패했습니다.')
        navigate('/login', { replace: true })
      }
    })()
  }, [searchParams, navigate, error, setAuth])

  return <div>로그인 처리중...</div>
}

export default SocialCallback
