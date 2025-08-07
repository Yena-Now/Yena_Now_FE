import styled from 'styled-components'

export const GoBackSection = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
`

export const GoBackText = styled.span`
  font-size: small;
  color: grey;
  cursor: pointer;
`

export const PasswordChangeButton = styled.button<{
  isAvailable: boolean | false
}>`
  width: 60%;
  border-radius: 5px;
  border: none;
  padding: 0.5rem 0;
  background: ${({ isAvailable }) => (isAvailable ? '#575551' : '#e7e7e7')};
  color: ${({ isAvailable }) => (isAvailable ? '#fff' : '#afb1b5')};
  cursor: ${({ isAvailable }) => (isAvailable ? 'pointer' : 'not-allowed')};
`

export const MessageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 30%;
`
export const MatchMessage = styled.span`
  color: green;
  font-size: 0.9rem;
`

export const UnmatchMessage = styled.span`
  color: red;
  font-size: 0.9rem;
`

export const Label = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-between;
`

export const ToolTipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover div {
    opacity: 1;
    visibility: visible;
  }
`

export const ToolTipIcon = styled.span`
  cursor: pointer;
  vertical-align: middle;
`

export const ToolTipContent = styled.div`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #575551;
  color: white;
  padding: 0.4rem 0.7rem;
  border-radius: 4px;
  font-size: 0.85rem;
  white-space: nowrap;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out;
`
