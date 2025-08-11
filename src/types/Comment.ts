export interface Comment {
  commentUuid: string
  comment: string
  userUuid: string
  nickname: string
  profileUrl: string
  createdAt: string
  ncutUuid: string
}

export interface CommentListResponse {
  totalPage: number
  comments: Comment[]
}

export interface AddCommentRequest {
  content: string
}

export type UpdateCommentRequest = AddCommentRequest
