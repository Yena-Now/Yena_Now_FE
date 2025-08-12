export interface CodeCreateRequest {
  backgroundUrl: string
  takeCount: number
  cutCount: number
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
  backgroundUrl: string
  takeCount: number
  cutCount: number
  timeLimit: number
  cuts: string[]
}

export interface FrameCutResponse {
  frameUuid: string
  frameName: string
  frameUrl: string
  frameCut: number
  frameType: number
}

export interface MergeNCutRequest {
  roomCode: string
  frameUuid: string
  contentUrls: {
    contentUrl: string | null
    order: number
  }[]
}

export interface SaveNCutRequest {
  ncutUrl: string
  thumbnailUrl: string
  content: string
  visibility: 'PUBLIC' | 'PRIVATE' | 'FOLLOW'
  isRelay: boolean
}
