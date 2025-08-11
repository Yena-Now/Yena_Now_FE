import type {
  Comment,
  CommentListResponse,
  // AddCommentRequest,
  // UpdateCommentRequest,
} from '@/types/Comment'
import apiClient from '@/api/client'

export const commentAPI = {
  getComments: async (ncutUuid: string): Promise<CommentListResponse> => {
    const res = await apiClient.get(`/gallery/ncuts/${ncutUuid}/comments`)
    return res.data
  },

  addComment: async (ncutUuid: string, content: string): Promise<Comment> => {
    const res = await apiClient.post(`/gallery/ncuts/${ncutUuid}/comments`, {
      content,
    })
    return res.data
  },

  updateComment: async (
    ncutUuid: string,
    commentUuid: string,
    content: string,
  ): Promise<Comment> => {
    const res = await apiClient.put(
      `/gallery/ncuts/${ncutUuid}/comments/${commentUuid}`,
      {
        content,
      },
    )
    return res.data
  },

  deleteComment: async (ncutUuid: string, commentUuid: string) => {
    const res = await apiClient.delete(
      `/gallery/ncuts/${ncutUuid}/comments/${commentUuid}`,
    )
    return res.data
  },
}
