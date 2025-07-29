import React, { useState } from 'react'
import UserSearchModal from '@components/Common/SearchModal'
import type { User } from '@/types/UserSearchModal'

const allUsers = Array.from({ length: 50 }, (_, i) => ({
  userUuid: `${i}`,
  profileUrl: '',
  nickname: `팔로잉유저${i}`,
  name: `이름${i}`,
  isFollow: true,
})) as (User & { isFollow: true })[] // ✅ 명시적으로 타입 단언

const UserSearchTestInvite: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<User[]>([])

  const handleSelect = (user: User) => {
    setSelected((prev) => [...prev, user])
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>Invite 모드 테스트</h2>
      <button onClick={() => setOpen(true)}>모달 열기</button>

      <UserSearchModal
        users={allUsers}
        isOpen={open}
        onClose={() => setOpen(false)}
        onSelect={handleSelect}
        type="invite"
      />

      <div style={{ marginTop: '20px' }}>
        <h3>선택된 유저:</h3>
        <ul>
          {selected.map((user) => (
            <li key={user.userUuid}>
              {user.nickname} ({user.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserSearchTestInvite
