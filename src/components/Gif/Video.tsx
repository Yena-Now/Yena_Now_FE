interface VideoProps {
  src: string
}
const Video: React.FC<VideoProps> = ({ src }) => {
  return (
    <div>
      <video
        src={`https://yenanow.s3.ap-northeast-2.amazonaws.com/${src}`}
        autoPlay
        loop
      ></video>
    </div>
  )
}

export default Video
