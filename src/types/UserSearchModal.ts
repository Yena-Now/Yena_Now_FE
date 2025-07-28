export type User = {
  userUuid: string
  profileUrl?: string
  nickname?: string
  name?: string
  isFollow: boolean
}

export type UserSearchModalMode = 'search' | 'invite'

export type UserSearchModalProps =
  | {
      type: 'search'
      users: User[] // 모든 유저
      isOpen: boolean
      onClose: () => void
      onSelect?: never
    }
  | {
      type: 'invite'
      users: (User & { isFollow: true })[] // 팔로우된 유저만
      isOpen: boolean
      onClose: () => void
      onSelect: (user: User) => void
    }
