export interface SignupRequest {
  email: string
  password: string
  nickname: string
  name?: string | null
  gender?: string | null
  birthdate?: string | null
  phoneNumber?: string | null
  profileUrl: string | null
}

export interface SignupResponse {
  accessToken: string
  userUuid: string
  nickname: string
  profileUrl: string
}

export interface EmailVerificationRequest {
  email: string
}

export interface EmailVerifyRequest {
  email: string
  code: string
}

export interface EmailVerifyResponse {
  verified: boolean
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

export type TokenReissueResponse = Pick<LoginResponse, 'accessToken'>
