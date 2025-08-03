import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { UserMeResponse, UserMeInfoEditRequest } from '@/types/User'
import { useToast } from '@/hooks/useToast'
import { LuUpload } from 'react-icons/lu'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/MyProfile/ProfileEditStyle'
import { userAPI } from '@/api/user'

interface ProfileEditProps {
  myInfo: UserMeResponse
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ myInfo }) => {
  const navigate = useNavigate()
  const { error, success } = useToast()

  const [userData, setUserData] = useState<UserMeInfoEditRequest>({
    name: myInfo.name,
    nickname: myInfo.nickname,
    phoneNumber: myInfo.phoneNumber,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 값이 변경 필드만 patch 요청 전송
  const getPatchPayload = () => {
    const payload: Partial<UserMeInfoEditRequest> = {}

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
      await userAPI.editUserMeInfo(patchData)
      success('회원 정보 수정이 완료되었습니다.')
      navigate('/my-profile')
    } catch (err) {
      error('정보 수정에 실패했습니다.')
    }
  }

  return (
    <S.Container>
      <S.TitleText>회원 정보 수정</S.TitleText>
      <S.ProfileSection>
        <ProfileImage width="150" height="150" />
      </S.ProfileSection>
      <S.EditSection>
        <S.ImageEditButton>프로필 사진 수정</S.ImageEditButton>
        <LuUpload />
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
