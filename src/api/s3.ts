import apiClient from '@/api/client'
import type { S3UploadRequest, S3UploadResponse } from '@/types/s3'
import axios from 'axios'

export const s3API = {
  upload: async (request: S3UploadRequest): Promise<S3UploadResponse> => {
    console.log(
      'type:',
      request.type,
      'fileNmae:',
      request.file.name,
      'contentType:',
      request.file.type,
    )
    const response = await apiClient.post(
      '/s3/presigned-url',
      {
        type: request.type,
        fileName: request.file.name,
        contentType: request.file.type,
        relayUuid: request?.relayUuid || null,
        roomCode: request?.roomCode || null,
      },
      {
        withCredentials: true,
      },
    )
    console.log('response', response.data)
    const { uploadUrl, fileUrl } = response.data
    console.log('uploadUrl', uploadUrl)
    await axios.put(uploadUrl, request.file, {
      headers: {
        'Content-Type': request.file.type,
      },
      withCredentials: true,
    })
    console.log('fileUrl', fileUrl, typeof fileUrl)
    return fileUrl
  },
}
