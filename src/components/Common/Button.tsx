import React from 'react'
import { StyledButton } from '@styles/components/Common/ButtonStyle'
import type { ButtonProps } from '@/types/ButtonType.ts'

const Button = ({
  variant = 'dark',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

export default Button
