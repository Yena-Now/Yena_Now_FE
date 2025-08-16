import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authAPI } from '@/api/auth'
import { userAPI } from '@/api/user'
import { s3API } from '@/api/s3'
import { useToast } from '@hooks/useToast'
import type { SignupRequest } from '@/types/auth'
import { validator } from '@/utils/validators'
import ProfileImage from '@components/Common/ProfileImage'
import Logo from '@components/Common/Logo'
import defaultProfileImage from '/user_default_profile.png'
import * as S from '@styles/pages/Auth/AuthGlobalStyle'
import * as S2 from '@styles/pages/Auth/SignupMoreStyle'

const SignupMore: React.FC = () => {
  const { success, error, warning } = useToast()
  const location = useLocation()
  const navigate = useNavigate()
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { email, password } = location.state as {
    email: string
    password: string
  }
  const [formData, setFormData] = useState<SignupRequest>({
    email,
    password,
    nickname: '',
    profileUrl: null,
    name: null,
    gender: null,
    birthdate: null,
    phoneNumber: null,
  })

  const [formBirth, setFormBirth] = useState({
    birthYear: '',
    birthMonth: '',
    birthDay: '',
  })
  const [fileUrl, setFileUrl] = useState<string | null>(null) // 서버 전송용
  const [selectedImage, setSelectedImage] = useState<File | null>(null) // 미리보기용

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedImage(file)
    setFileUrl(null)
  }

  const previewObjectUrl = React.useMemo(() => {
    if (!selectedImage) return undefined
    return URL.createObjectURL(selectedImage)
  }, [selectedImage])

  useEffect(() => {
    return () => {
      if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl)
    }
  }, [previewObjectUrl])

  const previewUrl = fileUrl ?? previewObjectUrl ?? defaultProfileImage

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e.target.name === 'phoneNumber') {
      const numbers = e.target.value.replace(/[^0-9]/g, '')

      const limitedNumbers = numbers.slice(0, 11)

      let formattedValue = ''
      if (limitedNumbers.length <= 3) {
        formattedValue = limitedNumbers
      } else if (limitedNumbers.length <= 7) {
        formattedValue = `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`
      } else {
        formattedValue = `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`
      }
      setFormData({ ...formData, phoneNumber: formattedValue })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleBirthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormBirth({ ...formBirth, [e.target.name]: e.target.value })
  }

  const combineDate = (year: string, month: string, day: string) => {
    const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    return date === '--' ? null : date
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const birthDate = combineDate(
      formBirth.birthYear || '',
      formBirth.birthMonth || '',
      formBirth.birthDay || '',
    )
    if (!isNicknameValid) {
      error('닉네임 중복 확인을 해주세요.')
      return
    }

    if (
      formData.phoneNumber &&
      !validator.isValidateSignUpPhoneNumber(formData.phoneNumber)
    ) {
      warning('전화번호 형식이 맞지 않습니다.')
      return
    }

    setIsUploading(true)
    let uploadedUrl: string | null = null
    try {
      if (selectedImage) {
        uploadedUrl = await s3API.uploadSignup({ file: selectedImage })
        setFileUrl(uploadedUrl)
      }
    } catch {
      setIsUploading(false)
      error('이미지 업로드에 실패했습니다.')
      return
    }

    const submitData = {
      ...formData,
      birthdate: birthDate,
      profileUrl: uploadedUrl,
    }

    // 회원가입 요청 보내는 부분
    const result = await authAPI.signup(submitData)
    if (result.userUuid) {
      await authAPI.login({
        email: submitData.email,
        password: submitData.password,
      })
      setIsUploading(false)
      navigate('/gallery')
      return
    } else {
      setIsUploading(false)
      error('회원가입에 실패했습니다.')
      return {
        success: false,
        message: '회원가입에 실패했습니다.',
      }
    }
  }

  // 닉네임
  const verifyNickname = async (nickname: string) => {
    try {
      const response = await userAPI.verifyNickname({ nickname })
      return !response.isDuplicated
    } catch {
      error('닉네임 중복 확인 오류')
      return false
    }
  }

  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false)

  useEffect(() => {
    setIsNicknameValid(false)
  }, [formData.nickname])

  const handleNicknameVerify = async () => {
    const isAvailable = await verifyNickname(formData.nickname)
    setIsNicknameValid(isAvailable)
    if (isAvailable) {
      success('사용 가능한 닉네임입니다.')
    } else {
      error('이미 사용 중인 닉네임입니다.')
    }
  }

  return (
    <S.Layout>
      <S.SignupContainer>
        <S.LogoWrapper>
          <Logo />
        </S.LogoWrapper>
        <S2.ProfileImageWrapper>
          <ProfileImage
            src={previewUrl}
            width="100px"
            height="100px"
            alt="프로필 이미지"
            onClick={() => fileInputRef.current?.click()}
          />
        </S2.ProfileImageWrapper>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <S2.Form onSubmit={handleSubmit}>
          <S2.InputContainer>
            <S2.NicknameWrapper>
              <S2.Label htmlFor="nickname">닉네임*</S2.Label>
              <S2.Input
                type="text"
                id="nickname"
                name="nickname"
                placeholder="닉네임"
                value={formData.nickname}
                onChange={handleChange}
              />
              <S2.NicknameVerifyButtonWrapper>
                <S2.NicknameVerifyButton
                  type="button"
                  onClick={handleNicknameVerify}
                  disabled={!formData.nickname}
                >
                  중복 확인
                </S2.NicknameVerifyButton>
              </S2.NicknameVerifyButtonWrapper>
            </S2.NicknameWrapper>
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
                placeholder="010-1234-5678"
                value={formData.phoneNumber || ''}
                onChange={handleChange}
              />
            </S2.InputGroup>
            <S2.ButtonWrapper>
              <S2.Button type="submit" disabled={isUploading}>
                확인
              </S2.Button>
            </S2.ButtonWrapper>
          </S2.InputContainer>
        </S2.Form>
      </S.SignupContainer>
    </S.Layout>
  )
}

export default SignupMore
