import styled from 'styled-components'

export const NoSessionContainer = styled.div`
  padding: 20px;
  text-align: center;
`

export const SessionLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const TakePhotoButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`

export const TakeVideoButton = styled.button<{ isActive?: boolean }>`
  background-color: ${(props) => (props.isActive ? '#f44336' : '#9e9e9e')};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`

export const SessionLayoutContainer = styled.div`
  flex: 1;
  position: relative;
  background: #f0f0f0;
`

export const CanvasContainer = styled.canvas<{ customCursor?: string }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: ${(props) => props.customCursor || 'default'};
  background: transparent;
`

export const CameraSizeRangeContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 5px;
`

export const CameraSizeContainer = styled.div`
  text-align: center;
  padding: 0 10px;
`

export const CameraSizeLabel = styled.label`
  margin-right: 10px;
  font-size: 14px;
`

export const CameraSizeInput = styled.input`
  width: 200px;
`
