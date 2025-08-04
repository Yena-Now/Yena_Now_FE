import React from 'react'
import { LocalVideoTrack } from 'livekit-client'
import VideoComponent from '@components/NCut/VideoComponent'
import { useDragAndDrop } from '@hooks/useDragAndDrop'

interface DraggableVideoContainerProps {
  localTrack: LocalVideoTrack
  participantIdentity: string
  canvasPosition: { x: number; y: number }
  canvasSize: { width: number; height: number }
  setCanvasPosition: (pos: { x: number; y: number }) => void
}

export const DraggableVideoContainer: React.FC<
  DraggableVideoContainerProps
> = ({
  localTrack,
  participantIdentity,
  canvasPosition,
  canvasSize,
  setCanvasPosition,
}) => {
  const { isDragging, handleMouseDown, handleMouseMove, handleMouseUp } =
    useDragAndDrop()

  return (
    <div
      style={{
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={(e) => handleMouseDown(e, canvasPosition, canvasSize)}
      onMouseMove={(e) => handleMouseMove(e, canvasSize, setCanvasPosition)}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <VideoComponent
        track={localTrack}
        participantIdentity={participantIdentity}
        local={true}
      />
    </div>
  )
}
