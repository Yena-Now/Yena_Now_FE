import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: inline-block;
`

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`
