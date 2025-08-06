import styled from 'styled-components'

export const Dropdown = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  min-width: 150px;
  z-index: 20;
  overflow: hidden;
`

export const MenuItem = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 10px 14px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #f3f3f3;
  }
`
