import styled from 'styled-components'

export const SelectCutsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  margin-top: 60px;
`

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`

export const SliderButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #0056b3;
  }
`

export const SliderImageContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-x: hidden;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
  max-width: 80%;
`

export const ThumbnailWrapper = styled.div<{ $isActive: boolean }>`
  position: relative;
  cursor: pointer;
  border: ${({ $isActive }) =>
    $isActive ? '3px solid #007bff' : '2px solid #ddd'};
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
`

export const ThumbnailImage = styled.img`
  width: 180px;
  height: 100px;
  object-fit: cover;
  display: block;
`

export const SelectionBadge = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: rgba(255, 87, 34, 0.9);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`

export const PreviewContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;
  display: flex;
`

export const CurrentSelectionCount = styled.p`
  margin: 0 20px;
  font-size: 18px;
  color: #333;
  font-weight: bold;
`

export const PreviewImageWrapper = styled.div<{ $isSelected: boolean }>`
  display: inline-block;
  position: relative;
  border: ${({ $isSelected }) =>
    $isSelected ? '4px solid #28a745' : '2px solid #ddd'};
  border-radius: 10px;
  overflow: hidden;
  width: 800px;
  height: calc(800px * 0.5625);
`

export const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`

export const SelectedLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #28a745;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: bold;
`

export const ImageCounter = styled.p`
  margin: 10px 0;
  color: #666;
  font-size: 14px;
`

export const ButtonContainer = styled.div`
  text-align: center;
`

export const SelectButton = styled.button<{
  $isSelected: boolean
  $disabled?: boolean
}>`
  padding: 15px 30px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? '#dc3545' : '#28a745'};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  font-size: 16px;
  font-weight: bold;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background-color: ${({ $isSelected }) =>
      $isSelected ? '#c82333' : '#218838'};
  }
`

export const LimitMessage = styled.p`
  margin-top: 10px;
  color: #dc3545;
  font-size: 14px;
`

export const NoImagesContainer = styled.div`
  text-align: center;
  padding: 40px;

  h2 {
    color: #666;
  }

  p {
    color: #888;
    margin-top: 10px;
  }
`
