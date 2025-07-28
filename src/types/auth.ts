export interface SignupRequest {
  email: string
  password: string
  nickname: string
  name?: string | null
  gender?: string | null
  birthdate?: string | null
  phoneNumber?: string | null
  profileUrl: string
}

export interface SignupResponse {
  accessToken: string
  userUuid: string
  nickname: string
  profileUrl: string
}

export interface NicknameVerificationResponse {
  isAvailable: boolean
  message: string
}
