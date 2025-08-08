import styled from 'styled-components'

export const NCutCreateLayout = styled.div`
  position: absolute;
  top: 150px;
  width: 100%;
  height: calc(100% - 150px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const NcutCreateContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  height: calc(100% - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 2px 2px 4px #ccc;
  flex-direction: column;
`

export const NCutCreateContentContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NcutCreateHeader = styled.h1`
  font-size: 46px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
`

export const NcutCreateDescription = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
`

export const NcutCreateSubDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: 30px;
  text-align: center;
`

export const NCutButtonWrapper = styled.div`
  position: relative;
  width: 65px;
  height: 65px;
  margin: 0 20px;
`

export const NCutNextButton = styled.button`
  position: relative;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: none;
  background-color: #f9be08;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 20px;
`

export const NCutPrvButton = styled.button`
  position: relative;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: none;
  background-color: #f9be08;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 20px;
`

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 5%;
  width: 100%;
  display: flex;
  justify-content: center;
`

export const ProgressBarItem = styled.div<{ isActive: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? '#f9be08' : '#ccc')};
  margin: 0 10px;
  transition: background-color 0.3s ease;
`
