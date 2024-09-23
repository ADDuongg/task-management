import React from 'react'

interface IconProps {
  IconComponent: React.ComponentType
  size?: number
  color?: string
}

export const Icon: React.FC<IconProps> = ({
  IconComponent,
  size = 33,
  color,
}) => {
  return (
    <span style={{ fontSize: size, color }}>
      <IconComponent />
    </span>
  )
}
