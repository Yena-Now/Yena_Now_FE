import styled from 'styled-components'

export const FrameCutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const FrameImageContainer = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  height: 100%;
`

export const FrameWrapper = styled.div<{ urlCount: number }>`
  display: ${({ urlCount }) => (urlCount === 6 ? 'grid' : 'flex')};
  ${({ urlCount }) =>
    urlCount === 6
      ? `
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 20px;
      `
      : `
        flex-direction: column;
        gap: 20px;
      `}
  width: 30%;
  background-color: black;
  padding: 20px;
  flex-wrap: wrap;
`
export const FrameSelectionContainer = styled.div`
  flex: 4;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
`

export const FrameImageBox = styled.div<{ isSelected: boolean }>`
  width: 200px;
  height: auto;
  border: ${({ isSelected }) =>
    isSelected ? '2px solid blue' : '1px solid gray'};
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
`

export const FrameImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`

export const ImageStrip = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`
