import apiClient from '@/api/client'
import type {
  S3UploadRequest,
  S3UploadResponse,
  S3UploadSignupRequest,
} from '@/types/s3'
import axios from 'axios'

export const s3API = {
  upload: async (request: S3UploadRequest): Promise<S3UploadResponse> => {
    const response = await apiClient.post(
      '/s3/presigned-url',
      {
        type: request.type,
        fileName: request.file.name,
        contentType: request.file.type,
        roomCode: request?.roomCode || null,
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

  uploadSignup: async (request: S3UploadSignupRequest): Promise<string> => {
    const response = await apiClient.post(
      '/users/signup/profile-url',
      {
        fileName: request.file.name,
        contentType: request.file.type,
      },
      { withCredentials: true },
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
