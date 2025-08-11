export interface S3UploadRequest {
  file: File
  type: string
  relayUuid?: string
  roomCode?: string
}

export interface S3UploadResponse {
  uploadUrl: string
  fileUrl: string
}
