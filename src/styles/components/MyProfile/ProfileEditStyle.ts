import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
`

export const Box = styled.div`
  width: 30vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`
export const ProfileSection = styled.div`
  margin-bottom: 2rem;
`
export const EditSection = styled.div`
  width: 30%;
  margin: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`
export const EditSubBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const ImageChangeInput = styled.input`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  display: none;
`
export const ImageChangeText = styled.label`
  font-size: 1rem;
  margin-right: 0.3rem;
  display: flex;
  align-items: center;
`

export const ImageChangeIcon = styled.span`
  margin-left: 0.3rem;
  text-align: center;
  cursor: pointer;
`

export const ImageDeleteButton = styled.button`
  font-size: 1rem;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`

export const TitleText = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin: 3rem 2rem;
`

export const Label = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
`

export const Input = styled.input`
  width: 60%;
  height: 20px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding: 0.5rem 10px;
  background-color: rgb(233, 233, 233);
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
