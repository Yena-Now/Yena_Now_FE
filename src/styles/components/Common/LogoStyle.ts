import styled from 'styled-components'

export const LogoWrapper = styled.div<{ marginTop?: string }>`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: ${(props) => props.marginTop || '0'};
`

export const LogoImage = styled.img`
  max-height: 80px;
  max-width: 100%;
  object-fit: contain;
  margin: 0 auto;
  display: block;

  @media (max-width: 768px) {
    height: 60px;
    max-height: 50px;
  }
`
