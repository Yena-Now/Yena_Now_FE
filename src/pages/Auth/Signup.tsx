import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from '@styles/pages/Auth/AuthGlobalStyle'
import Logo from '@components/Common/Logo'

const Signup: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [emailVerified, setEmailVerified] = useState(false)
  const [emailVerificationCode, setEmailVerificationCode] = useState('')

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleEmailVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmailVerificationCode(e.target.value)
  }

  const handleEmailVerify = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!isValidEmail(form.email)) {
      alert('유효한 이메일 주소를 입력해주세요.')
      return
    }
    setEmailVerified(true)
    alert(`이메일 인증 요청: ${form.email}`)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('회원가입 요청!')
    navigate('/signup/more', {
      state: { email: form.email, password: form.password },
    })
  }

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isValidPassword = (password: string) => password.length >= 8
  const isValidPasswordConfirm = (pw: string, pwc: string) => pw === pwc

  const isFormValid =
    isValidEmail(form.email) &&
    isValidPassword(form.password) &&
    isValidPasswordConfirm(form.password, form.passwordConfirm)

  return (
    <S.Layout>
      <S.SignupContainer>
        <Logo />
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
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
            disabled={!isValidEmail(form.email)}
            onClick={handleEmailVerify}
          >
            이메일 인증
          </S.Button>
          {emailVerified && (
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
                onClick={() => {
                  if (emailVerificationCode === '123456') {
                    alert('이메일 인증 성공!')
                  } else {
                    alert('인증 코드가 올바르지 않습니다.')
                  }
                }}
              >
                확인
              </S.EmailVerifyButton>
            </S.EmailVerifyContainer>
          )}

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
    </S.Layout>
  )
}

export default Signup
