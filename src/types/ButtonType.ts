export type ButtonVariant =
  | 'dark'
  | 'lightGray'
  | 'following'
  | 'follow'
  | 'yellow'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children?: React.ReactNode
}
