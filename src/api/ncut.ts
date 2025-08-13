import type {
  CodeCreateRequest,
  CodeCreateResponse,
  FrameCutResponse,
  MergeNCutRequest,
  SaveNCutRequest,
  SessionEnterRequest,
  SessionEnterResponse,
} from '@/types/ncut'
import apiClient from '@/api/client'

export const nCutAPI = {
  createSession: async (
    formData: CodeCreateRequest,
  ): Promise<CodeCreateResponse> => {
    const response = await apiClient.post('/openvidu/code', formData, {
      withCredentials: true,
    })
    return response.data
  },

  enterSession: async (
    req: SessionEnterRequest,
  ): Promise<SessionEnterResponse> => {
    const response = await apiClient.post('/openvidu/token', req, {
      withCredentials: true,
    })
    return response.data
  },

  getFrames: async (frameCut: number): Promise<FrameCutResponse[]> => {
    const response = await apiClient.get(`/film/frames?frameCut=${frameCut}`)
    return response.data
  },

  mergeNCut: async (
    request: MergeNCutRequest,
  ): Promise<{
    resultUrl: string
  }> => {
    const response = await apiClient.post('/film/merge', request, {
      withCredentials: true,
    })
    return response.data
  },

  saveNCut: async (request: SaveNCutRequest) => {
    const response = await apiClient.post('/gallery/ncuts', request)
    return response.data
  },
}
