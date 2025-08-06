import apiClient from '@/api/client'
import type { S3UploadRequest, S3UploadResponse } from '@/types/s3'
import axios from 'axios'

export const s3API = {
  upload: async (data: S3UploadRequest): Promise<S3UploadResponse> => {
    const response = await apiClient.post(
      '/s3/presigned-url',
      {
        type: data.type,
        fileName: data.file.name,
        contentType: data.file.type,
        relayUuid: data?.relayUuid || null,
        nCutUuid: data?.nCutUuid || null,
      },
      {
        withCredentials: true,
      },
    )

    const { uploadUrl, fileUrl } = response.data
    await axios.put(uploadUrl, data.file, {
      headers: {
        'Content-Type': data.file.type,
      },
      withCredentials: true,
    })

    return fileUrl
  },
}
