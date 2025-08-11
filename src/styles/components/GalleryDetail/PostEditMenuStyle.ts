import styled from 'styled-components'

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 4px 0;
  z-index: 100;
`

export const MenuItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  padding: 8px 12px;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`
