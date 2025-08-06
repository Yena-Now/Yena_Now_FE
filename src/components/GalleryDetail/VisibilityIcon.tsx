import React from 'react'
import { AiOutlineGlobal } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { MdOutlineLockPerson } from 'react-icons/md'

type VisibilityType = 'Public' | 'Follow' | 'Private'

interface VisibilityIconProps {
  visibility: VisibilityType
}

const VisibilityIcon: React.FC<VisibilityIconProps> = ({ visibility }) => {
  switch (visibility) {
    case 'Public':
      return <AiOutlineGlobal title="공개" size={25} />
    case 'Follow':
      return <FaUserFriends title="팔로우" size={25} />
    case 'Private':
      return <MdOutlineLockPerson title="비공개" size={25} />
    default:
      return null
  }
}

export default VisibilityIcon
