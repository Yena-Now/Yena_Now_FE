import styled from 'styled-components'

export const LogoWrapper = styled.div<{ marginTop?: string }>`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: ${(props) => props.marginTop || '0'};
  padding: var(--spacing-2);
  
  @media (max-width: 768px) {
    height: 60px;
  }
`

export const LogoImage = styled.img`
  max-height: 60px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
  transition: transform var(--transition);
  
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    max-height: 40px;
  }
`
