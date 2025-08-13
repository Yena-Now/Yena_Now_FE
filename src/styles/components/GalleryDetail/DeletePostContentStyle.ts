import styled from 'styled-components'

export const Container = styled.div`
  text-align: center;
  padding: 10px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`

export const YesButton = styled.button`
  background-color: #444;
  color: white;
  padding: 6px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #222;
  }
`

export const NoButton = styled.button`
  background-color: white;
  color: black;
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`
