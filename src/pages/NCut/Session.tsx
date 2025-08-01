import {
  LocalVideoTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
} from 'livekit-client'
import React, { useState } from 'react'
import { useToast } from '@hooks/useToast'
import VideoComponent from '@components/NCut/VideoComponent'
import AudioComponent from '@components/NCut/AudioComponent'
import { nCutAPI } from '@/api/ncut'

type TrackInfo = {
  trackPublication: RemoteTrackPublication;
  participantIdentity: string;
};

const APPLICATION_SERVER_URL = import.meta.env.VITE_API_BASE_URL
const LIVEKET_URL = import.meta.env.VITE_LIVEKIT_URL
alert(LIVEKET_URL)

export const Session: React.FC = () => {
  const localParticipantIdentity = localStorage.getItem('nickname') || 'Anonymous'

  const {error} = useToast();
  const [room, setRoom] = useState<Room| undefined>(undefined);
  const [localTrack, setLocalTrack] = useState<LocalVideoTrack | undefined>(undefined)
  const [remoteTracks, setRemoteTracks] = useState<TrackInfo[]>([]);

  const [roomCode, setRoomCode] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState(
    "https://cdn.pixabay.com/photo/2016/11/29/09/08/abstract-1868652_1280.jpg"
  )
  const [takeCnt, setTakeCnt] = useState(4)
  const [cutCnt, setCutCnt] = useState(4)
  const [timeLimit, setTimeLimit] = useState(15)

  const connectToRoom = async (token: string) => {
    const newRoom = new Room()
    setRoom(newRoom)

    newRoom.on(
      RoomEvent.TrackSubscribed,
      (
        _track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: RemoteParticipant
      ) => {
        setRemoteTracks((prevTracks) => [
          ...prevTracks,
          {
            trackPublication: publication,
            participantIdentity : participant.identity,
          }
        ])
      }
    )

    newRoom.on(
      RoomEvent.TrackUnsubscribed,
      (
        _track: RemoteTrack,
        publication: RemoteTrackPublication
      ) => {
        setRemoteTracks((prevTracks) =>
          prevTracks.filter(
            (trackInfo) => trackInfo.trackPublication !== publication
          )
        )
      }
    )

    try {
      await newRoom.connect(LIVEKET_URL, token)
      await newRoom.localParticipant.enableCameraAndMicrophone()

      const publication = newRoom.localParticipant.videoTrackPublications
        .values()
        .next().value
      setLocalTrack(publication?.videoTrack)
    } catch (err){
      error(`${err}`)
      await leaveRoom();
    }
  }

  const handleCreateRoom = async () => {
    try {
      const response = await nCutAPI.createSession();

      setRoomCode(response.roomCode); // UI 표시를 위해 방 코드 저장
      await connectToRoom(response.token);
    } catch (error) {
      console.error(error);
      alert((error as Error).message);
    }
  };

  /**
   * '참여하기' 버튼 클릭 시 호출되는 함수
   */
  const handleJoinRoom = async () => {
    if (!roomCode.trim()) {
      alert("방 코드를 입력해주세요.");
      return;
    }

    const AUTH_TOKEN = localStorage.getItem("accessToken");

    try {
      const response = await fetch(APPLICATION_SERVER_URL + "/film/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`, // 인증 헤더 추가
        },
        body: JSON.stringify({ roomCode: roomCode }),
      });

      console.log(response)

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          `토큰 발급 실패: ${error.message || response.statusText}`
        );
      }

      const data = await response.json();
      await connectToRoom(data.token);
    } catch (error) {
      console.error(error);
      alert((error as Error).message);
    }
  };

  /**
   * 방을 나가는 함수
   */
  async function leaveRoom() {
    await room?.disconnect();

    // 모든 상태 초기화
    setRoom(undefined);
    setLocalTrack(undefined);
    setRemoteTracks([]);
    setRoomCode("");
  }

  const renderJoinUI = () => (
    <div id="join">
      <div
        id="join-dialog"
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        {/* 방 만들기 섹션 */}
        <div className="join-section">
          <h2>새로운 방 만들기</h2>
          <p>새로운 방을 만들고 코드를 공유하세요.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateRoom();
            }}
          >
            <button type="submit" className="btn btn-lg btn-success">
              방 만들기
            </button>
          </form>
        </div>

        <hr />

        {/* 방 참여하기 섹션 */}
        <div className="join-section">
          <h2>기존 방 참여하기</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleJoinRoom();
            }}
          >
            <div>
              <label htmlFor="room-code">방 코드</label>
              <input
                id="room-code"
                className="form-control"
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="참여할 방 코드를 입력하세요"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-primary"
              disabled={!roomCode.trim()}
            >
              참여하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderRoomUI = () => (
    <div id="room">
      <div id="room-header">
        <h2 id="room-title">방 코드: {roomCode}</h2>
        <button
          className="btn btn-danger"
          id="leave-room-button"
          onClick={leaveRoom}
        >
          나가기
        </button>
      </div>
      <div id="layout-container">
        {localTrack && (
          <VideoComponent
            track={localTrack}
            participantIdentity={localParticipantIdentity || "나"}
            local={true}
          />
        )}
        {remoteTracks.map((remoteTrack) =>
          remoteTrack.trackPublication.kind === "video" ? (
            <VideoComponent
              key={remoteTrack.trackPublication.trackSid}
              track={remoteTrack.trackPublication.videoTrack!}
              participantIdentity={remoteTrack.participantIdentity}
            />
          ) : (
            <AudioComponent
              key={remoteTrack.trackPublication.trackSid}
              track={remoteTrack.trackPublication.audioTrack!}
            />
          )
        )}
      </div>
    </div>
  );

  return <>{!room ? renderJoinUI() : renderRoomUI()}</>
}

export default Session;