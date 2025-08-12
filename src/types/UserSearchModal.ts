export type User = {
  userUuid: string
  profileUrl?: string
  nickname?: string
  name?: string
  isFollowing: boolean
}

export type UserSearchModalMode = 'search' | 'invite'

export type UserSearchModalProps =
  | {
      type: 'search'
      isOpen: boolean
      onClose: () => void
      initialKeyword?: string
      onSelect?: (user: User) => void
      pageSize?: number
    }
  | {
      type: 'invite'
      isOpen: boolean
      onClose: () => void
      onSelect: (user: User) => void
      users: (User & { isFollowing: true })[]
      initialKeyword?: string
      pageSize?: number
    }

export type UserSearchResponse = {
  totalPages: number
  userSearches: User[]
}
