import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { UserMeResponse } from '@/types/User'
import { IoIosArrowForward } from 'react-icons/io'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/MyProfile/ProfileViewStyle'
import * as T from '@styles/components/MyProfile/ProfileEditStyle'

interface ProfileViewProps {
  myInfo: UserMeResponse
  fetchMyInfo: () => void
}

const ProfileView: React.FC<ProfileViewProps> = ({ myInfo, fetchMyInfo }) => {
  const navigate = useNavigate()
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return ''

    const digits = phone.replace(/\D/g, '')
    if (digits === '01000000000') return '미입력'
    if (digits.length === 11) {
      const part1 = digits.slice(0, 3)
      const part2 = digits.slice(3, 7)
      const part3 = digits.slice(7, 11)
      return `${part1}-${part2}-${part3}`
    }
    return digits
  }

  useEffect(() => {
    fetchMyInfo()
  }, [])

  return (
    <T.Container>
      <T.TitleText>회원 정보</T.TitleText>
      <T.ProfileSection>
        <ProfileImage width="150" height="150" />
      </T.ProfileSection>
      <T.Box>
        <S.Title>이름</S.Title>
        <S.Content>
          {myInfo?.name ? myInfo.name : <S.EmptyContent>미입력</S.EmptyContent>}
        </S.Content>
      </T.Box>
      <T.Box>
        <S.Title>닉네임</S.Title>
        <S.Content>{myInfo?.nickname}</S.Content>
      </T.Box>
      <T.Box>
        <S.Title>전화번호</S.Title>
        <S.Content>
          {myInfo?.phoneNumber === '010-0000-0000' || !myInfo.phoneNumber ? (
            <S.EmptyContent>미입력</S.EmptyContent>
          ) : (
            formatPhoneNumber(myInfo?.phoneNumber)
          )}
        </S.Content>
      </T.Box>
      <T.Box>
        <S.Title>생년월일</S.Title>
        <S.Content>
          {myInfo?.birthdate === null ? (
            <S.EmptyContent>미입력</S.EmptyContent>
          ) : (
            myInfo?.birthdate
          )}
        </S.Content>
      </T.Box>
      <T.Box>
        <S.Title>성별</S.Title>
        <S.Content>
          {myInfo?.gender === null ? (
            <S.EmptyContent>미입력</S.EmptyContent>
          ) : myInfo?.gender === 'FEMALE' ? (
            '여성'
          ) : (
            '남성'
          )}
        </S.Content>
      </T.Box>
      <T.Box>
        <S.Title>이메일</S.Title>
        <S.Content>{myInfo?.email}</S.Content>
      </T.Box>
      <S.EditSection>
        <S.EditText onClick={() => navigate('/my-profile?edit')}>
          회원정보 수정 <IoIosArrowForward size={12} />
        </S.EditText>
      </S.EditSection>
    </T.Container>
  )
}

export default ProfileView
