import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useToast } from '@hooks/useToast'

const KakaoCallback: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { error } = useToast()

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      localStorage.setItem('accessToken', token)
      window.dispatchEvent(new Event('authChange'))
      navigate('/gallery')
    } else {
      error('카카오 로그인에 실패했습니다.')
      navigate('/login')
    }
  }, [searchParams, navigate, error])

  return <div>로그인 처리중...</div>
}

export default KakaoCallback
