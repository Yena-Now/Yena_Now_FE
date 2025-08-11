import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import html2canvas from 'html2canvas'
import { s3API } from '@/api/s3'
import * as S from '@styles/components/NCut/Edit/DecorateNCutStyle'

// 타입 정의
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

interface ImageDecorations {
  stickers: Sticker[]
  textElements: TextElement[]
}

interface DecorateNCutProps {
  selectedUrls: string[]
  selectedFrame: string
  onDecoratedImageReady?: (imageUrls: string[]) => void
  onDecorateUpdate?: (decorations: unknown) => void
  isCollaborative?: boolean
  roomCode?: string
}

export interface DecorateNCutRef {
  uploadDecoratedImages: () => Promise<string[]>
}

const DecorateNCut = forwardRef<DecorateNCutRef, DecorateNCutProps>(
  (
    { selectedUrls, onDecorateUpdate, isCollaborative = false, roomCode },
    ref,
  ) => {
    // 상태 관리
    const canvasRef = useRef<HTMLDivElement>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [imageDecorations, setImageDecorations] = useState<{
      [imageIndex: number]: ImageDecorations
    }>({})
    const [selectedElement, setSelectedElement] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<'sticker' | 'text'>('sticker')
    const [newText, setNewText] = useState('')
    const [textColor, setTextColor] = useState('#ffffff')
    const [fontSize, setFontSize] = useState(24)
    const [, setIsDragging] = useState(false)
    const [imageBlobUrls, setImageBlobUrls] = useState<string[]>([])
    const [isImagesLoading, setIsImagesLoading] = useState(true)

    // 현재 이미지의 장식 데이터 가져오기
    const getCurrentDecorations = useCallback((): ImageDecorations => {
      return (
        imageDecorations[currentImageIndex] || {
          stickers: [],
          textElements: [],
        }
      )
    }, [imageDecorations, currentImageIndex])

    // 현재 이미지의 장식 데이터 업데이트
    const updateCurrentDecorations = useCallback(
      (updater: (prev: ImageDecorations) => ImageDecorations) => {
        setImageDecorations((prev) => ({
          ...prev,
          [currentImageIndex]: updater(
            prev[currentImageIndex] || { stickers: [], textElements: [] },
          ),
        }))
      },
      [currentImageIndex],
    )

    // URL을 blob으로 변환
    const convertUrlToBlob = useCallback(
      async (url: string): Promise<string> => {
        try {
          if (url.startsWith('blob:')) return url

          const response = await fetch(url, {
            mode: 'cors',
            credentials: 'omit',
          })

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
          }

          const blob = await response.blob()
          return URL.createObjectURL(blob)
        } catch (error) {
          console.error('Failed to convert URL to blob:', error)
          return url
        }
      },
      [],
    )

    // 이미지 로드
    useEffect(() => {
      const loadImages = async () => {
        if (!selectedUrls.length) return

        setIsImagesLoading(true)

        try {
          const blobUrls = await Promise.all(
            selectedUrls.map(async (url, index) => {
              try {
                return await convertUrlToBlob(url)
              } catch (error) {
                console.warn(`Failed to load image ${index}:`, error)
                return url
              }
            }),
          )

          setImageBlobUrls(blobUrls)
        } catch (error) {
          console.error('Failed to load images:', error)
          setImageBlobUrls(selectedUrls)
        } finally {
          setIsImagesLoading(false)
        }
      }

      loadImages()

      // cleanup
      return () => {
        imageBlobUrls.forEach((url) => {
          if (url.startsWith('blob:')) {
            URL.revokeObjectURL(url)
          }
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUrls])

    // 그리드 레이아웃 계산
    const getGridLayout = (count: number) => {
      switch (count) {
        case 1:
          return { rows: 1, cols: 1 }
        case 2:
          return { rows: 2, cols: 1 }
        case 4:
          return { rows: 2, cols: 2 }
        case 6:
          return { rows: 3, cols: 2 }
        default:
          return { rows: 2, cols: 2 }
      }
    }

    const gridLayout = getGridLayout(selectedUrls.length)

    // 편집 영역 크기 계산
    const getEditAreaSize = useCallback(() => {
      const editArea = document.querySelector('[data-edit-area]') as HTMLElement
      if (!editArea) return { width: 400, height: 400 }
      const rect = editArea.getBoundingClientRect()
      return { width: rect.width, height: rect.height }
    }, [])

    // S3 업로드 함수
    const uploadDecoratedImages = useCallback(async (): Promise<string[]> => {
      if (isImagesLoading || !imageBlobUrls.length) {
        console.warn('Images not ready')
        return selectedUrls
      }

      try {
        const decoratedUrls: string[] = []

        for (let i = 0; i < imageBlobUrls.length; i++) {
          try {
            // 임시 컨테이너 생성
            const tempContainer = document.createElement('div')
            tempContainer.style.cssText = `
              position: relative;
              width: 400px;
              height: 400px;
              overflow: hidden;
              background: white;
            `

            // 이미지 생성
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.style.cssText = `
              width: 100%;
              height: 100%;
              object-fit: cover;
            `

            // 이미지 로드 대기
            await new Promise<void>((resolve, reject) => {
              img.onload = () => resolve()
              img.onerror = () => reject(new Error('Image load failed'))
              img.src = imageBlobUrls[i]
            })

            tempContainer.appendChild(img)

            // 장식 추가
            const decorations = imageDecorations[i] || {
              stickers: [],
              textElements: [],
            }

            decorations.stickers.forEach((sticker) => {
              const stickerEl = document.createElement('div')
              stickerEl.textContent = sticker.src
              stickerEl.style.cssText = `
                position: absolute;
                left: ${sticker.x}px;
                top: ${sticker.y}px;
                font-size: ${sticker.size}px;
                transform: rotate(${sticker.rotation}deg);
                pointer-events: none;
                user-select: none;
                z-index: 10;
              `
              tempContainer.appendChild(stickerEl)
            })

            decorations.textElements.forEach((textEl) => {
              const textElDiv = document.createElement('div')
              textElDiv.textContent = textEl.text
              textElDiv.style.cssText = `
                position: absolute;
                left: ${textEl.x}px;
                top: ${textEl.y}px;
                font-size: ${textEl.fontSize}px;
                color: ${textEl.color};
                font-family: ${textEl.fontFamily};
                pointer-events: none;
                user-select: none;
                z-index: 10;
                white-space: nowrap;
              `
              tempContainer.appendChild(textElDiv)
            })

            // DOM에 추가
            document.body.appendChild(tempContainer)

            // html2canvas로 캡처
            const canvas = await html2canvas(tempContainer, {
              backgroundColor: '#ffffff',
              scale: 2,
              useCORS: true,
              allowTaint: false,
            })

            // DOM에서 제거
            document.body.removeChild(tempContainer)

            // blob 생성
            const blob = await new Promise<Blob>((resolve, reject) => {
              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    resolve(blob)
                  } else {
                    reject(new Error('Canvas to blob failed'))
                  }
                },
                'image/png',
                1.0,
              )
            })

            // S3 업로드
            const file = new File([blob], `decorated-${i}.png`, {
              type: 'image/png',
            })

            const s3Response = await s3API.upload({
              file,
              type: 'ncut',
              roomCode,
            })

            decoratedUrls.push(s3Response as unknown as string)
          } catch (error) {
            console.error(`Failed to process image ${i}:`, error)
            // 실패 시 원본 업로드 시도
            try {
              if (imageBlobUrls[i].startsWith('blob:')) {
                const response = await fetch(imageBlobUrls[i])
                const blob = await response.blob()
                const file = new File([blob], `fallback-${i}.png`, {
                  type: 'image/png',
                })

                const s3Response = await s3API.upload({
                  file,
                  type: 'ncut',
                  roomCode,
                })

                decoratedUrls.push(s3Response as unknown as string)
              } else {
                decoratedUrls.push(imageBlobUrls[i])
              }
            } catch (fallbackError) {
              console.error(`Fallback failed for image ${i}:`, fallbackError)
              decoratedUrls.push(selectedUrls[i])
            }
          }
        }

        console.log('Decorated images uploaded:', decoratedUrls)
        return decoratedUrls
      } catch (error) {
        console.error('Upload process failed:', error)
        return selectedUrls
      }
    }, [
      isImagesLoading,
      imageBlobUrls,
      imageDecorations,
      selectedUrls,
      roomCode,
    ])

    // ref 노출
    useImperativeHandle(
      ref,
      () => ({
        uploadDecoratedImages,
      }),
      [uploadDecoratedImages],
    )

    // 기본 스티커
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
    ]

    // 이미지 선택
    const handleImageSelect = useCallback((index: number) => {
      setSelectedElement(null)
      setCurrentImageIndex(index)
    }, [])

    // 스티커 추가
    const addSticker = useCallback(
      (emoji: string) => {
        const newSticker: Sticker = {
          id: `sticker-${Date.now()}-${Math.random()}`,
          src: emoji,
          x: 50 + Math.random() * 100,
          y: 50 + Math.random() * 100,
          size: 30,
          rotation: 0,
        }

        updateCurrentDecorations((prev) => ({
          ...prev,
          stickers: [...prev.stickers, newSticker],
        }))

        if (isCollaborative && onDecorateUpdate) {
          onDecorateUpdate({
            type: 'addSticker',
            data: newSticker,
            imageIndex: currentImageIndex,
          })
        }
      },
      [
        updateCurrentDecorations,
        isCollaborative,
        onDecorateUpdate,
        currentImageIndex,
      ],
    )

    // 텍스트 추가
    const addText = useCallback(() => {
      if (!newText.trim()) return

      const newTextElement: TextElement = {
        id: `text-${Date.now()}-${Math.random()}`,
        text: newText,
        x: 50 + Math.random() * 100,
        y: 50 + Math.random() * 100,
        fontSize: fontSize,
        color: textColor,
        fontFamily: 'Arial, sans-serif',
      }

      updateCurrentDecorations((prev) => ({
        ...prev,
        textElements: [...prev.textElements, newTextElement],
      }))

      setNewText('')

      if (isCollaborative && onDecorateUpdate) {
        onDecorateUpdate({
          type: 'addText',
          data: newTextElement,
          imageIndex: currentImageIndex,
        })
      }
    }, [
      newText,
      fontSize,
      textColor,
      updateCurrentDecorations,
      isCollaborative,
      onDecorateUpdate,
      currentImageIndex,
    ])

    // 요소 삭제
    const deleteElement = useCallback(() => {
      if (!selectedElement) return

      updateCurrentDecorations((prev) => ({
        ...prev,
        stickers: prev.stickers.filter((s) => s.id !== selectedElement),
        textElements: prev.textElements.filter((t) => t.id !== selectedElement),
      }))

      setSelectedElement(null)

      if (isCollaborative && onDecorateUpdate) {
        onDecorateUpdate({
          type: 'delete',
          data: { id: selectedElement },
          imageIndex: currentImageIndex,
        })
      }
    }, [
      selectedElement,
      updateCurrentDecorations,
      isCollaborative,
      onDecorateUpdate,
      currentImageIndex,
    ])

    // 드래그 핸들링
    const handlePointerDown = useCallback(
      (e: React.MouseEvent | React.TouchEvent, elementId: string) => {
        e.preventDefault()
        e.stopPropagation()
        setSelectedElement(elementId)

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

        const startX = clientX
        const startY = clientY
        const currentDecorations = getCurrentDecorations()

        const element = [
          ...currentDecorations.stickers,
          ...currentDecorations.textElements,
        ].find((el) => el.id === elementId)

        if (!element) return

        const initialX = element.x
        const initialY = element.y

        const handlePointerMove = (e: MouseEvent | TouchEvent) => {
          const moveClientX = 'touches' in e ? e.touches[0].clientX : e.clientX
          const moveClientY = 'touches' in e ? e.touches[0].clientY : e.clientY

          const deltaX = moveClientX - startX
          const deltaY = moveClientY - startY
          const newX = Math.max(10, Math.min(initialX + deltaX, 350))
          const newY = Math.max(10, Math.min(initialY + deltaY, 350))

          updateCurrentDecorations((prev) => ({
            ...prev,
            stickers: prev.stickers.map((sticker) =>
              sticker.id === elementId
                ? { ...sticker, x: newX, y: newY }
                : sticker,
            ),
            textElements: prev.textElements.map((text) =>
              text.id === elementId ? { ...text, x: newX, y: newY } : text,
            ),
          }))
        }

        const handlePointerUp = () => {
          setIsDragging(false)
          document.removeEventListener(
            'mousemove',
            handlePointerMove as EventListener,
          )
          document.removeEventListener('mouseup', handlePointerUp)
          document.removeEventListener(
            'touchmove',
            handlePointerMove as EventListener,
          )
          document.removeEventListener('touchend', handlePointerUp)
        }

        setIsDragging(true)
        document.addEventListener(
          'mousemove',
          handlePointerMove as EventListener,
        )
        document.addEventListener('mouseup', handlePointerUp)
        document.addEventListener(
          'touchmove',
          handlePointerMove as EventListener,
          { passive: false },
        )
        document.addEventListener('touchend', handlePointerUp)
      },
      [getCurrentDecorations, updateCurrentDecorations],
    )

    // 캔버스 클릭 시 선택 해제
    const handleCanvasClick = useCallback((e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        setSelectedElement(null)
      }
    }, [])

    if (isImagesLoading) {
      return (
        <S.DecorateContainer>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: '18px',
              color: '#666',
            }}
          >
            이미지를 로딩 중입니다...
          </div>
        </S.DecorateContainer>
      )
    }

    const currentDecorations = getCurrentDecorations()

    return (
      <S.DecorateContainer>
        <S.MainLayout>
          {/* 왼쪽: 전체 네컷 결과 미리보기 */}
          <S.PreviewSection>
            <S.NCutPreview ref={canvasRef}>
              <S.NCutBackground
                gridRows={gridLayout.rows}
                gridCols={gridLayout.cols}
              >
                {imageBlobUrls.map((url, index) => {
                  const decorations = imageDecorations[index] || {
                    stickers: [],
                    textElements: [],
                  }

                  const editSize = getEditAreaSize()

                  return (
                    <S.CutImageContainer key={index} data-image-index={index}>
                      <S.CutImage
                        src={url}
                        alt={`cut-${index}`}
                        crossOrigin="anonymous"
                      />

                      {/* 미리보기에서 스티커 표시 */}
                      {decorations.stickers.map((sticker) => (
                        <S.CutSticker
                          key={sticker.id}
                          style={{
                            left: `${Math.min((sticker.x / editSize.width) * 100, 95)}%`,
                            top: `${Math.min((sticker.y / editSize.height) * 100, 95)}%`,
                            fontSize: `${Math.max(sticker.size * 0.3, 8)}px`,
                            transform: `rotate(${sticker.rotation}deg)`,
                            pointerEvents: 'none',
                            position: 'absolute',
                            zIndex: 10,
                            userSelect: 'none',
                          }}
                        >
                          {sticker.src}
                        </S.CutSticker>
                      ))}

                      {/* 미리보기에서 텍스트 표시 */}
                      {decorations.textElements.map((textEl) => (
                        <S.CutText
                          key={textEl.id}
                          style={{
                            left: `${Math.min((textEl.x / editSize.width) * 100, 90)}%`,
                            top: `${Math.min((textEl.y / editSize.height) * 100, 90)}%`,
                            fontSize: `${Math.max(textEl.fontSize * 0.3, 6)}px`,
                            color: textEl.color,
                            fontFamily: textEl.fontFamily,
                            pointerEvents: 'none',
                            position: 'absolute',
                            zIndex: 10,
                            userSelect: 'none',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {textEl.text}
                        </S.CutText>
                      ))}

                      {/* 현재 편집 중인 이미지 표시 */}
                      {index === currentImageIndex && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '4px',
                            left: '4px',
                            background: '#007bff',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: 500,
                            zIndex: 20,
                          }}
                        >
                          편집 중
                        </div>
                      )}
                    </S.CutImageContainer>
                  )
                })}
              </S.NCutBackground>
            </S.NCutPreview>
          </S.PreviewSection>

          {/* 오른쪽: 편집 도구 */}
          <S.EditSection>
            {/* 상단: 개별 컷 선택 */}
            <S.IndividualCutsHeader>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#666',
                  marginBottom: '8px',
                }}
              >
                편집할 컷 선택
              </div>
              <S.IndividualCuts>
                {imageBlobUrls.map((url, index) => (
                  <S.IndividualCut
                    key={index}
                    src={url}
                    alt={`cut-${index}`}
                    crossOrigin="anonymous"
                    onClick={() => handleImageSelect(index)}
                    $isSelected={index === currentImageIndex}
                  />
                ))}
              </S.IndividualCuts>
            </S.IndividualCutsHeader>

            {/* 중앙: 현재 선택된 이미지의 편집 영역 */}
            <S.LargePreview>
              <S.EditableImage onClick={handleCanvasClick} data-edit-area>
                <img
                  src={imageBlobUrls[currentImageIndex]}
                  alt="editing preview"
                  crossOrigin="anonymous"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none',
                  }}
                />

                {currentDecorations.stickers.map((sticker) => (
                  <S.EditableSticker
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
                    onMouseDown={(e) => handlePointerDown(e, sticker.id)}
                    onTouchStart={(e) => handlePointerDown(e, sticker.id)}
                  >
                    {sticker.src}
                  </S.EditableSticker>
                ))}

                {currentDecorations.textElements.map((textEl) => (
                  <S.EditableText
                    key={textEl.id}
                    style={{
                      left: `${textEl.x}px`,
                      top: `${textEl.y}px`,
                      fontSize: `${textEl.fontSize}px`,
                      color: textEl.color,
                      fontFamily: textEl.fontFamily,
                      border:
                        selectedElement === textEl.id
                          ? '2px dashed #007bff'
                          : 'none',
                      zIndex: selectedElement === textEl.id ? 100 : 10,
                    }}
                    onMouseDown={(e) => handlePointerDown(e, textEl.id)}
                    onTouchStart={(e) => handlePointerDown(e, textEl.id)}
                  >
                    {textEl.text}
                  </S.EditableText>
                ))}

                {currentDecorations.stickers.length === 0 &&
                  currentDecorations.textElements.length === 0 && (
                    <S.EditGuide>
                      <p>아래에서 스티커나 텍스트를 추가해보세요!</p>
                    </S.EditGuide>
                  )}
              </S.EditableImage>
            </S.LargePreview>

            {/* 하단: 편집 도구 */}
            <S.EditToolsContainer>
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
                    <S.TextControls>
                      <S.ColorPicker
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                      />
                      <S.FontSizeInfo>크기: {fontSize}px</S.FontSizeInfo>
                    </S.TextControls>
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
                <S.DeleteButton
                  onClick={deleteElement}
                  disabled={!selectedElement}
                >
                  삭제
                </S.DeleteButton>
              </S.ActionButtons>
            </S.EditToolsContainer>
          </S.EditSection>
        </S.MainLayout>
      </S.DecorateContainer>
    )
  },
)

DecorateNCut.displayName = 'DecorateNCut'

export default DecorateNCut
