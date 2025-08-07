export interface LikeUser {
  userUuid: string
  name: string
  nickname: string
  profileUrl: string
}

export interface LikeStatus {
  isLiked: boolean
  likeCount: number
}

export interface LikeDetailResponse extends LikeStatus {
  likes: LikeUser[]
}
