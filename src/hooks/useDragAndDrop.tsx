import React, { useState, useCallback, useEffect, useRef } from 'react'

export const useDragAndDrop = (
  mainCanvasRef: React.RefObject<HTMLCanvasElement | null>,
  canvasSize: { width: number; height: number },
  canvasPosition: { x: number; y: number },
  setCanvasPosition: (pos: { x: number; y: number }) => void,
) => {
  const [isDragging, setIsDragging] = useState(false)
  const dragOffsetRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const mainCanvas = mainCanvasRef.current
      if (!isDragging || !mainCanvas) return

      const rect = mainCanvas.getBoundingClientRect()
      const scaleX = mainCanvas.width / rect.width
      const scaleY = mainCanvas.height / rect.height

      const mouseX = (e.clientX - rect.left) * scaleX
      const mouseY = (e.clientY - rect.top) * scaleY

      const newX = mouseX - dragOffsetRef.current.x
      const newY = mouseY - dragOffsetRef.current.y

      const boundedX = Math.max(
        0,
        Math.min(newX, mainCanvas.width - canvasSize.width),
      )
      const boundedY = Math.max(
        0,
        Math.min(newY, mainCanvas.height - canvasSize.height),
      )

      setCanvasPosition({ x: boundedX, y: boundedY })
    },
    [isDragging, mainCanvasRef, canvasSize, setCanvasPosition],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const mainCanvas = mainCanvasRef.current
      if (!mainCanvas) return

      const rect = mainCanvas.getBoundingClientRect()
      const scaleX = mainCanvas.width / rect.width
      const scaleY = mainCanvas.height / rect.height

      const mouseX = (e.clientX - rect.left) * scaleX
      const mouseY = (e.clientY - rect.top) * scaleY

      // 마우스 클릭이 비디오 영역 내에서 발생했는지 확인
      if (
        mouseX >= canvasPosition.x &&
        mouseX <= canvasPosition.x + canvasSize.width &&
        mouseY >= canvasPosition.y &&
        mouseY <= canvasPosition.y + canvasSize.height
      ) {
        dragOffsetRef.current = {
          x: mouseX - canvasPosition.x,
          y: mouseY - canvasPosition.y,
        }
        setIsDragging(true)
        e.preventDefault()
      }
    },
    [mainCanvasRef, canvasPosition, canvasSize],
  )

  return {
    isDragging,
    handleMouseDown,
  }
}
