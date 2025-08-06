import apiClient from '@/api/client'

export const uploadImage = async (file: File | null): Promise<string> => {
  try {
    if (!file) throw new Error('No file provided for upload')

    const response = await apiClient.post('/s3/presigned-url', {
      fileName: file.name,
      contentType: file.type,
    })

    // const { presignedUrl, fileUrl } = response.data

    // await apiClient.put(presignedUrl, file, {
    //   headers: {
    //     'Content-Type': file.type,
    //   },
    // })

    // return fileUrl
    return response.data.fileUrl
  } catch (error) {
    console.error('Image upload failed:', error)
    throw new Error('Image upload failed')
  }
}
