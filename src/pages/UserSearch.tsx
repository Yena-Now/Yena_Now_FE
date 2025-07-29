import React, { useState } from 'react'
import UserSearchModal from '@components/Common/SearchModal'
import type { User } from '@/types/UserSearchModal'

const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  userUuid: `${i}`,
  profileUrl: '',
  nickname: `유저${i}`,
  name: `이름${i}`,
  isFollow: Math.random() > 0.5,
}))

const UserSearchTestSearch: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ padding: '40px' }}>
      <h2>Search 모드 테스트</h2>
      <button onClick={() => setOpen(true)}>모달 열기</button>
      <UserSearchModal
        users={mockUsers}
        isOpen={open}
        onClose={() => setOpen(false)}
        type="search"
      />
    </div>
  )
}

export default UserSearchTestSearch
