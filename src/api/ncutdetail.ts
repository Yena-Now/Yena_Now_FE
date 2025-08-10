import type {
  NCutDetailType,
  UpdateContentRequest,
  UpdateContentResponse,
  UpdateVisibilityRequest,
  UpdateVisibilityResponse,
  VisibilityType,
} from '@/types/NCutDetail'

import apiClient from './client'

export const nCutDetail = {
  getNCutDetail: async (ncutUuid: string): Promise<NCutDetailType> => {
    const res = await apiClient.get<NCutDetailType>(
      `/gallery/ncuts/${ncutUuid}`,
    )
    return res.data
  },

  updateNCut: async (
    ncutUuid: string,
    content: string,
  ): Promise<UpdateContentResponse> => {
    const reqBody: UpdateContentRequest = { content }
    const res = await apiClient.patch<UpdateContentResponse>(
      `/gallery/ncuts/${ncutUuid}/content`,
      reqBody,
    )
    return res.data
  },

  updateVisibility: async (
    ncutUuid: string,
    visibility: VisibilityType,
  ): Promise<UpdateVisibilityResponse> => {
    const reqBody: UpdateVisibilityRequest = { visibility }
    const res = await apiClient.patch<UpdateVisibilityResponse>(
      `/gallery/ncuts/${ncutUuid}/visibility`,
      reqBody,
    )
    return res.data
  },
  deleteNCut: async (ncutUuid: string) => {
    const res = await apiClient.delete(`/gallery/ncuts/${ncutUuid}`, {
      withCredentials: true,
    })
    return res.data
  },
}
