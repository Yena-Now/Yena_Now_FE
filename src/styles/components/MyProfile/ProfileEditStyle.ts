import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 3rem;
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container {
    width: 100%;
    padding: 0;
  }
  .react-datepicker__input-container input {
    width: 100%;
  }
`

export const Box = styled.div`
  width: 30vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
    padding-top: 2rem;
    margin-top: 1rem;
  }
`
export const ProfileSection = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`

export const EditSection = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`

export const EditSubBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  color: black;
  transition: all 0.3s ease;
`

export const ImageChangeInput = styled.input`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  display: none;
`

export const ImageChangeText = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const ImageChangeIcon = styled.span`
  margin-left: 0.5rem;
  text-align: center;
  cursor: pointer;
`

export const ImageDeleteButton = styled.button`
  font-size: 0.9rem;
  font-weight: 500;
  border: 0;
  background: transparent;
  color: black;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
`

export const ImageIcon = styled.span`
  margin-top: 3px;
`

export const TitleText = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin: 3rem 2rem;
`

export const Label = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-start;
  font-weight: 600;
  color: #34495e;
  font-size: 0.95rem;
`

export const Input = styled.input`
  width: 70%;
  height: 45px;
  border: 2px solid #e8f0fe;
  border-radius: 12px;
  outline: none;
  padding: 0 1rem;
  background-color: #f8fafc;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #667eea;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`

export const InputWrapper = styled.div`
  display: flex;
  width: 70%;
  margin: 0;
  padding: 0;
  align-items: center;
  gap: 0.5rem;
`

export const NickNameInput = styled(Input)`
  flex: 1;
  margin-right: 0;
`

export const NickNameCheckButton = styled.button.attrs((props) => ({
  disabled: props.disabled,
}))<{ disabled: boolean }>`
  flex: 0 0 auto;
  min-width: 100px;
  height: 45px;
  border: none;
  border-radius: 12px;
  background: ${(props) =>
    props.disabled
      ? 'linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 0 1rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
`

export const DatePickerWrapper = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
`

export const DatePicker = styled.input`
  width: 100%;
  height: 45px;
  border: 2px solid #e8f0fe;
  border-radius: 12px;
  outline: none;
  padding: 0 1rem;
  background-color: #f8fafc;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #667eea;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`

export const GenderBox = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 70%;
  gap: 2rem;
`

export const GenderInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input[type='radio'] {
    width: 18px;
    height: 18px;
    accent-color: #667eea;
    cursor: pointer;
  }

  label {
    font-size: 0.95rem;
    color: #34495e;
    cursor: pointer;
    font-weight: 500;
  }
`

export const PasswordChangeButton = styled.button`
  color: white;
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  width: 70%;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  padding: 0.75rem 0;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(74, 85, 104, 0.4);
  }
`

export const GoBackSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 30%;
`

export const DeleteButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  border: none;
  color: #fff;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  }
`

export const EditButton = styled.button`
  border: none;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  border-radius: 12px;
  margin-left: 1rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(72, 187, 120, 0.4);
  }
`
