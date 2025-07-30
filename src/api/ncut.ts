import type { codeCreateResponse } from '@/types/ncut'
import apiClient from '@/api/client'

export const nCutAPI = {
  createSession: async (): Promise<codeCreateResponse> => {
    const response = await apiClient.post('/film/code', {}, {
      withCredentials: true,
    })
    return response.data
  }
}