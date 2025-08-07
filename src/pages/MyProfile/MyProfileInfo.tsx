import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { userAPI } from '@api/user'
import type { UserMeResponse } from '@/types/User'
import { useToast } from '@/hooks/useToast'
import ProfileEdit from '@components/MyProfile/ProfileEdit'
import ProfileView from '@components/MyProfile/ProfileView'

const MyProfileInfo: React.FC = () => {
  const [searchParams] = useSearchParams()
  const { error } = useToast()
  const isEdit = searchParams.has('edit')
  const [myInfo, setMyInfo] = useState<UserMeResponse | null>(null)

  const fetchMyInfo = useCallback(async () => {
    try {
      const myData = await userAPI.getUserMeInfo()
      setMyInfo(myData)
    } catch {
      error('내 정보를 불러오는 데 실패했습니다.')
    }
  }, [])

  useEffect(() => {
    fetchMyInfo()
  }, [])

  return (
    <>
      {myInfo && (
        <>
          {isEdit ? (
            <ProfileEdit myInfo={myInfo} />
          ) : (
            <ProfileView myInfo={myInfo} fetchMyInfo={fetchMyInfo} />
          )}
        </>
      )}
    </>
  )
}

export default MyProfileInfo
