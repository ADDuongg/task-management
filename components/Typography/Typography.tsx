'use client'

import React from 'react'

import { Typography as TypographyAntd } from 'antd'

type LevelTypes = 5 | 1 | 2 | 3 | 4

interface TypographyProps {
  level?: LevelTypes
  color?: string
  fontWeight?: boolean
  text?: string
  className?: string
  onClick?: () => void
  classNameText?: string
}

export const Typography: React.FC<React.PropsWithChildren<TypographyProps>> = ({
  level = 4,
  fontWeight = false,
  text,
  className,
  onClick,
  classNameText,
}) => {
  const { Title } = TypographyAntd
  return (
    <div className={className} onClick={onClick}>
      <Title
        level={level}
        style={{
          fontWeight: fontWeight ? '500' : 'normal',
          margin: 0,
        }}
        className={classNameText}
      >
        {text}
      </Title>
    </div>
  )
}
