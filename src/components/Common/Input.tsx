import React, { useState, forwardRef } from 'react'
import * as S from '@styles/components/Common/InputStyle'

type InputMode = 'comment' | 'chat'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSubmitCustom?: (value: string) => void
  mode?: InputMode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onSubmitCustom, mode = 'comment', placeholder, ...props }, ref) => {
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

    const dynamicPlaceholder =
      placeholder ||
      (mode === 'chat' ? '채팅을 입력하세요' : '댓글을 작성하세요')

    return (
      <S.InputContainer>
        <S.InputField
          ref={ref}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={dynamicPlaceholder}
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
