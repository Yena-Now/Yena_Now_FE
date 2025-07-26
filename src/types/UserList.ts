type User = {
  userUuid: string | null | undefined
  profileUrl?: string | undefined
  nickname?: string
  name?: string | null | undefined
  isFollowing?: boolean | undefined
}

export type UserListItemProps = {
  user: User
  onClick?: () => void
  toggleFollow?: () => void
}

export type UserListProps = {
  users: User[]
  onClose: () => void
  isOpen: boolean
  title: string
}
