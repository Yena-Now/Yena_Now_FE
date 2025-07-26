import React, { useState, forwardRef } from 'react'
import * as S from '@styles/components/Common/InputStyle'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSubmitCustom?: (value: string) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onSubmitCustom, ...props }, ref) => {
    const [value, setValue] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (onSubmitCustom) onSubmitCustom(value)
        setValue('')
      }
    }

    const handleClick = () => {
      if (onSubmitCustom) onSubmitCustom(value)
      setValue('')
    }
    return (
      <S.InputContainer>
        <S.InputField
          ref={ref}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder=""
          {...props}
        />
        <S.SendButton type="button" onClick={handleClick}>
          ↗
        </S.SendButton>
      </S.InputContainer>
    )
  },
)

export default Input
