import React from 'react'

interface IconProps {
  IconComponent: React.ComponentType
  size?: number
  color?: string
  className?: string
}

export const Icon: React.FC<IconProps> = ({
  IconComponent,
  size = 33,
  color,
  className,
}) => {
  return (
    <span
      className={className}
      style={{ fontSize: size, color: `var(--color-${color})` }}
    >
      <IconComponent />
    </span>
  )
}
