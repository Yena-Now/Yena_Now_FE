export interface NCutList {
  totalPage: number
  ncuts: NCut[]
}

export interface NCut {
  userUuid: string
  profileUrl: string
  nickname: string
  ncut_uuid: string
  thumbnailUrl: string
  ncutURL: string
  likeCount: number
  isRelay: boolean
  onClick: () => void
}
