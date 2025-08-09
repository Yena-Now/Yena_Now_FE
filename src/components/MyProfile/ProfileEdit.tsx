import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '@/api/user'
import { s3API } from '@/api/s3'
import type { UserMeResponse, UserMeInfoPatchRequest } from '@/types/User'
import { useToast } from '@/hooks/useToast'
import { validator } from '@/utils/validators'
import DatePicker from 'react-datepicker'
import { FiUpload } from 'react-icons/fi'
import { FaRegTrashCan } from 'react-icons/fa6'
import ProfileImage from '@components/Common/ProfileImage'
import OptionModal from '@components/Common/OptionModal'
import { IoIosArrowBack } from 'react-icons/io'
import defaultProfileImage from '/user_default_profile.png'
import * as S from '@styles/components/MyProfile/ProfileEditStyle'
import * as T from '@styles/components/MyProfile/ProfileViewStyle'

interface ProfileEditProps {
  myInfo: UserMeResponse
  fetchMyInfo: () => void
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ myInfo, fetchMyInfo }) => {
  const navigate = useNavigate()
  const { error, success, warning } = useToast()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isNickNameValid, setIsNickNameValid] = useState<boolean>(false)
  const [isNickNameChanged, setIsNickNameChanged] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null) // 프로필 사진을 눌렀을 때도 변경 로직 동작하도록

  // 1. 입력/수정
  const [userData, setUserData] = useState<UserMeInfoPatchRequest>({
    name: myInfo.name,
    nickname: myInfo.nickname,
    phoneNumber: myInfo.phoneNumber,
    birthdate: myInfo.birthdate,
    gender: myInfo.gender,
    profileUrl: myInfo.profileUrl,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  // 값이 변경 필드만 patch 요청 전송
  const getPatchPayload = () => {
    const payload = (
      Object.keys(userData) as (keyof UserMeInfoPatchRequest)[]
    ).reduce((acc, key) => {
      if (userData[key] !== myInfo[key]) {
        acc[key] = userData[key]
      }
      return acc
    }, {} as Partial<UserMeInfoPatchRequest>)
    return payload
  }

  const handleSubmit = async () => {
    if (isNickNameChanged && !isNickNameValid) {
      warning('닉네임 중복 확인이 필요합니다.')
      return
    }

    if (
      userData.phoneNumber &&
      !validator.isValidatePhoneNumber(userData.phoneNumber)
    ) {
      warning('전화번호 형식이 맞지 않습니다.')
      return
    }

    const patchData = getPatchPayload()
    try {
      await userAPI.patchUserMeInfo(patchData)
      console.log('patchData', patchData)
      if (patchData.nickname) {
        localStorage.setItem('nickname', patchData.nickname)
      }
      success('회원 정보 수정이 완료되었습니다.')
      navigate('/my-profile')
    } catch {
      error('정보 수정에 실패했습니다.')
    }
  }

  const deleteUser = async () => {
    try {
      await userAPI.deleteUser()
      success('회원 탈퇴가 완료되었습니다.')
    } catch {
      error('다시 시도해 주세요.')
    }
  }

  // 2. 닉네임 관련
  useEffect(() => {
    setIsNickNameChanged(myInfo.nickname !== userData.nickname)
  }, [userData.nickname, myInfo.nickname])

  const verifyNickname = async (nickname: string) => {
    try {
      const response = await userAPI.verifyNickname({ nickname })
      return !response.isDuplicated
    } catch {
      error('닉네임 중복 확인 오류')
      return false
    }
  }

  const handleNicknameVerify = async () => {
    const isAvailable = await verifyNickname(userData.nickname)
    if (userData.nickname.trim() === '') {
      warning('닉네임을 입력해주세요.')
      return false
    }
    setIsNickNameValid(isAvailable)
    if (isAvailable) {
      success('사용 가능한 닉네임입니다.')
    } else {
      warning('이미 사용 중인 닉네임입니다.')
    }
  }

  // 3. 이미지 관련
  const handleProfileImageClick = () => {
    fileInputRef.current?.click()
  }
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    } else {
      setImagePreview(URL.createObjectURL(file))
      const response = await s3API.upload({
        file,
        type: 'profile',
      })
      const fileUrl = response as unknown as string
      try {
        await userAPI.patchUserImage({ imageUrl: fileUrl })
        success('프로필 사진이 등록되었습니다.')
        localStorage.setItem('profileUrl', fileUrl)
        await fetchMyInfo()
      } catch {
        error('다시 시도해 주세요.')
      }
    }
  }

  const handleImageDelete = async () => {
    try {
      await userAPI.deleteUserImage()
      setImagePreview(null)
      localStorage.setItem('profileUrl', 'null')
      await fetchMyInfo()
      success('프로필 사진이 삭제되었습니다.')
    } catch {
      error('다시 시도해 주세요.')
    }
  }

  // 4. 생년월일
  const parseDate = (date: Date | null) => {
    setUserData((prev) => ({
      ...prev,
      birthdate: date ? date.toISOString().slice(0, 10) : '',
    }))
  }

  return (
    <S.Container>
      <S.TitleText>회원 정보 수정</S.TitleText>
      <S.ProfileSection>
        <ProfileImage
          width="150"
          height="150"
          src={
            imagePreview
              ? imagePreview
              : myInfo.profileUrl
                ? myInfo.profileUrl
                : defaultProfileImage
          }
          onClick={handleProfileImageClick}
        />
      </S.ProfileSection>
      <S.EditSection>
        <S.EditSubBox>
          <S.ImageChangeInput
            type="file"
            id="profile-change"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <S.ImageChangeText htmlFor="profile-change">
            사진 변경
            <S.ImageChangeIcon>
              <FiUpload />
            </S.ImageChangeIcon>
          </S.ImageChangeText>
        </S.EditSubBox>
        <S.EditSubBox>
          <S.ImageDeleteButton onClick={handleImageDelete}>
            사진 삭제
          </S.ImageDeleteButton>
          <S.ImageIcon>
            <FaRegTrashCan onClick={handleImageDelete} />
          </S.ImageIcon>
        </S.EditSubBox>
      </S.EditSection>
      <S.Box>
        <S.Label>
          <label htmlFor="name">이름</label>
        </S.Label>
        <S.Input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
      </S.Box>
      <S.Box>
        <S.Label>
          <label htmlFor="name">닉네임</label>
        </S.Label>
        <S.InputWrapper>
          <S.NickNameInput
            type="text"
            id="nickname"
            name="nickname"
            value={userData.nickname}
            onChange={handleChange}
          />
          <S.NickNameCheckButton
            onClick={handleNicknameVerify}
            disabled={!isNickNameChanged}
          >
            중복 확인
          </S.NickNameCheckButton>
        </S.InputWrapper>
      </S.Box>
      <S.Box>
        <S.Label>
          <label htmlFor="phone-number">전화번호</label>
        </S.Label>
        <S.Input
          type="text"
          id="phone-number"
          name="phoneNumber"
          placeholder="010-1234-5678"
          value={userData.phoneNumber}
          onChange={handleChange}
        />
      </S.Box>
      <S.Box>
        <S.Label>
          <label htmlFor="birthdate">생년월일</label>
        </S.Label>
        <S.DatePickerWrapper>
          <DatePicker
            selected={new Date(userData.birthdate)}
            onChange={(date) => parseDate(date)}
            dateFormat="yyyy-MM-dd"
            dateFormatCalendar="yyyy년 MM월"
            popperPlacement="bottom-start"
            maxDate={new Date()}
            customInput={<S.DatePicker />}
          />
        </S.DatePickerWrapper>
      </S.Box>
      <S.Box>
        <S.Label>
          <span>성별</span>
        </S.Label>
        <S.GenderBox>
          <S.GenderInput>
            <S.Input
              type="radio"
              id="gender-m"
              name="gender"
              checked={userData.gender === 'MALE'}
              value="MALE"
              onChange={handleChange}
            />
            <label htmlFor="gender-m">남자</label>
          </S.GenderInput>
          <S.GenderInput>
            <S.Input
              type="radio"
              id="gender-f"
              name="gender"
              checked={userData.gender === 'FEMALE'}
              value="FEMALE"
              onChange={handleChange}
            />
            <label htmlFor="gender-f">여자</label>
          </S.GenderInput>
        </S.GenderBox>
      </S.Box>
      <S.Box>
        <S.Label>
          <span>비밀번호</span>
        </S.Label>
        <S.PasswordChangeButton onClick={() => navigate('/change-password')}>
          비밀번호 변경
        </S.PasswordChangeButton>
      </S.Box>
      <S.Box>
        <S.GoBackSection>
          <T.EditText onClick={() => navigate('/my-profile')}>
            <IoIosArrowBack size={12} /> 돌아가기
          </T.EditText>
        </S.GoBackSection>
        <div>
          <S.DeleteButton onClick={() => setIsModalOpen(true)}>
            회원 탈퇴
          </S.DeleteButton>
          <S.EditButton onClick={handleSubmit}>수정</S.EditButton>
        </div>
      </S.Box>
      {isModalOpen && (
        <OptionModal
          title="계정을 삭제하면 모든 정보가 사라집니다. 계속 진행할까요?"
          onClose={handleModalClose}
        >
          <S.DeleteButton onClick={deleteUser}>탈퇴</S.DeleteButton>
          <S.EditButton onClick={handleModalClose}>취소</S.EditButton>
        </OptionModal>
      )}
    </S.Container>
  )
}

export default ProfileEdit
