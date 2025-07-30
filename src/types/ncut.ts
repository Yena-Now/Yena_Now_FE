export interface CodeCreateRequest {
  backgroundUrl: string
  takeCnt: number
  cutCnt: number
  timeLimit: number
}

export interface CodeCreateResponse {
  roomCode: string
  token: string
}

export interface SessionEnterRequest {
  roomCode: string
}

export interface SessionEnterResponse {
  token: string
}
