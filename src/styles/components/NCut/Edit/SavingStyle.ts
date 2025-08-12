import styled from 'styled-components'

export const SavingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
`

export const ResultImage = styled.img`
  width: 40%;
  height: auto;
`

export const InputArea = styled.div`
  width: 40%;
  background-color: #f9f9f9;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  padding: 16px;
  box-sizing: border-box;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`

export const ContentInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  border: none;
  resize: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  color: #333;
  padding: 8px;
  box-sizing: border-box;
  background-color: transparent;
  &::placeholder {
    color: #a0a0a0;
  }
  &:focus {
    outline: none;
  }
`

export const FooterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
`

export const MergeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const VisibilitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Label = styled.span`
  font-size: 14px;
  color: #555;
  white-space: nowrap;
`

const DropdownBase = styled.select`
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  padding: 6px 10px;
  background-color: #f9f9f9;
  font-size: 14px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2%204l4%204%204-4H2z%22%20fill%3D%22%23666%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 8px center;
  padding-right: 25px;

  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`

export const MergeDropdown = styled(DropdownBase)`
  color: #999;
  cursor: not-allowed;
`

export const VisibilityDropdown = styled(DropdownBase)``

const ButtonBase = styled.button`
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
`

export const MergeUserButton = styled(ButtonBase)`
  background-color: #fff;
  border: 1px solid #dcdcdc;
  color: #555;
  &:hover {
    background-color: #f0f0f0;
  }
`

export const ActionButton = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #388e3c;
  }
  &:disabled {
    background-color: #b0bec5;
    cursor: not-allowed;
  }
`
