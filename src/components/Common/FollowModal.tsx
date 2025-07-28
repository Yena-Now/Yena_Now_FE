import React, { useEffect, useState } from 'react'
import type { UserListItemProps, UserListProps } from '@/types/UserList'
import { IoIosClose } from 'react-icons/io'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/Common/FollowModalStyle'

const UserListItem: React.FC<
  UserListItemProps & { toggleFollow: () => void }
> = ({ user, toggleFollow }) => (
  <S.UserListItem>
    <ProfileImage
      src={user.profileUrl}
      alt={user.nickname}
      height="80px"
      width="80px"
      onClick={() => {}}
    />
    <S.UserItem>
      <S.UserItemBox>
        <S.UserNickName>{user.nickname}</S.UserNickName>
        {user.name && <S.UserName>{user.name}</S.UserName>}
      </S.UserItemBox>
      <S.UserItemButton onClick={toggleFollow} isFollowing={user.isFollowing}>
        {user.isFollowing ? 'Following' : 'Follow'}
      </S.UserItemButton>
    </S.UserItem>
  </S.UserListItem>
)

const UserFollowListModal: React.FC<UserListProps> = ({
  users: initialUsers,
  onClose,
  isOpen,
  title,
}) => {
  const [users, setUsers] = useState(initialUsers)

  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])

  const toggleFollow = (userUuid: string | null | undefined) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userUuid === userUuid
          ? { ...user, isFollowing: !user.isFollowing }
          : user,
      ),
    )
  }

  if (!isOpen) return null

  return (
    <S.Layout>
      <S.Overlay onClick={onClose} />
      <S.ModalContainer>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.CloseButton onClick={onClose}>
            <IoIosClose />
          </S.CloseButton>
        </S.Header>
        <S.UserList>
          {users.map((user) => (
            <UserListItem
              key={user.userUuid}
              user={user}
              toggleFollow={() => toggleFollow(user.userUuid)}
            />
          ))}
        </S.UserList>
      </S.ModalContainer>
    </S.Layout>
  )
}

export default UserFollowListModal
