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
  display: grid;
  grid-template-columns: 3fr 8fr;
  gap: 20px;
  padding: 20px;
  min-height: 0;

  @media (max-width: ${breakpoints.large}) {
    grid-template-columns: 2fr 7fr;
  }

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: 5fr 7fr;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    gap: 15px;
    padding: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
    padding: 10px;
  }
`

export const PreviewSection = styled.div<{ $cutCount?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 0;
  padding: 10px;

  /* 컷 개수에 따른 최소 높이 조정 */
  ${(props) => props.$cutCount === 1 && `min-height: 350px;`}
  ${(props) => props.$cutCount === 2 && `min-height: 500px;`}
  ${(props) => props.$cutCount === 4 && `min-height: 400px;`}
  ${(props) => props.$cutCount === 6 && `min-height: 450px;`}

  @media (max-width: ${breakpoints.large}) {
    ${(props) => props.$cutCount === 1 && `min-height: 300px;`}
    ${(props) => props.$cutCount === 2 && `min-height: 450px;`}
    ${(props) => props.$cutCount === 4 && `min-height: 350px;`}
    ${(props) => props.$cutCount === 6 && `min-height: 420px;`}
  }

  @media (max-width: ${breakpoints.desktop}) {
    ${(props) => props.$cutCount === 1 && `min-height: 250px;`}
    ${(props) => props.$cutCount === 2 && `min-height: 360px;`}
    ${(props) => props.$cutCount === 4 && `min-height: 280px;`}
    ${(props) => props.$cutCount === 6 && `min-height: 345px;`}
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 5px;
    ${(props) => props.$cutCount === 1 && `min-height: 200px;`}
    ${(props) => props.$cutCount === 2 && `min-height: 320px;`}
    ${(props) => props.$cutCount === 4 && `min-height: 250px;`}
    ${(props) => props.$cutCount === 6 && `min-height: 300px;`}
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 3px;
    ${(props) => props.$cutCount === 1 && `min-height: 160px;`}
    ${(props) => props.$cutCount === 2 && `min-height: 250px;`}
    ${(props) => props.$cutCount === 4 && `min-height: 180px;`}
    ${(props) => props.$cutCount === 6 && `min-height: 225px;`}
  }
`

export const NCutPreview = styled.div<{ $cutCount?: number }>`
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

  /* 1컷: 정사각형에 가까운 비율 */
  ${(props) =>
    props.$cutCount === 1 &&
    `
    max-width: 350px;
    max-height: 350px;
    aspect-ratio: 1/1;
  `}

  /* 2컷: 세로 긴 비율 */
  ${(props) =>
    props.$cutCount === 2 &&
    `
    max-width: 280px;
    max-height: 500px;
    aspect-ratio: 1/1.8;
  `}

  /* 4컷: 정사각형 비율 */
  ${(props) =>
    props.$cutCount === 4 &&
    `
    max-width: 400px;
    max-height: 400px;
    aspect-ratio: 1/1;
  `}

  /* 6컷: 세로 긴 비율 */
  ${(props) =>
    props.$cutCount === 6 &&
    `
    max-width: 300px;
    max-height: 450px;
    aspect-ratio: 2/3;
  `}

  @media (max-width: ${breakpoints.large}) {
    ${(props) =>
      props.$cutCount === 1 &&
      `
      max-width: 300px;
      max-height: 300px;
    `}
    ${(props) =>
      props.$cutCount === 2 &&
      `
      max-width: 250px;
      max-height: 450px;
    `}
    ${(props) =>
      props.$cutCount === 4 &&
      `
      max-width: 350px;
      max-height: 350px;
    `}
    ${(props) =>
      props.$cutCount === 6 &&
      `
      max-width: 280px;
      max-height: 420px;
    `}
  }

  @media (max-width: ${breakpoints.desktop}) {
    ${(props) =>
      props.$cutCount === 1 &&
      `
      max-width: 250px;
      max-height: 250px;
    `}
    ${(props) =>
      props.$cutCount === 2 &&
      `
      max-width: 200px;
      max-height: 360px;
    `}
    ${(props) =>
      props.$cutCount === 4 &&
      `
      max-width: 280px;
      max-height: 280px;
    `}
    ${(props) =>
      props.$cutCount === 6 &&
      `
      max-width: 230px;
      max-height: 345px;
    `}
  }

  @media (max-width: ${breakpoints.tablet}) {
    ${(props) =>
      props.$cutCount === 1 &&
      `
      max-width: 200px;
      max-height: 200px;
    `}
    ${(props) =>
      props.$cutCount === 2 &&
      `
      max-width: 180px;
      max-height: 320px;
    `}
    ${(props) =>
      props.$cutCount === 4 &&
      `
      max-width: 250px;
      max-height: 250px;
    `}
    ${(props) =>
      props.$cutCount === 6 &&
      `
      max-width: 200px;
      max-height: 300px;
    `}
  }

  @media (max-width: ${breakpoints.mobile}) {
    ${(props) =>
      props.$cutCount === 1 &&
      `
      max-width: 160px;
      max-height: 160px;
    `}
    ${(props) =>
      props.$cutCount === 2 &&
      `
      max-width: 140px;
      max-height: 250px;
    `}
    ${(props) =>
      props.$cutCount === 4 &&
      `
      max-width: 180px;
      max-height: 180px;
    `}
    ${(props) =>
      props.$cutCount === 6 &&
      `
      max-width: 150px;
      max-height: 225px;
    `}
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
  $gridRows: number
  $gridCols: number
  $cutCount?: number
}>`
  position: absolute;
  display: grid;
  grid-template-rows: repeat(${(props) => props.$gridRows}, 1fr);
  grid-template-columns: repeat(${(props) => props.$gridCols}, 1fr);
  z-index: 2;

  /* 1컷: 여백 최소화 */
  ${(props) =>
    props.$cutCount === 1 &&
    `
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    gap: 0px;
  `}

  /* 2컷: 세로 배치, 여백 적당히 */
  ${(props) =>
    props.$cutCount === 2 &&
    `
    top: 8%;
    left: 15%;
    width: 70%;
    height: 84%;
    gap: 3px;
  `}

  /* 4컷: 2x2 그리드, 여백 적당히 */
  ${(props) =>
    props.$cutCount === 4 &&
    `
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    gap: 4px;
  `}

  /* 6컷: 2x3 또는 3x2 그리드 */
  ${(props) =>
    props.$cutCount === 6 &&
    `
    top: 8%;
    left: 8%;
    width: 84%;
    height: 84%;
    gap: 2px;
  `}

  @media (max-width: ${breakpoints.desktop}) {
    ${(props) => props.$cutCount === 1 && `gap: 0px;`}
    ${(props) => props.$cutCount === 2 && `gap: 2px;`}
    ${(props) => props.$cutCount === 4 && `gap: 3px;`}
    ${(props) => props.$cutCount === 6 && `gap: 1.5px;`}
  }

  @media (max-width: ${breakpoints.tablet}) {
    ${(props) =>
      props.$cutCount === 1 &&
      `
      top: 3%;
      left: 3%;
      width: 94%;
      height: 94%;
      gap: 0px;
    `}
    ${(props) =>
      props.$cutCount === 2 &&
      `
      top: 6%;
      left: 12%;
      width: 76%;
      height: 88%;
      gap: 2px;
    `}
    ${(props) =>
      props.$cutCount === 4 &&
      `
      top: 8%;
      left: 8%;
      width: 84%;
      height: 84%;
      gap: 2px;
    `}
    ${(props) =>
      props.$cutCount === 6 &&
      `
      top: 6%;
      left: 6%;
      width: 88%;
      height: 88%;
      gap: 1px;
    `}
  }

  @media (max-width: ${breakpoints.mobile}) {
    ${(props) =>
      props.$cutCount === 1 &&
      `
      top: 2%;
      left: 2%;
      width: 96%;
      height: 96%;
      gap: 0px;
    `}
    ${(props) =>
      props.$cutCount === 2 &&
      `
      top: 4%;
      left: 10%;
      width: 80%;
      height: 92%;
      gap: 1px;
    `}
    ${(props) =>
      props.$cutCount === 4 &&
      `
      top: 6%;
      left: 6%;
      width: 88%;
      height: 88%;
      gap: 1px;
    `}
    ${(props) =>
      props.$cutCount === 6 &&
      `
      top: 4%;
      left: 4%;
      width: 92%;
      height: 92%;
      gap: 0.5px;
    `}
  }
`

export const CutImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

export const CutImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 2px;

  min-width: 20px;
  min-height: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    border-radius: 1px;
    min-width: 15px;
    min-height: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    border-radius: 1px;
    min-width: 12px;
    min-height: 12px;
  }
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
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
  min-height: 0; // grid overflow 방지

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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 12px;
  min-height: 300px;

  @media (max-width: ${breakpoints.tablet}) {
    min-height: 250px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    min-height: 200px;
    border-radius: 8px;
  }
`

export const EditPanel = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  height: 400px;
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 320px;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 15px;
    min-width: 220px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px;
    border-radius: 8px;
    min-width: 160px;
  }
`

export const EditToolsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  overflow: hidden;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 15px;
  }
`

export const EditTabs = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;

  @media (max-width: ${breakpoints.mobile}) {
    border-bottom-width: 1px;
  }
`

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 12px 24px;
  background: ${(props) => (props.$active ? '#2196f3' : 'transparent')};
  color: ${(props) => (props.$active ? 'white' : '#666')};
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
    background: ${(props) => (props.$active ? '#1976d2' : '#f5f5f5')};
  }
`

export const StickerPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const StickerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${breakpoints.large}) {
    grid-template-columns: repeat(8, 1fr);
    gap: 8px;
  }

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
  }

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;

    &:hover {
      background: #a1a1a1;
    }
  }
`

export const StickerButton = styled.button`
  width: 45px;
  height: 45px;
  border: none;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: ${breakpoints.large}) {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

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
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 15px;
  }

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;

    &:hover {
      background: #a1a1a1;
    }
  }
`

// 탭 컨텐츠 래퍼 추가
export const TabContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0; // flexbox 오버플로우 방지
`

// 텍스트 입력 영역과 컨트롤을 분리
export const TextInputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-shrink: 0; // 크기 고정

  @media (max-width: ${breakpoints.mobile}) {
    gap: 12px;
  }
`

export const TextInput = styled.input`
  padding: 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 12px;
    font-size: 14px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    font-size: 13px;
    border-width: 1px;
    border-radius: 6px;
  }

  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`
export const TextControls = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);
  }
`

export const ColorPicker = styled.input`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  @media (max-width: ${breakpoints.tablet}) {
    width: 45px;
    height: 45px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    border-radius: 6px;
  }
`

export const FontSizeInfo = styled.span`
  font-size: 14px;
  color: #666;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`

export const FontSizeSlider = styled.input`
  width: 100%;
`

export const AddButton = styled.button`
  padding: 14px 28px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  width: 15%;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 12px 24px;
    font-size: 14px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px 20px;
    font-size: 13px;
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
  gap: 15px;
  justify-content: flex-start;
  margin-top: auto;
  padding-top: 15px;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 12px;
    padding-top: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
    justify-content: center;
    padding-top: 10px;
  }
`

export const DeleteButton = styled.button`
  padding: 12px 24px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
  width: 10%;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px 20px;
    font-size: 13px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 16px;
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
  padding: 20px 28px;
  border-radius: 12px;
  text-align: center;
  pointer-events: none;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  p {
    margin: 0;
    font-weight: 500;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 14px;
    padding: 16px 22px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
    padding: 12px 18px;
  }
`

export const CutSticker = styled.div<{ $cutCount?: number }>`
  position: absolute;
  pointer-events: none;
  user-select: none;
  z-index: 10;

  /* 컷 개수에 따른 기본 크기 조정 */
  ${(props) => props.$cutCount === 1 && `font-size: 20px;`}
  ${(props) => props.$cutCount === 2 && `font-size: 14px;`}
  ${(props) => props.$cutCount === 4 && `font-size: 12px;`}
  ${(props) => props.$cutCount === 6 && `font-size: 10px;`}

  @media (max-width: ${breakpoints.large}) {
    ${(props) => props.$cutCount === 1 && `font-size: 18px;`}
    ${(props) => props.$cutCount === 2 && `font-size: 12px;`}
    ${(props) => props.$cutCount === 4 && `font-size: 10px;`}
    ${(props) => props.$cutCount === 6 && `font-size: 8px;`}
  }

  @media (max-width: ${breakpoints.desktop}) {
    ${(props) => props.$cutCount === 1 && `font-size: 16px;`}
    ${(props) => props.$cutCount === 2 && `font-size: 10px;`}
    ${(props) => props.$cutCount === 4 && `font-size: 8px;`}
    ${(props) => props.$cutCount === 6 && `font-size: 6px;`}
  }

  @media (max-width: ${breakpoints.tablet}) {
    ${(props) => props.$cutCount === 1 && `font-size: 14px;`}
    ${(props) => props.$cutCount === 2 && `font-size: 8px;`}
    ${(props) => props.$cutCount === 4 && `font-size: 6px;`}
    ${(props) => props.$cutCount === 6 && `font-size: 5px;`}
  }

  @media (max-width: ${breakpoints.mobile}) {
    ${(props) => props.$cutCount === 1 && `font-size: 12px;`}
    ${(props) => props.$cutCount === 2 && `font-size: 6px;`}
    ${(props) => props.$cutCount === 4 && `font-size: 5px;`}
    ${(props) => props.$cutCount === 6 && `font-size: 4px;`}
  }
`

export const CutText = styled.div<{ $cutCount?: number }>`
  position: absolute;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  z-index: 10;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;

  /* 컷 개수에 따른 기본 크기 조정 */
  ${(props) => props.$cutCount === 1 && `font-size: 16px;`}
  ${(props) => props.$cutCount === 2 && `font-size: 10px;`}
  ${(props) => props.$cutCount === 4 && `font-size: 8px;`}
  ${(props) => props.$cutCount === 6 && `font-size: 7px;`}

  @media (max-width: ${breakpoints.large}) {
    ${(props) => props.$cutCount === 1 && `font-size: 14px;`}
    ${(props) => props.$cutCount === 2 && `font-size: 9px;`}
    ${(props) => props.$cutCount === 4 && `font-size: 7px;`}
    ${(props) => props.$cutCount === 6 && `font-size: 6px;`}
  }

  @media (max-width: ${breakpoints.desktop}) {
    ${(props) => props.$cutCount === 1 && `font-size: 12px;`}
    ${(props) => props.$cutCount === 2 && `font-size: 8px;`}
    ${(props) => props.$cutCount === 4 && `font-size: 6px;`}
    ${(props) => props.$cutCount === 6 && `font-size: 5px;`}
  }

  @media (max-width: ${breakpoints.tablet}) {
    ${(props) => props.$cutCount === 1 && `font-size: 10px;`}
    ${(props) => props.$cutCount === 2 && `font-size: 7px;`}
    ${(props) => props.$cutCount === 4 && `font-size: 5px;`}
    ${(props) => props.$cutCount === 6 && `font-size: 4px;`}
  }

  @media (max-width: ${breakpoints.mobile}) {
    ${(props) => props.$cutCount === 1 && `font-size: 8px;`}
    ${(props) => props.$cutCount === 2 && `font-size: 5px;`}
    ${(props) => props.$cutCount === 4 && `font-size: 4px;`}
    ${(props) => props.$cutCount === 6 && `font-size: 3px;`}
  }
`

export const EditableImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 800px; // 더 큰 편집 영역
  max-height: 500px;
  aspect-ratio: 8/5; // 16:10 비율
  cursor: crosshair;
  margin: 0 auto;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;

  @media (max-width: ${breakpoints.large}) {
    max-width: 650px;
    max-height: 400px;
  }

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 500px;
    max-height: 320px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 400px;
    max-height: 250px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 300px;
    max-height: 200px;
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

  &:hover {
    transform: scale(1.05) !important;
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    cursor: grabbing;
    transform: scale(1.1) !important;
  }
`
