import { useState } from 'react'
import ProfileEdit from '@components/MyProfile/ProfileEdit'
import ProfileView from '@components/MyProfile/ProfileView'

const MyProfileInfo: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const handleEdit = (): void => {
    setIsEdit(true)
  }
  return (
    <>{isEdit ? <ProfileEdit /> : <ProfileView handleEdit={handleEdit} />}</>
  )
}

export default MyProfileInfo
