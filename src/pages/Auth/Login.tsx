import React, { useState } from 'react'
import Logo from '@components/Common/Logo'
import { Link } from 'react-router-dom'
import * as S from '@styles/pages/Auth/LoginStyle'
import * as T from '@styles/pages/Auth/AuthGlobalStyle'

const Login: React.FC = () => {
  return (
    <>
      <T.Layout>
        <T.SignupContainer>
          <Logo />
          <T.Input type="email" name="email" placeholder="이메일" />
          <T.Input type="email" name="email" placeholder="비밀번호" />
          <T.Button type="button">로그인</T.Button>
          <Link to="/signup">
            <T.Button type="button">회원가입</T.Button>
          </Link>
          <S.OptionSection>
            <S.AutoLoginBox>
              <S.CheckBox type="checkbox" id="autoLogin" />
              <S.Text htmlFor="autoLogin">자동 로그인</S.Text>
            </S.AutoLoginBox>
            <Link to="#">
              <S.PasswordButton>비밀번호 재설정</S.PasswordButton>
            </Link>
          </S.OptionSection>
          <S.Divider>또는</S.Divider>
          <T.Button type="button">구글로그인넣기</T.Button>
          <T.Button type="button">카카오로그인넣기</T.Button>
        </T.SignupContainer>
      </T.Layout>
    </>
  )
}

export default Login
