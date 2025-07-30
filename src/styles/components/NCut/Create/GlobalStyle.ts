import styled from 'styled-components'

export const NCutCreateLayout = styled.div`
  position: absolute;
  top: 150px;
  width: 100%;
  height: calc(100% - 150px);
  display: flex;
  flex-direction: column;
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
`

export const NCutCreateIcon = styled.div`
  width: 180px;
  height: 180px;
  background-color: #F9BE08;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  margin: 20px;
`

export const NCutCreateContentContainer = styled.div`
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

export const NCutNextButton = styled.button`
  position: absolute;
  bottom: 50px;
  right: 100px;
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
`
