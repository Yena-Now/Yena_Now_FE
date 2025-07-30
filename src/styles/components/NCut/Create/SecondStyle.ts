import styled from 'styled-components'

export const MainImagePreview = styled.div`
  width: 300px;
  height: 200px;
  margin: 20px 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ddd;
`

export const FilterOptionsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
`

export const FilterOption = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  border: 2px solid
    ${(props) => (props.$isSelected ? '#007bff' : 'transparent')};
  background-color: ${(props) =>
    props.$isSelected ? '#f0f8ff' : 'transparent'};
  transition: all 0.2s ease;
`

export const FilterThumbnail = styled.div`
  width: 80px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 5px;
`

export const FilterName = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #333;
`
