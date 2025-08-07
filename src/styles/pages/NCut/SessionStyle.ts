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

export const mainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const SessionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`

export const RemainingTakesCnt = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  display: flex;
  margin-left: calc(50% - 1.5rem);
`

export const LeaveSessionButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
`

export const SessionLayoutContainer = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CanvasContainer = styled.canvas<{ customCursor?: string }>`
  height: 90%;
  object-fit: contain;
  cursor: ${(props) => props.customCursor || 'default'};
  background: transparent;
  margin-bottom: 10px;
`

export const OtherContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 0 1.5rem;
`

export const BackgroundImageContainer = styled.div`
  height: 45%;
  border: 1px solid black;
`

export const ChatContainer = styled.div`
  height: 50%;
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
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-left: 20px;
`

export const CameraSizeLabel = styled.label`
  margin-right: 10px;
  font-size: 14px;
`

export const CameraSizeInput = styled.input`
  width: 150px;
`

export const BrightnessContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-left: 20px;
`

export const BrightnessLabel = styled.label`
  margin-right: 10px;
  font-size: 14px;
`

export const BrightnessInput = styled.input`
  width: 150px;
`

export const SessionFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const TakeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const TakePhotoButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 2rem;
`

export const TakeVideoButton = styled.button<{ isActive?: boolean }>`
  background-color: ${(props) => (props.isActive ? '#f44336' : '#9e9e9e')};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`

export const GoToEditPage = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#2196f3')};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  height: 100%;
`
