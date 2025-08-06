export interface NCutDetail {
  ncutUuid: string
  ncutUrl: string
  userUuid: string
  nickname: string
  profileUrl: string
  content: string
  createdAt: string
  likeCount: number
  commentCount: number
  isRelay: boolean
  visibility: 'Public' | 'Follow' | 'Private'
  isMine: boolean
}
