import React from 'react'

import { Typography as TypographyAntd } from 'antd'

type LevelTypes = 5 | 1 | 2 | 3 | 4

interface TypographyProps {
  level?: LevelTypes
  color?: string
  fontWeight?: boolean
  text: string
  className?: string
}

export const Typography: React.FC<TypographyProps> = ({
  level = 4,
  color = 'blackSmall-100',
  fontWeight = false,
  text,
  className,
}) => {
  const { Title } = TypographyAntd
  return (
    <div className={className}>
      <Title
        level={level}
        style={{
          color: `var(--color-${color})`,
          fontWeight: fontWeight ? '500' : 'normal',
          margin: 0,
        }}
      >
        {text}
      </Title>
    </div>
  )
}
