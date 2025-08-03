import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '@/api/user'
import type { UserMeResponse, UserMeInfoPatchRequest } from '@/types/User'
import { useToast } from '@/hooks/useToast'
import { FiUpload } from 'react-icons/fi'
import { FaRegTrashCan } from 'react-icons/fa6'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/MyProfile/ProfileEditStyle'

interface ProfileEditProps {
  myInfo: UserMeResponse
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ myInfo }) => {
  const navigate = useNavigate()
  const { error, success } = useToast()
  const [userData, setUserData] = useState<UserMeInfoPatchRequest>({
    name: myInfo.name,
    nickname: myInfo.nickname,
    phoneNumber: myInfo.phoneNumber,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 값이 변경 필드만 patch 요청 전송
  const getPatchPayload = () => {
    const payload: Partial<UserMeInfoPatchRequest> = {}

    if (myInfo.name !== userData.name) {
      payload.name = userData.name
    }

    if (myInfo.nickname !== userData.nickname) {
      payload.nickname = userData.nickname
    }

    if (myInfo.phoneNumber !== userData.phoneNumber) {
      payload.phoneNumber = userData.phoneNumber
    }
    return payload
  }

  const handleSubmit = async () => {
    const patchData = getPatchPayload()
    try {
      await userAPI.patchUserMeInfo(patchData)
      success('회원 정보 수정이 완료되었습니다.')
      navigate('/my-profile')
    } catch (err) {
      error('정보 수정에 실패했습니다.')
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    } else {
      return
    }

    // 프로필 사진 등록 api 호출
  }

  const handleImageDelete = () => {
    // 프로필 사진 삭제 api 호출
  }

  return (
    <S.Container>
      <S.TitleText>회원 정보 수정</S.TitleText>
      <S.ProfileSection>
        <ProfileImage
          width="150"
          height="150"
          src={imagePreview ? imagePreview : myInfo.profileUrl}
        />
      </S.ProfileSection>
      <S.EditSection>
        <S.EditSubBox>
          <S.ImageChangeInput
            type="file"
            id="profile-change"
            accept="image/*"
            onChange={handleImageChange}
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
          <FaRegTrashCan />
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
        <S.Input
          type="text"
          id="nickname"
          name="nickname"
          value={userData.nickname}
          onChange={handleChange}
        />
      </S.Box>
      <S.Box>
        <S.Label>
          <label htmlFor="phone-number">전화번호</label>
        </S.Label>
        <S.Input
          type="text"
          id="phone-number"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleChange}
        />
      </S.Box>
      <S.Box>
        <S.Label>
          <label htmlFor="birthdate">생년월일</label>
        </S.Label>
        <S.Input type="text" id="birthdate" value={myInfo.birthdate} />
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
              name="gender-select"
              checked={myInfo.gender === 'MALE'}
            />
            <label htmlFor="gender-m">남자</label>
          </S.GenderInput>
          <S.GenderInput>
            <S.Input
              type="radio"
              id="gender-f"
              name="gender-select"
              checked={myInfo.gender === 'FEMALE'}
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
        <div></div>
        <div>
          <S.DeleteButton>회원 탈퇴</S.DeleteButton>
          <S.EditButton onClick={handleSubmit}>수정</S.EditButton>
        </div>
      </S.Box>
    </S.Container>
  )
}

export default ProfileEdit
