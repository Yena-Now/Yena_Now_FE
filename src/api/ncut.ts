import { CodeCreateRequest, CodeCreateResponse } from '@/types/ncut'
import apiClient from '@/api/client'

export const nCutAPI = {
  createSession: async (formData: CodeCreateRequest): Promise<CodeCreateResponse> => {
    const response = await apiClient.post('/film/code', formData, {
      withCredentials: true,
    })
    return response.data
  }

}