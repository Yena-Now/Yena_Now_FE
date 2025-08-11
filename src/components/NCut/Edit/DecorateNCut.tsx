import React, { useState, useRef, useCallback, useEffect } from 'react'
import html2canvas from 'html2canvas'
import * as S from '@styles/components/NCut/Edit/DecorateNCutStyle'

interface DecorateNCutProps {
  selectedUrls: string[]
  selectedFrame: string
  onDecoratedImageReady?: (decoratedImageUrl: string) => void
}

interface Sticker {
  id: string
  src: string
  x: number
  y: number
  size: number
  rotation: number
}

interface TextElement {
  id: string
  text: string
  x: number
  y: number
  fontSize: number
  color: string
  fontFamily: string
}

const DecorateNCut: React.FC<DecorateNCutProps> = ({
  selectedUrls,
  selectedFrame,
  onDecoratedImageReady,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [stickers, setStickers] = useState<Sticker[]>([])
  const [textElements, setTextElements] = useState<TextElement[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'sticker' | 'text' | 'filter'>(
    'sticker',
  )
  const [newText, setNewText] = useState('')
  const [textColor, setTextColor] = useState('#ffffff')
  const [fontSize, setFontSize] = useState(24)
  const [isDragging, setIsDragging] = useState(false)

  // 기본 스티커 목록
  const defaultStickers = [
    '❤️',
    '💕',
    '💖',
    '💗',
    '💘',
    '💙',
    '💚',
    '💛',
    '🧡',
    '💜',
    '🖤',
    '🤍',
    '😊',
    '😍',
    '🥰',
    '😘',
    '😋',
    '😎',
    '🤩',
    '🥳',
    '😇',
    '🙃',
    '😉',
    '🤗',
    '🎉',
    '🎊',
    '🎈',
    '🎂',
    '🎁',
    '🎀',
    '💝',
    '🌸',
    '🌺',
    '🌻',
    '🌷',
    '🌹',
    '⭐',
    '✨',
    '💫',
    '⚡',
    '🔥',
    '💥',
    '💢',
    '💨',
    '💦',
    '💧',
    '🌈',
    '☀️',
  ]

  const getGridLayout = (count: number) => {
    switch (count) {
      case 1:
        return { rows: 1, cols: 1 }
      case 2:
        return { rows: 2, cols: 1 }
      case 4:
        return { rows: 4, cols: 1 }
      default:
        return { rows: 3, cols: 2 }
    }
  }

  const gridLayout = getGridLayout(selectedUrls.length)

  // 스티커 추가
  const addSticker = useCallback((emoji: string) => {
    const newSticker: Sticker = {
      id: `sticker-${Date.now()}`,
      src: emoji,
      x: 50 + Math.random() * 100,
      y: 50 + Math.random() * 100,
      size: 30,
      rotation: 0,
    }
    setStickers((prev) => [...prev, newSticker])
  }, [])

  // 텍스트 추가
  const addText = useCallback(() => {
    if (!newText.trim()) return

    const newTextElement: TextElement = {
      id: `text-${Date.now()}`,
      text: newText,
      x: 50 + Math.random() * 100,
      y: 50 + Math.random() * 100,
      fontSize: fontSize,
      color: textColor,
      fontFamily: 'Arial, sans-serif',
    }
    setTextElements((prev) => [...prev, newTextElement])
    setNewText('')
  }, [newText, textColor, fontSize])

  // 요소 삭제
  const deleteElement = useCallback(() => {
    if (!selectedElement) return

    setStickers((prev) =>
      prev.filter((sticker) => sticker.id !== selectedElement),
    )
    setTextElements((prev) =>
      prev.filter((text) => text.id !== selectedElement),
    )
    setSelectedElement(null)
  }, [selectedElement])

  // 개선된 드래그 핸들링
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, elementId: string) => {
      e.preventDefault()
      e.stopPropagation()
      setSelectedElement(elementId)
      setIsDragging(true)

      const startX = e.clientX
      const startY = e.clientY

      // 현재 요소의 초기 위치 저장
      const currentSticker = stickers.find((s) => s.id === elementId)
      const currentText = textElements.find((t) => t.id === elementId)
      const initialX = currentSticker?.x || currentText?.x || 0
      const initialY = currentSticker?.y || currentText?.y || 0

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return

        const deltaX = e.clientX - startX
        const deltaY = e.clientY - startY
        const newX = initialX + deltaX
        const newY = initialY + deltaY

        // 경계 체크
        const boundedX = Math.max(0, Math.min(newX, 270))
        const boundedY = Math.max(0, Math.min(newY, 370))

        if (currentSticker) {
          setStickers((prev) =>
            prev.map((sticker) =>
              sticker.id === elementId
                ? { ...sticker, x: boundedX, y: boundedY }
                : sticker,
            ),
          )
        }

        if (currentText) {
          setTextElements((prev) =>
            prev.map((text) =>
              text.id === elementId
                ? { ...text, x: boundedX, y: boundedY }
                : text,
            ),
          )
        }
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [stickers, textElements, isDragging],
  )

  // 캔버스 클릭 시 선택 해제
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedElement(null)
    }
  }, [])

  // 완성된 이미지 저장
  const saveDecoratedImage = useCallback(async () => {
    if (!canvasRef.current) return

    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })

      const decoratedImageUrl = canvas.toDataURL('image/png')
      onDecoratedImageReady?.(decoratedImageUrl)
    } catch (error) {
      console.error('Failed to save decorated image:', error)
    }
  }, [onDecoratedImageReady])

  // 스티커나 텍스트가 변경될 때마다 이미지 업데이트
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDecoratedImage()
    }, 300) // 300ms 디바운스

    return () => clearTimeout(timer)
  }, [stickers, textElements, saveDecoratedImage])

  useEffect(() => {
    if (selectedUrls.length > 0 && selectedFrame) {
      const timer = setTimeout(() => {
        saveDecoratedImage()
      }, 1000) // 이미지 로딩을 위한 딜레이

      return () => clearTimeout(timer)
    }
  }, [selectedUrls, selectedFrame, saveDecoratedImage])

  return (
    <S.DecorateContainer>
      {/* 왼쪽: 완성된 네컷 미리보기 */}
      <S.PreviewSection>
        <S.NCutPreview ref={canvasRef} onClick={handleCanvasClick}>
          {/* 프레임 배경 이미지 */}
          {selectedFrame && (
            <S.FrameBackground src={selectedFrame} alt="frame" />
          )}

          {/* 네컷 배경 */}
          <S.NCutBackground
            gridRows={gridLayout.rows}
            gridCols={gridLayout.cols}
          >
            {selectedUrls.map((url, index) => (
              <S.CutImage key={index} src={url} alt={`cut-${index}`} />
            ))}
          </S.NCutBackground>

          {/* 스티커들 */}
          {stickers.map((sticker) => (
            <S.StickerElement
              key={sticker.id}
              style={{
                left: `${sticker.x}px`,
                top: `${sticker.y}px`,
                fontSize: `${sticker.size}px`,
                transform: `rotate(${sticker.rotation}deg)`,
                border:
                  selectedElement === sticker.id
                    ? '2px dashed #007bff'
                    : 'none',
                zIndex: selectedElement === sticker.id ? 100 : 10,
              }}
              onMouseDown={(e) => handleMouseDown(e, sticker.id)}
            >
              {sticker.src}
            </S.StickerElement>
          ))}

          {/* 텍스트 요소들 */}
          {textElements.map((textEl) => (
            <S.TextElement
              key={textEl.id}
              style={{
                left: `${textEl.x}px`,
                top: `${textEl.y}px`,
                fontSize: `${textEl.fontSize}px`,
                color: textEl.color,
                fontFamily: textEl.fontFamily,
                border:
                  selectedElement === textEl.id ? '2px dashed #007bff' : 'none',
                zIndex: selectedElement === textEl.id ? 100 : 10,
              }}
              onMouseDown={(e) => handleMouseDown(e, textEl.id)}
            >
              {textEl.text}
            </S.TextElement>
          ))}
        </S.NCutPreview>
      </S.PreviewSection>

      <S.EditSection>
        <S.IndividualCuts>
          {selectedUrls.map((url, index) => (
            <S.IndividualCut
              key={index}
              src={url}
              alt={`individual-${index}`}
            />
          ))}
        </S.IndividualCuts>

        <S.LargePreview>
          {selectedUrls.length > 0 && (
            <img src={selectedUrls[0]} alt="large preview" />
          )}
        </S.LargePreview>

        <S.EditTabs>
          <S.TabButton
            active={activeTab === 'sticker'}
            onClick={() => setActiveTab('sticker')}
          >
            스티커
          </S.TabButton>
          <S.TabButton
            active={activeTab === 'text'}
            onClick={() => setActiveTab('text')}
          >
            텍스트
          </S.TabButton>
        </S.EditTabs>

        <S.EditPanel>
          {activeTab === 'sticker' && (
            <S.StickerPanel>
              <S.StickerGrid>
                {defaultStickers.map((emoji, index) => (
                  <S.StickerButton
                    key={index}
                    onClick={() => addSticker(emoji)}
                  >
                    {emoji}
                  </S.StickerButton>
                ))}
              </S.StickerGrid>
            </S.StickerPanel>
          )}

          {activeTab === 'text' && (
            <S.TextPanel>
              <S.TextInput
                type="text"
                placeholder="텍스트를 입력하세요"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addText()}
              />
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <S.ColorPicker
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
                <span style={{ fontSize: '14px' }}>크기: {fontSize}px</span>
              </div>
              <S.FontSizeSlider
                type="range"
                min="12"
                max="48"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
              <S.AddButton onClick={addText} disabled={!newText.trim()}>
                텍스트 추가
              </S.AddButton>
            </S.TextPanel>
          )}
        </S.EditPanel>

        <S.ActionButtons>
          <S.DeleteButton onClick={deleteElement} disabled={!selectedElement}>
            삭제
          </S.DeleteButton>
        </S.ActionButtons>
      </S.EditSection>
    </S.DecorateContainer>
  )
}

export default DecorateNCut
