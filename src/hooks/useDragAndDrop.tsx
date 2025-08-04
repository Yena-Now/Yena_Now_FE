import { useState } from 'react'

export const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = (
    e: React.MouseEvent,
    canvasPosition: { x: number; y: number },
    canvasSize: { width: number; height: number },
  ) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    if (
      mouseX >= canvasPosition.x &&
      mouseX <= canvasPosition.x + canvasSize.width &&
      mouseY >= canvasPosition.y &&
      mouseY <= canvasPosition.y + canvasSize.height
    ) {
      setIsDragging(true)
      setDragOffset({
        x: mouseX - canvasPosition.x,
        y: mouseY - canvasPosition.y,
      })
    }
  }

  const handleMouseMove = (
    e: React.MouseEvent,
    canvasSize: { width: number; height: number },
    setCanvasPosition: (pos: { x: number; y: number }) => void,
  ) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const newX = mouseX - dragOffset.x
    const newY = mouseY - dragOffset.y

    const boundedX = Math.max(0, Math.min(newX, 1920 - canvasSize.width))
    const boundedY = Math.max(0, Math.min(newY, 1080 - canvasSize.height))

    setCanvasPosition({ x: boundedX, y: boundedY })
  }

  const handleMouseUp = () => setIsDragging(false)

  return {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}
