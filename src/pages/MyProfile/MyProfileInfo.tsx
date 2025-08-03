import { useEffect, useState } from 'react'
import { userAPI } from '@api/user'
import type { UserMeResponse } from '@/types/User'
import { useToast } from '@/hooks/useToast'
import ProfileEdit from '@components/MyProfile/ProfileEdit'
import ProfileView from '@components/MyProfile/ProfileView'

const MyProfileInfo: React.FC = () => {
  const { error } = useToast()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [myInfo, setMyInfo] = useState<UserMeResponse | null>(null)

  const handleEdit = (): void => {
    setIsEdit(true)
  }

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
    <>
      {myInfo && (
        <>
          {isEdit ? (
            <ProfileEdit myInfo={myInfo} />
          ) : (
            <ProfileView myInfo={myInfo} handleEdit={handleEdit} />
          )}
        </>
      )}
    </>
  )
}

export default MyProfileInfo
