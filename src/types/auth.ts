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

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  userUuid: string
  nickname: string
  profileUrl: string
}
