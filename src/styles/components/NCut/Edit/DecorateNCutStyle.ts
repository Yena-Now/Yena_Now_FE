import styled from 'styled-components'

// 공통 브레이크포인트 정의
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  large: '1200px',
}

export const DecorateContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
`

export const CollaborativeIndicator = styled.div`
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 8px 16px;
  text-align: center;
  font-size: 14px;
  border-bottom: 1px solid #bbdefb;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
    padding: 6px 12px;
  }
`

export const MainLayout = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  padding: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
    padding: 10px;
  }
`

export const PreviewSection = styled.div`
  flex: 0 0 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.desktop}) {
    flex: 0 0 300px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex: none;
    height: 300px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 250px;
  }
`

export const NCutPreview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: ${breakpoints.desktop}) {
    width: 250px;
    height: 350px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 200px;
    height: 280px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 180px;
    height: 240px;
  }
`

export const FrameBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`

export const NCutBackground = styled.div<{
  gridRows: number
  gridCols: number
}>`
  position: absolute;
  top: 50px;
  left: 50px;
  width: calc(100% - 100px);
  height: calc(100% - 100px);
  display: grid;
  grid-template-rows: repeat(${(props) => props.gridRows}, 1fr);
  grid-template-columns: repeat(${(props) => props.gridCols}, 1fr);
  gap: 2px;
  z-index: 2;

  @media (max-width: ${breakpoints.desktop}) {
    top: 40px;
    left: 40px;
    width: 170px;
    height: 270px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    top: 30px;
    left: 30px;
    width: 140px;
    height: 220px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    top: 25px;
    left: 25px;
    width: 130px;
    height: 190px;
    gap: 1px;
  }
`

export const CutImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const CutImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`

export const IndividualCut = styled.img<{ $isSelected?: boolean }>`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  border: 2px solid ${(props) => (props.$isSelected ? '#2196f3' : '#e0e0e0')};
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: ${breakpoints.tablet}) {
    width: 50px;
    height: 50px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    border-width: 1px;
  }

  &:hover {
    border-color: #2196f3;
    transform: scale(1.05);
  }
`

export const StickerElement = styled.div`
  position: absolute;
  cursor: move;
  user-select: none;
  z-index: 10;

  &:hover {
    transform: scale(1.05);
  }
`

export const TextElement = styled.div`
  position: absolute;
  cursor: move;
  user-select: none;
  white-space: nowrap;
  z-index: 10;

  &:hover {
    transform: scale(1.05);
  }
`

export const EditSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
  }
`

export const IndividualCutsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 8px;
  }
`

export const IndividualCuts = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 5px 0;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 8px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 6px;
    padding: 3px 0;
  }
`

export const LargePreview = styled.div`
  flex: 1;
  max-height: 350px; // 최대 높이 제한
  background-color: transparent;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${breakpoints.tablet}) {
    max-height: 300px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-height: 250px;
    border-radius: 8px;
  }
`

export const EditPanel = styled.div`
  min-height: 120px; // 높이 줄임
  max-height: 200px; // 최대 높이 제한
  background-color: white;
  border-radius: 12px;
  padding: 15px; // 패딩 줄임
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto; // 스크롤 가능

  @media (max-width: ${breakpoints.tablet}) {
    min-height: 100px;
    max-height: 180px;
    padding: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    min-height: 80px;
    max-height: 150px;
    padding: 10px;
    border-radius: 8px;
  }
`

export const EditToolsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
  }
`

export const EditTabs = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;

  @media (max-width: ${breakpoints.mobile}) {
    border-bottom-width: 1px;
  }
`

export const TabButton = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  background: ${(props) => (props.active ? '#2196f3' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : '#666')};
  border: none;
  border-radius: 8px 8px 0 0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 20px;
    font-size: 13px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 16px;
    font-size: 12px;
    border-radius: 6px 6px 0 0;
  }

  &:hover {
    background: ${(props) => (props.active ? '#1976d2' : '#f5f5f5')};
  }
`

export const StickerPanel = styled.div``

export const StickerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(6, 1fr);
    gap: 6px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(5, 1fr);
    gap: 4px;
  }
`

export const StickerButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: ${breakpoints.tablet}) {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 30px;
    height: 30px;
    font-size: 16px;
    border-radius: 6px;
  }

  &:hover {
    background: #e9ecef;
    transform: scale(1.1);
  }
`

export const TextPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
  }
`

export const TextInput = styled.input`
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px;
    font-size: 13px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px;
    font-size: 12px;
    border-width: 1px;
    border-radius: 6px;
  }

  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`

export const TextControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
    flex-wrap: wrap;
  }
`

export const ColorPicker = styled.input`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  @media (max-width: ${breakpoints.mobile}) {
    width: 35px;
    height: 35px;
    border-radius: 6px;
  }
`

export const FontSizeInfo = styled.span`
  font-size: 14px;
  color: #666;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`

export const FontSizeSlider = styled.input`
  width: 100%;
`

export const AddButton = styled.button`
  padding: 12px 24px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 20px;
    font-size: 13px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 16px;
    font-size: 12px;
    border-radius: 6px;
  }

  &:hover:not(:disabled) {
    background: #1976d2;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 8px;
    justify-content: center;
  }
`

export const DeleteButton = styled.button`
  padding: 10px 20px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 8px 16px;
    font-size: 13px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 6px;
    flex: 1;
    max-width: 120px;
  }

  &:hover:not(:disabled) {
    background: #d32f2f;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`

export const EditGuide = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(33, 150, 243, 0.9);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  text-align: center;
  pointer-events: none;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  p {
    margin: 0;
    font-weight: 500;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
    padding: 12px 18px;
  }
`

export const CutSticker = styled.div`
  position: absolute;
  pointer-events: none; // 미리보기에서는 클릭 방지
  user-select: none;
  z-index: 10;
  max-width: 100%;
  max-height: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.8em !important;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.6em !important;
  }
`

export const CutText = styled.div`
  position: absolute;
  pointer-events: none; // 미리보기에서는 클릭 방지
  user-select: none;
  white-space: nowrap;
  z-index: 10;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.8em !important;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.6em !important;
  }
`

export const EditableImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 400px;
  cursor: crosshair; // 편집 모드임을 나타내는 커서
  margin: 0 auto;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 350px;
    max-height: 300px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 280px;
    max-height: 250px;
  }

  &:hover {
    border-color: #2196f3;
  }
`

export const EditableSticker = styled.div`
  position: absolute;
  cursor: move;
  user-select: none;
  z-index: 10;
  touch-action: none;
  transition: transform 0.1s ease;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.9em !important;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8em !important;
  }

  &:hover {
    transform: scale(1.05) !important;
  }

  &:active {
    cursor: grabbing;
    transform: scale(1.1) !important;
  }
`

export const EditableText = styled.div`
  position: absolute;
  cursor: move;
  user-select: none;
  white-space: nowrap;
  z-index: 10;
  touch-action: none;
  transition: transform 0.1s ease;
  padding: 2px 4px;
  border-radius: 4px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.9em !important;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8em !important;
  }

  &:hover {
    transform: scale(1.05) !important;
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    cursor: grabbing;
    transform: scale(1.1) !important;
  }
`
