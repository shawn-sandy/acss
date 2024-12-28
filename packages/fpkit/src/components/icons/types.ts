import { ComponentProps } from '#/types'

export interface IconProps extends Partial<ComponentProps> {
  fill?: string
  size?: | 16 | 24 | 32 | 48 | 64 | 96 | 128
  strokeColor?: string
  strokeWidth?: string
  role?: string
  alt?: string
  width?: number
  height?: number
}
