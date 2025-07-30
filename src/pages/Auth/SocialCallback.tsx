import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useToast } from '@hooks/useToast'

const SocialCallback: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { error } = useToast()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const nickname = searchParams.get('nickname')
    const profileUrl = searchParams.get('profileUrl')

    if (accessToken && nickname) {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('nickname', nickname)
      localStorage.setItem('profileUrl', profileUrl || '')
      window.dispatchEvent(new Event('authChange'))
      navigate('/gallery')
    } else {
      error('소셜 로그인에 실패했습니다.')
      navigate('/login')
    }
  }, [searchParams, navigate, error])

  return <div>로그인 처리중...</div>
}

export default SocialCallback
