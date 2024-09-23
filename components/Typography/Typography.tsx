import React from 'react'

import { Typography as TypographyAntd } from 'antd'

type LevelTypes = 5 | 1 | 2 | 3 | 4 | undefined

interface TypographyProps {
  level?: LevelTypes
  color?: string
  fontWeight?: boolean
  text: string
}

export const Typography: React.FC<TypographyProps> = ({
  level = 4,
  color = 'blackSmall-100',
  fontWeight = false,
  text,
}) => {
  const { Title } = TypographyAntd
  return (
    <div>
      <Title
        level={level}
        style={{
          color: `var(--color-${color})`,
          fontWeight: fontWeight ? 'bold' : 'normal',
          margin: 0,
        }}
      >
        {text}
      </Title>
    </div>
  )
}
