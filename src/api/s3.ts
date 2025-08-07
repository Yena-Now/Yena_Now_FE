import apiClient from '@/api/client'
import type { S3UploadRequest, S3UploadResponse } from '@/types/s3'
import axios from 'axios'

export const s3API = {
  upload: async (request: S3UploadRequest): Promise<S3UploadResponse> => {
    const response = await apiClient.post(
      '/s3/presigned-url',
      {
        type: request.type,
        fileName: request.file.name,
        contentType: request.file.type,
        relayUuid: request?.relayUuid || null,
        nCutUuid: request?.nCutUuid || null,
      },
      {
        withCredentials: true,
      },
    )

    const { uploadUrl, fileUrl } = response.data
    await axios.put(uploadUrl, request.file, {
      headers: {
        'Content-Type': request.file.type,
      },
      withCredentials: true,
    })

    return fileUrl
  },
}
