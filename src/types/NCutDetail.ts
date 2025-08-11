export type VisibilityType = 'PUBLIC' | 'FOLLOW' | 'PRIVATE'

export interface NCutDetailType {
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
  visibility: VisibilityType
  isMine: boolean
}

export interface UpdateVisibilityRequest {
  visibility: VisibilityType
}

export interface UpdateVisibilityResponse {
  ncutUuid: string
  visibility: VisibilityType
  updatedAt: string
}

export interface UpdateContentRequest {
  content: string
}

export interface UpdateContentResponse {
  ncutUuid: string
  content: string
  updatedAt: string
}
