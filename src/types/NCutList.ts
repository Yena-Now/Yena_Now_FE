export interface NCutList {
  totalPage: number
  ncuts: NCut[]
}

export interface NCut {
  userUuid: string
  profileUrl: string
  nickname: string
  ncutUuid: string
  thumbnailUrl: string
  ncutUrl: string
  likeCount: number
  relay: boolean
}
