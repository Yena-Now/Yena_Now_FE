import styled, { css } from 'styled-components'
import type { ButtonProps } from '@/types/ButtonType'

const variantStyles = {
  dark: css`
    background-color: #4d4d4d;
    color: #fff;

    &:hover {
      filter: brightness(90%);
    }
  `,
  lightGray: css`
    background-color: #dddddd;
    color: #444444;

    &:hover {
      filter: brightness(95%);
    }
  `,
  following: css`
    background-color: #55acee;
    color: #fff;
    border-radius: 8px;
    font-size: 14px;
    width: 100px;
    height: 40px;

    &:hover {
      filter: brightness(95%);
    }
  `,
  follow: css`
    background-color: white;
    color: #444444;
    border-radius: 8px;
    font-size: 14px;
    width: 100px;
    height: 40px;

    &:hover {
      background-color: #f5f5f5;
    }
  `,
  yellow: css`
    background-color: #f2c94c;
    color: #444444;

    &:hover {
      filter: brightness(95%);
    }
  `,
}

const sizeStyles = {
  sm: css`
    width: 100px;
    height: 40px;
    font-size: 12px;
  `,
  md: css`
    width: 200px;
    height: 50px;
    font-size: 14px;
  `,
  lg: css`
    width: 400px;
    height: 60px;
    font-size: 16px;
  `,
}

export const StyledButton = styled.button<ButtonProps>`
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  border-radius: 30px;

  &:active {
    transform: scale(0.97);
  }

  ${({ variant }) => variant && variantStyles[variant]}
  ${({ size, variant }) =>
    variant === 'follow' || variant === 'following'
      ? ''
      : size && sizeStyles[size]}
`
