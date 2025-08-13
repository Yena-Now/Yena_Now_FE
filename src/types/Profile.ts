export type Gender = 'MALE' | 'FEMALE'

export interface Profile {
  name?: string | null
  nickname: string
  gender?: Gender
  profileUrl?: string | null
  followingCount: number
  followerCount: number
  totalCut: number
  mine: boolean
  following: boolean
}
