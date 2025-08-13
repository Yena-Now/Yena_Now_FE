import styled from 'styled-components'

export const NCutLayout = styled.div`
  display: flex;
  min-height: calc(100vh - 150px);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const NCutCreateLayout = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: auto;
    padding: 10px;
    min-height: calc(100vh - 120px);
  }
`

export const NcutCreateContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 2px 2px 4px #ccc;
  flex-direction: column;
  padding: 40px 20px;

  @media (max-width: 768px) {
    max-width: 100%;
    height: auto;
    padding: 20px 10px;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 1px 1px 2px #ccc;
  }

  @media (max-width: 480px) {
    border: none;
    box-shadow: none;
    padding: 10px 5px;
  }
`

export const NavigationButtonsContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 -40px; /* 컨테이너 밖으로 버튼이 나오도록 */
  pointer-events: none; /* 컨테이너는 클릭 방지, 버튼만 클릭 가능하도록 */

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    transform: none;
    justify-content: center;
    gap: 40px;
    margin-top: 30px;
    padding: 0;
  }

  @media (max-width: 480px) {
    gap: 30px;
    margin-top: 20px;
  }
`

export const NCutCreateContentContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`

export const NcutCreateHeader = styled.h1`
  font-size: 46px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 15px;
  }
`

export const NcutCreateDescription = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 6px;
  }
`

export const NcutCreateSubDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 15px;
  }
`

export const NCutButtonWrapper = styled.div`
  width: 65px;
  height: 65px;
  pointer-events: all;
  margin: 0 30px;

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
  }
`

export const NCutNextButton = styled.button`
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
  font-size: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0a607;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: 16px;
  }
`

export const NCutPrvButton = styled.button`
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
  font-size: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0a607;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: 16px;
  }
`
export const ProgressBar = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    position: relative;
    bottom: auto;
    margin-top: 30px;
  }

  @media (max-width: 480px) {
    margin-top: 20px;
  }
`

export const ProgressBarItem = styled.div<{ isActive: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? '#f9be08' : '#ccc')};
  margin: 0 10px;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
    margin: 0 8px;
  }

  @media (max-width: 480px) {
    width: 12px;
    height: 12px;
    margin: 0 6px;
  }
`
