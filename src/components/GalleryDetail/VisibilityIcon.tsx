import React from 'react'
import { AiOutlineGlobal } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { MdOutlineLockPerson } from 'react-icons/md'

type VisibilityType = 'PUBLIC' | 'FOLLOW' | 'PRIVATE'

interface VisibilityIconProps {
  visibility: VisibilityType
}

const VisibilityIcon: React.FC<VisibilityIconProps> = ({ visibility }) => {
  switch (visibility) {
    case 'PUBLIC':
      return <AiOutlineGlobal title="공개" size={25} />
    case 'FOLLOW':
      return <FaUserFriends title="팔로우" size={25} />
    case 'PRIVATE':
      return <MdOutlineLockPerson title="비공개" size={25} />
    default:
      return null
  }
}

export default VisibilityIcon
