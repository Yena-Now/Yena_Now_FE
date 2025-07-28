import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as S from '@styles/pages/Auth/AuthGlobalStyle'
import * as S2 from '@styles/pages/Auth/SignupMoreStyle'
import Logo from '@components/Common/Logo'

import defaultProfileImage from '/user_default_profile.png'
import ProfileImage from '@components/Common/ProfileImage'

const SignupMore: React.FC = () => {
  const location = useLocation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { email, password } = location.state as {
    email: string
    password: string
  }

  const [formData, setFormData] = useState<{
    email: string
    password: string
    nickname: string
    profileImage: string
    name: string | null
    gender: string | null
    birthDate: string | null
    phoneNumber: string | null
  }>({
    email,
    password,
    nickname: '',
    profileImage: defaultProfileImage as string,
    name: null,
    gender: null,
    birthDate: null,
    phoneNumber: null,
  })

  const [formBirth, setFormBirth] = useState({
    birthYear: null,
    birthMonth: null,
    birthDay: null,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleBirthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormBirth({ ...formBirth, [e.target.name]: e.target.value })
  }

  const combineDate = (year: string, month: string, day: string) => {
    return `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormData((prev) => ({
      ...prev,
      birthDate: combineDate(
        formBirth.birthYear || '',
        formBirth.birthMonth || '',
        formBirth.birthDay || '',
      ),
    }))
    console.log('회원가입 정보:', formData)
    alert('회원가입 정보가 제출되었습니다.')
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
        <S2.Form onSubmit={handleSubmit}>
          <S2.InputGroup>
            <S2.Label htmlFor="nickname">닉네임</S2.Label>
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
          <S2.InputGroup>
            <S2.Label htmlFor="name">이름</S2.Label>
            <S2.Input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
            />
          </S2.InputGroup>
          <S2.InputGroup>
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
          </S2.InputGroup>
          <S2.InputGroup>
            <S2.Label htmlFor="birthDate">생년월일</S2.Label>
            <S2.Select
              name="birthYear"
              value={formBirth.birthYear || ''}
              onChange={handleBirthChange}
            >
              <option value="" disabled>
                YYYY
              </option>
              {Array.from(
                { length: new Date().getFullYear() - 1900 + 1 },
                (_, i) => new Date().getFullYear() - i,
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </S2.Select>

            <span>/</span>

            <S2.Select
              name="birthMonth"
              value={formBirth.birthMonth || ''}
              onChange={handleBirthChange}
            >
              <option value="" disabled>
                MM
              </option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </S2.Select>
            <span>/</span>

            <S2.Select
              name="birthDay"
              value={formBirth.birthDay || ''}
              onChange={handleBirthChange}
            >
              <option value="" disabled>
                DD
              </option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </S2.Select>
          </S2.InputGroup>
          <S2.InputGroup>
            <S2.Label htmlFor="phoneNumber">전화번호</S2.Label>
            <S2.Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              pattern="^\d{11}$"
              placeholder="01012345678"
              value={formData.phoneNumber || ''}
              onChange={handleChange}
            />
          </S2.InputGroup>
          <S2.Button type="submit">확인</S2.Button>
        </S2.Form>
      </S.SignupContainer>
    </S.Layout>
  )
}

export default SignupMore
