import styled from 'styled-components'

export const DecorateContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f8f9fa;
`

export const PreviewSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
`

export const NCutPreview = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
  background-color: white;
  border: 2px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: default;
`

export const FrameBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  pointer-events: none;
`

export const NCutBackground = styled.div<{ gridRows: number; gridCols: number }>`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(${props => props.gridRows}, 1fr);
  grid-template-columns: repeat(${props => props.gridCols}, 1fr);
  gap: 2px;
  z-index: 2;
  position: relative;
`

export const CutImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const StickerElement = styled.div`
  position: absolute;
  cursor: move;
  user-select: none;
  padding: 2px;
  border-radius: 4px;
  transition: transform 0.1s ease;

  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
  }

  &:active {
    transform: scale(1.05);
  }
`

export const TextElement = styled.div`
  position: absolute;
  cursor: move;
  user-select: none;
  padding: 2px 4px;
  border-radius: 4px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  transition: transform 0.1s ease;

  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
  }

  &:active {
    transform: scale(1.05);
  }
`

// ...existing code... (나머지 스타일은 동일)

export const EditSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`

export const IndividualCuts = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

export const IndividualCut = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #ddd;
  cursor: pointer;

  &:hover {
    border-color: #007bff;
  }
`

export const LargePreview = styled.div`
  width: 100%;
  height: 250px;
  background-color: #f0f0f0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`

export const EditTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`

export const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? '#007bff' : '#e9ecef')};
  color: ${(props) => (props.active ? 'white' : '#333')};
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#dee2e6')};
  }
`

export const EditPanel = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 200px;
`

export const StickerPanel = styled.div`
  height: 100%;
`

export const StickerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  max-height: 200px;
  overflow-y: auto;
  
  /* 커스텀 스크롤바 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
`

export const StickerButton = styled.button`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
    transform: scale(1.1);
    border-color: #007bff;
  }

  &:active {
    transform: scale(0.95);
  }
`

export const TextPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const TextInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

export const ColorPicker = styled.input`
  width: 50px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`

export const FontSizeSlider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 5px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #007bff;
    cursor: pointer;
  }
`

export const AddButton = styled.button<{ disabled?: boolean }>`
  padding: 10px;
  background-color: ${props => props.disabled ? '#ccc' : '#28a745'};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #218838;
  }
`

export const FilterPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
  font-style: italic;
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`

export const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c82333;
  }
`

export const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`