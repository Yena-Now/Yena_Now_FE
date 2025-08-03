import { LuUpload } from 'react-icons/lu'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/MyProfile/ProfileEditStyle'

const ProfileEdit: React.FC = () => {
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
        <S.Input type="text" id="name" />
      </S.Box>
      <S.Box>
        <S.Label>
          <label htmlFor="name">닉네임</label>
        </S.Label>
        <S.Input type="text" id="nickname" />
      </S.Box>
      <S.Box>
        <S.Label>
          <label htmlFor="phone-number">전화번호</label>
        </S.Label>
        <S.Input type="text" id="phone-number" />
      </S.Box>
      <S.Box>
        <S.Label>
          <label htmlFor="birthdate">생년월일</label>
        </S.Label>
        <S.Input type="text" id="birthdate" />
      </S.Box>
      <S.Box>
        <S.Label>
          <span>성별</span>
        </S.Label>
        <S.GenderBox>
          <S.GenderInput>
            <S.Input type="radio" id="gender-m" name="gender-select" />
            <label htmlFor="gender-m">남자</label>
          </S.GenderInput>
          <S.GenderInput>
            <S.Input type="radio" id="gender-f" name="gender-select" />
            <label htmlFor="gender-f">여자</label>
          </S.GenderInput>
        </S.GenderBox>
      </S.Box>
      <S.Box>
        <S.Label>
          <span>비밀번호</span>
        </S.Label>
        <S.PasswordChangeButton>비밀번호 변경</S.PasswordChangeButton>
      </S.Box>
      <S.Box>
        <div></div>
        <div>
          <S.DeleteButton>회원 탈퇴</S.DeleteButton>
          <S.EditButton>수정</S.EditButton>
        </div>
      </S.Box>
    </S.Container>
  )
}

export default ProfileEdit
