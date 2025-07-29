import React, { useState } from 'react'

import * as S from '@styles/pages/Auth/AuthGlobalStyle'
import Logo from '@components/Common/Logo'
import { authAPI } from '@/api/auth'
import { useToast } from '@hooks/useToast'
import { Link } from 'react-router-dom'

const ResetPassword: React.FC = () => {
  const { success, error, info } = useToast()
  const [email, setEmail] = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [emailVerificationCode, setEmailVerificationCode] = useState('')
  const [emailCodeVerified, setEmailCodeVerified] = useState(false)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmailVerificationCode(e.target.value)
  }

  const handleEmailVerify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response = await authAPI.sendResetEmailVerification({
        email,
      })
      if (response.status === 204) {
        info('인증 코드가 이메일로 전송되었습니다.')
        setEmailVerified(true)
      } else if (response.status === 401) {
        error('존재하지 않는 이메일입니다.')
      }
    } catch {
      error('이메일 인증 요청에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const verifyEmailCode = async (email: string, code: string) => {
    try {
      const response = await authAPI.verifyResetEmail({ email, code })
      if (response.verified) {
        setEmailCodeVerified(true)
      }
      return response.verified
    } catch {
      error('이메일 인증 코드 검증 실패')
      throw new Error('이메일 인증 코드 검증에 실패했습니다.')
    }
  }

  const handleEmailVerifyCode = async () => {
    if (!emailVerified) {
      info('이메일 인증을 먼저 완료해주세요.')
      return
    }
    try {
      const isVerified = await verifyEmailCode(email, emailVerificationCode)
      if (isVerified) {
        success('이메일 인증 성공!')
      } else {
        error('인증 코드가 올바르지 않습니다.')
      }
    } catch {
      error('이메일 인증 코드 검증 실패')
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      error('이메일을 입력해주세요.')
      return
    }
    try {
      await authAPI.requestPasswordReset({ email })
      success('임시 비밀번호를 이메일로 전송했습니다.')
    } catch {
      error('임시 비밀번호 발급에에 실패했습니다.')
    }
  }

  return (
    <S.Layout>
      <S.SignupContainer>
        <Logo />
        <S.Input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={handleEmailChange}
        />
        <S.Button onClick={handleEmailVerify} disabled={emailVerified}>
          이메일 인증
        </S.Button>
        <S.EmailVerifyContainer>
          <S.EmailVerifyInput
            type="text"
            placeholder="인증 코드를 입력하세요"
            value={emailVerificationCode}
            onChange={handleVerificationCodeChange}
          />
          <S.EmailVerifyButton
            onClick={handleEmailVerifyCode}
            disabled={!emailVerified || emailCodeVerified}
          >
            인증 코드 확인
          </S.EmailVerifyButton>
        </S.EmailVerifyContainer>
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '40px',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            {emailCodeVerified && (
              <S.Button onClick={handleResetPassword}>
                임시 비밀번호 발급
              </S.Button>
            )}
          </div>
        </div>
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              color: '#000',
              fontSize: '0.8rem',
            }}
          >
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </S.SignupContainer>
    </S.Layout>
  )
}

export default ResetPassword
