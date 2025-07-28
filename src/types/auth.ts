export interface SignupRequest {
  email: string
  password: string
  nickname: string
  name?: string | null
  gender?: string | null
  birthdate?: string | null
  phoneNumber?: string | null
  profileUrl?: string | null
}

export interface SignupResponse {
  success: boolean
  message: string
  userUuid?: string
}

export interface NicknameVerificationResponse {
  isAvailable: boolean
  message: string
}
