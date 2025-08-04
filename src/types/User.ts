export interface UserMeInfoPatchRequest {
  name: string
  nickname: string
  phoneNumber: string
}

export interface UserMeResponse {
  email: string
  name: string
  nickname: string
  gender: string
  birthdate: string
  phoneNumber: string
  profileUrl: string
}

export interface UserImagePatchRequest {
  imageUrl: string
}

export interface UserImagePatchResponse {
  imageUrl: string
}

export interface NicknameVerificationRequest {
  nickname: string
}

export interface NicknameVerificationResponse {
  isDuplicated: boolean
}
