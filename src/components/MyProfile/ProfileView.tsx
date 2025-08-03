import { useState, useEffect } from 'react'
import { userAPI } from '@api/user'
import type { UserMeResponse } from '@/types/User'
import { useToast } from '@/hooks/useToast'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/MyProfile/ProfileViewStyle'
import * as T from '@styles/components/MyProfile/ProfileEditStyle'

const ProfileView = () => {
  const { error } = useToast()
  const [myInfo, setMyInfo] = useState<UserMeResponse | null>(null)

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const myData = await userAPI.getUserMeInfo()
        setMyInfo(myData)
        console.log(myData)
      } catch (err) {
        error('내 정보를 불러오는 데 실패했습니다.')
      }
    }
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
        <S.Content>{myInfo?.name}</S.Content>
      </T.Box>
      <T.Box>
        <S.Title>닉네임</S.Title>
        <S.Content>{myInfo?.nickname}</S.Content>
      </T.Box>
      <T.Box>
        <S.Title>전화번호</S.Title>
        <S.Content>
          {myInfo?.phoneNumber === '010-0000-0000' ? (
            <S.EmptyContent>미입력</S.EmptyContent>
          ) : (
            myInfo?.phoneNumber
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
    </T.Container>
  )
}

export default ProfileView
