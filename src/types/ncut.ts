export interface codeCreateResponse {
  roomCode: string;
  token: string;
}

export interface sessionEnterRequest {
  roomCode: string;
}

export interface sessionEnterResponse {
  token: string;
}