import React, { useState } from 'react'
import Logo from '@components/Common/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '@/api/auth'
import { useToast } from '@/hooks/useToast'
import * as S from '@styles/pages/Auth/LoginStyle'
import * as T from '@styles/pages/Auth/AuthGlobalStyle'

import kakaoLogin from '@assets/Auth/kakao_login.png'

const Login: React.FC = () => {
  const { error } = useToast()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  // const [autoLogin, setAutoLogin] = useState<boolean>(false)

  const handleSubmit = async () => {
    if (email === '' && password === '') {
      error('이메일, 비밀번호를 입력해 주세요')
    }
    if (email && password === '') {
      error('비밀번호를 입력해 주세요')
    }
    if (password && email === '') {
      error('이메일을 입력해 주세요')
    }

    const submitData = {
      email,
      password,
    }

    try {
      const response = await authAPI.login(submitData)
      console.log('로그인 성공', response)
      navigate('/gallery')
    } catch (err) {
      console.log(err)
      error('로그인에 실패했습니다.')
    }
  }

  const handleKakaoLogin = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    window.location.href = `${BASE_URL}/oauth2/authorization/kakao`
  }

  return (
    <T.Layout>
      <T.SignupContainer>
        <Logo />
        <T.Input
          type="email"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <T.Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <S.OptionSection>
          <S.AutoLoginBox>
            <S.CheckBox
              type="checkbox"
              id="autoLogin"
              // onChange={() => setAutoLogin((prev) => !prev)}
            />
            <S.Text htmlFor="autoLogin">자동 로그인</S.Text>
          </S.AutoLoginBox>
          <Link to="/reset-password">
            <S.PasswordButton>비밀번호 재설정</S.PasswordButton>
          </Link>
        </S.OptionSection>
        <T.Button type="button" onClick={handleSubmit}>
          로그인
        </T.Button>
        <T.Button type="button" onClick={() => navigate('/signup')}>
          회원가입
        </T.Button>
        <S.Divider>또는</S.Divider>
        <T.Button type="button">구글로그인넣기</T.Button>
        <T.AuthLogin
          src={kakaoLogin}
          alt="카카오 로그인"
          onClick={handleKakaoLogin}
        />
        {/*<T.Button type="button" onClick={handleKakaoLogin}></T.Button>*/}
      </T.SignupContainer>
    </T.Layout>
  )
}

export default Login
