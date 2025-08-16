import React, { useEffect, useState } from 'react'
import type { UserListItemProps, UserListProps } from '@/types/UserList'
import { IoIosClose } from 'react-icons/io'
import ProfileImage from '@components/Common/ProfileImage'
import * as S from '@styles/components/Common/FollowModalStyle'
import { profileAPI } from '@/api/profile'
import { useNavigate } from 'react-router-dom'

type ListType = 'followings' | 'followers'

const UserListItem: React.FC<
  UserListItemProps & {
    toggleFollow: () => void
    onClickUser: () => void
    isMe?: boolean
  }
> = ({ user, toggleFollow, onClickUser, isMe }) => (
  <S.UserListItem>
    <ProfileImage
      src={user.profileUrl || undefined}
      alt={user.nickname}
      width="80px"
      height=""
      onClick={onClickUser}
    />
    <S.UserItem>
      <S.UserItemBox onClick={onClickUser}>
        <S.UserNickName>{user.nickname}</S.UserNickName>
        {user.name && <S.UserName>{user.name}</S.UserName>}
      </S.UserItemBox>
      <S.UserItemButton
        isMe={isMe}
        onClick={toggleFollow}
        isFollowing={user.isFollowing}
      >
        {user.isFollowing ? '팔로잉' : '팔로우'}
      </S.UserItemButton>
    </S.UserItem>
  </S.UserListItem>
)

type ExtraProps = {
  onDeltaFollowing?: (delta: number) => void
  listType: ListType
}

const UserFollowListModal: React.FC<UserListProps & ExtraProps> = ({
  users: initialUsers,
  onClose,
  isOpen,
  title,
  onDeltaFollowing,
  listType,
}) => {
  const [users, setUsers] = useState(initialUsers)
  const navigate = useNavigate()

  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])

  const toggleFollow = async (userUuid: string | null | undefined) => {
    if (!userUuid) return
    const before =
      users.find((u) => u.userUuid === userUuid)?.isFollowing ?? false
    setUsers((prev) =>
      prev.map((u) =>
        u.userUuid === userUuid ? { ...u, isFollowing: !u.isFollowing } : u,
      ),
    )
    try {
      if (before) await profileAPI.unfollow(userUuid)
      else await profileAPI.follow(userUuid)
      onDeltaFollowing?.(before ? -1 : +1)
    } catch {
      setUsers((prev) =>
        prev.map((u) =>
          u.userUuid === userUuid ? { ...u, isFollowing: before } : u,
        ),
      )
    }
  }

  const goProfile = (userUuid: string | null | undefined) => {
    if (!userUuid) return
    onClose()
    navigate(`/profile/${userUuid}`)
  }

  if (!isOpen) return null

  const emptyMessage =
    listType === 'followings'
      ? '팔로잉 목록이 없습니다.'
      : '팔로워 목록이 없습니다.'

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
        {users.length === 0 ? (
          <S.EmptyState>{emptyMessage}</S.EmptyState>
        ) : (
          <S.UserList>
            {users.map((user) => (
              <UserListItem
                key={user.userUuid}
                user={user}
                isMe={user.userUuid === localStorage.getItem('userUuid')}
                toggleFollow={() => toggleFollow(user.userUuid)}
                onClickUser={() => goProfile(user.userUuid)}
              />
            ))}
          </S.UserList>
        )}
      </S.ModalContainer>
    </S.Layout>
  )
}

export default UserFollowListModal
