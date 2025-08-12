import styled from 'styled-components'

// 브레이크포인트 정의
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  large: '1200px',
}

export const FrameCutContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 8fr; // 3:8 비율
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #f8f9fa;

  @media (max-width: ${breakpoints.large}) {
    grid-template-columns: 2fr 7fr;
  }

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: 5fr 7fr;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    gap: 15px;
    padding: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
    padding: 10px;
  }
`

export const FrameImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  min-height: 0; // grid overflow 방지

  @media (max-width: ${breakpoints.tablet}) {
    padding: 15px;
    height: 300px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px;
    height: 250px;
  }
`

export const FrameWrapper = styled.div<{
  urlCount: number
}>`
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: ${({ urlCount }) => {
    // 컷 개수에 따른 비율 설정
    switch (urlCount) {
      case 1:
        return '1/1'
      case 2:
        return '1/1.8'
      case 4:
        return '1/1'
      case 6:
        return '2/3'
      default:
        return '2/3'
    }
  }};
  display: ${({ urlCount }) => (urlCount === 6 ? 'grid' : 'flex')};
  ${({ urlCount }) =>
    urlCount === 6
      ? `
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 8px;
      `
      : urlCount === 4
        ? `
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-gap: 8px;
      `
        : `
        flex-direction: column;
        gap: 8px;
      `}
  background-color: #000;
  padding: 15px;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: ${breakpoints.large}) {
    max-width: 350px;
    padding: 12px;
    ${({ urlCount }) => (urlCount === 6 ? 'grid-gap: 6px;' : 'gap: 6px;')}
  }

  @media (max-width: ${breakpoints.desktop}) {
    max-width: 300px;
    padding: 10px;
    ${({ urlCount }) => (urlCount === 6 ? 'grid-gap: 4px;' : 'gap: 4px;')}
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 250px;
    padding: 8px;
    ${({ urlCount }) => (urlCount === 6 ? 'grid-gap: 3px;' : 'gap: 3px;')}
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 200px;
    padding: 6px;
    ${({ urlCount }) => (urlCount === 6 ? 'grid-gap: 2px;' : 'gap: 2px;')}
  }
`

export const FrameSelectionContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 0; // grid overflow 방지

  @media (max-width: ${breakpoints.tablet}) {
    padding: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px;
  }
`

export const FrameSelectionHeader = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e0e0e0;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #333;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 16px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 14px;
    }
  }

  p {
    margin: 5px 0 0 0;
    font-size: 14px;
    color: #666;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 13px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 12px;
    }
  }
`

export const FrameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  overflow-y: auto;
  flex: 1;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${breakpoints.large}) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 18px;
  }

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 15px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;

    &:hover {
      background: #a1a1a1;
    }
  }
`

export const FrameImageBox = styled.div<{
  isSelected: boolean
  disabled?: boolean
}>`
  aspect-ratio: 1;
  border: ${({ isSelected }) =>
    isSelected ? '3px solid #2196f3' : '2px solid #e0e0e0'};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? '0 4px 12px rgba(33, 150, 243, 0.3)'
      : '0 2px 8px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  background-color: #fff;
  position: relative;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover:not([disabled]) {
    border-color: ${({ isSelected }) => (isSelected ? '#1976d2' : '#2196f3')};
    transform: translateY(-2px);
    box-shadow: ${({ isSelected }) =>
      isSelected
        ? '0 6px 16px rgba(33, 150, 243, 0.4)'
        : '0 4px 12px rgba(0, 0, 0, 0.15)'};
  }

  @media (max-width: ${breakpoints.tablet}) {
    border-radius: 8px;
    border-width: ${({ isSelected }) => (isSelected ? '2px' : '1px')};
  }

  @media (max-width: ${breakpoints.mobile}) {
    border-radius: 6px;
  }
`

export const FrameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;

  ${FrameImageBox}:hover:not([disabled]) & {
    transform: scale(1.05);
  }
`

export const ImageStrip = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;

  @media (max-width: ${breakpoints.tablet}) {
    border-radius: 1px;
  }
`

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 8px;

  @media (max-width: ${breakpoints.tablet}) {
    height: 150px;
    font-size: 14px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 120px;
    font-size: 12px;
  }
`

export const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #f44336;
  background-color: #ffebee;
  border-radius: 8px;
  text-align: center;
  padding: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    height: 150px;
    font-size: 14px;
    padding: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 120px;
    font-size: 12px;
    padding: 10px;
  }
`

export const DisabledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
  font-weight: 500;
  pointer-events: none;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 10px;
  }
`
