import styled from 'styled-components'

export const Container = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Box = styled.div`
  width: 30vw;
  /* border: 1px solid blue; */
  display: flex;
  justify-content: space-between;
  padding: 20px;
`
export const EditSection = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`

export const ImageEditButton = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`

export const TitleText = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin: 24px;
`

export const Label = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
`

export const Input = styled.input`
  width: 60%;
  height: 20px;
`

export const GenderBox = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
`

export const GenderInput = styled.div`
  display: flex;
  align-items: center;
  width: 35%;
`

export const PasswordChangeButton = styled.button`
  color: white;
  background-color: #4d4d4d;
  width: 60%;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  padding: 0.5rem 0;
`

export const DeleteButton = styled.button`
  background-color: #ff4f4f;
  border: none;
  color: #fff;
  border-radius: 5px;
  padding: 0.5rem 1.2rem;

  cursor: pointer;
`

export const EditButton = styled.button`
  border: none;
  background-color: #d9d9d9;
  border-radius: 5px;
  margin-left: 20px;
  padding: 0.5rem 1.2rem;

  cursor: pointer;
`
