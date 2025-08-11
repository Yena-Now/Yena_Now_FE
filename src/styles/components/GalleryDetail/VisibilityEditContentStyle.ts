import styled from 'styled-components'

export const Container = styled.div`
  text-align: center;
`

export const RadioGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  /* margin-top: 10px; */

  label {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }

  input[type='radio'] {
    cursor: pointer;
  }
`

export const Button = styled.button`
  margin-top: 15px;
  padding: 5px 15px;
  background: #444;
  color: #fff;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #333;
  }
`
