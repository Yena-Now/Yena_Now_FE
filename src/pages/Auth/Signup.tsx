import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from '@styles/pages/Auth/AuthGlobalStyle'
import Logo from '@components/Common/Logo'
import { authAPI } from '@/api/auth'
import { useToast } from '@hooks/useToast'

const Signup: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [emailVerified, setEmailVerified] = useState(false)
  const [emailVerificationCode, setEmailVerificationCode] = useState('')
  const [emailCodeVerified, setEmailCodeVerified] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { success, error, info } = useToast()

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === 'email') {
      if (value && !isValidEmail(value)) {
        setErrorMessage('유효한 이메일 주소를 입력해주세요.')
      } else {
        setErrorMessage('')
      }
    } else if (name === 'password') {
      if (value && !isValidPassword(value)) {
        setErrorMessage(
          '비밀번호는 8~16자로 설정해야 합니다.\n영문 대소문자와 숫자, 특수문자(@$!%*?&#)를 포함할 수 있습니다.',
        )
      } else {
        setErrorMessage('')
      }
    } else if (name === 'passwordConfirm') {
      if (value && !isValidPasswordConfirm(form.password, value)) {
        setErrorMessage('비밀번호가 일치하지 않습니다.')
      } else {
        setErrorMessage('')
      }
    } else {
      setErrorMessage('')
    }
  }

  const handleEmailVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmailVerificationCode(e.target.value)
  }

  const verifyEmailCode = async (email: string, code: string) => {
    try {
      const response = await authAPI.verifyEmail({ email, code })
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
    if (!isValidEmail(form.email)) {
      error('유효한 이메일 주소를 입력해주세요.')
      return
    }
    try {
      const isVerified = await verifyEmailCode(
        form.email,
        emailVerificationCode,
      )
      if (isVerified) {
        success('이메일 인증 성공!')
      } else {
        error('인증 코드가 올바르지 않습니다.')
      }
    } catch {
      error('이메일 인증 코드 검증 실패')
    }
  }

  const handleEmailVerify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response = await authAPI.sendEmailVerification({
        email: form.email,
      })
      if (response.status === 204) {
        info('인증 코드가 이메일로 전송되었습니다.')
        setEmailVerified(true)
      } else if (response.status === 401) {
        error('이미 인증된 이메일입니다.')
      }
    } catch {
      error('이메일 인증 요청에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('/signup/more', {
      state: { email: form.email, password: form.password },
    })
  }

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isValidPassword = (password: string) =>
    password.length >= 8 &&
    password.length <= 16 &&
    /[a-zA-Z]/.test(password) &&
    /\d/.test(password)
  const isValidPasswordConfirm = (pw: string, pwc: string) => pw === pwc

  const isFormValid =
    isValidEmail(form.email) &&
    isValidPassword(form.password) &&
    isValidPasswordConfirm(form.password, form.passwordConfirm)

  return (
    <S.Layout>
      <S.SignupContainer>
        <S.LogoWrapper>
          <Logo />
        </S.LogoWrapper>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <S.Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일"
          />
          <S.Button
            type="button"
            disabled={!isValidEmail(form.email) || emailVerified}
            onClick={handleEmailVerify}
          >
            이메일 인증
          </S.Button>
          <S.EmailVerifyContainer>
            <S.EmailVerifyInput
              type="text"
              name="emailVerificationCode"
              value={emailVerificationCode}
              onChange={handleEmailVerificationCodeChange}
              placeholder="인증 코드"
            />
            <S.EmailVerifyButton
              type="button"
              onClick={handleEmailVerifyCode}
              disabled={!emailVerified || emailCodeVerified}
            >
              확인
            </S.EmailVerifyButton>
          </S.EmailVerifyContainer>

          <S.Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
          />
          <S.Input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            value={form.passwordConfirm}
            onChange={handleChange}
          />
          <S.Button type="submit" disabled={!isFormValid}>
            회원 정보 입력
          </S.Button>
        </form>
      </S.SignupContainer>
      {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
    </S.Layout>
  )
}

export default Signup
