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
