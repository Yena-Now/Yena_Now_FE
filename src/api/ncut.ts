import type {
  CodeCreateRequest,
  CodeCreateResponse,
  SessionEnterRequest,
  SessionEnterResponse,
} from '@/types/ncut'
import apiClient from '@/api/client'

export const nCutAPI = {
  createSession: async (
    formData: CodeCreateRequest,
  ): Promise<CodeCreateResponse> => {
    const response = await apiClient.post('/film/code', formData, {
      withCredentials: true,
    })
    return response.data
  },
  enterSession: async (
    req: SessionEnterRequest,
  ): Promise<SessionEnterResponse> => {
    const response = await apiClient.post('/film/token', req, {
      withCredentials: true,
    })
    return response.data
  },
}
