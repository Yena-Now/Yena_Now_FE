export type Gender = 'MALE' | 'FEMALE'

export interface Profile {
  name: string
  nickname: string
  gender: Gender
  profileUrl: string
  followingCount: number
  followerCount: number
  totalCut: number
  mine: boolean
  following: boolean
}

export interface FollowUser {
  userUuid: string
  name: string
  nickname: string
  profileUrl?: string
  isFollowing: boolean
}

export interface FollowingsResponse {
  totalPages: number
  followings: FollowUser[]
}

export interface FollowersResponse {
  totalPages: number
  followers: FollowUser[]
}
