import styled from 'styled-components'

export const Title = styled.span`
  width: 20%;
  text-align: center;
  font-weight: bold;
`
export const Content = styled.span`
  width: 80%;
  text-align: center;
`

export const EditSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`

export const EditText = styled.span`
  font-size: small;
  color: grey;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.3s ease;

  &:hover {
    color: #764ba2;
    transform: translateX(-2px);
  }
`

export const EmptyContent = styled.span`
  color: #a0aec0;
  font-style: italic;
`
