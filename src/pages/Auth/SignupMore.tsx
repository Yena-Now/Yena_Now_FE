import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as S from '@styles/pages/Auth/AuthGlobalStyle'
import * as S2 from '@styles/pages/Auth/SignupMoreStyle'
import Logo from '@components/Common/Logo.tsx'

import defaultProfileImage from '/user_default_profile.png'
import ProfileImage from '@components/Common/ProfileImage'
import { IoShareOutline } from 'react-icons/io5'

const SignupMore: React.FC = () => {
  const location = useLocation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { email, password } = location.state as {
    email: string
    password: string
  }

  const [formData, setFormData] = useState({
    email,
    password,
    nickname: '',
    profileImage: defaultProfileImage as string,
    name: null,
    gender: null,
    birthDate: null,
    phoneNumber: null,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const verifyNickname = async (nickname: string) => {
    try {
      const response = await fetch(`/api/nickname/verify?nickname=${nickname}`)
      if (!response.ok) {
        throw new Error('닉네임 중복 확인 실패')
      }
      const data = await response.json()
      return data.isAvailable
    } catch (error) {
      console.error('닉네임 중복 확인 오류:', error)
      return false
    }
  }

  return (
    <S.Layout>
      <S.SignupContainer>
        <Logo />
        <ProfileImage
          src={formData.profileImage}
          width="160px"
          height="160px"
          alt="프로필 이미지"
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <S2.ProfileImageButton onClick={() => fileInputRef.current?.click()}>
          프로필 업로드 &nbsp; <IoShareOutline />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </S2.ProfileImageButton>
        <S2.Form onSubmit={handleSubmit}>
          <S2.Label htmlFor="nickname">닉네임</S2.Label>
          <S2.InputGroup>
            <S2.Input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
            <S2.NicknameVerifyButton
              type="button"
              onClick={async () => {
                const isAvailable = await verifyNickname(formData.nickname)
                if (isAvailable) {
                  alert('사용 가능한 닉네임입니다.')
                } else {
                  alert('이미 사용 중인 닉네임입니다.')
                }
              }}
              disabled={!formData.nickname}
            >
              중복 확인
            </S2.NicknameVerifyButton>
          </S2.InputGroup>
          <S2.Label htmlFor="name">이름</S2.Label>
          <S2.Input
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />
          <S2.Label>성별</S2.Label>
          <S2.GenderGroup>
            <label>
              <input
                type="radio"
                id="gender-male"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              남성
            </label>
            <label>
              <input
                type="radio"
                id="gender-female"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              여성
            </label>
          </S2.GenderGroup>
          <S2.Label htmlFor="birthDate">생년월일</S2.Label>
          <S2.Input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate || ''}
            onChange={handleChange}
          />
          <S2.Label htmlFor="phoneNumber">전화번호</S2.Label>
          <S2.Input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber || ''}
            onChange={handleChange}
          />
          <S2.Button type="submit">회원가입</S2.Button>
        </S2.Form>
      </S.SignupContainer>
    </S.Layout>
  )
}

export default SignupMore
