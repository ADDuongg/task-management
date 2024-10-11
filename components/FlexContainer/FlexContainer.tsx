import React from 'react'

type FlexValue =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'baseline'

interface FlexContainerProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justifyContent?: FlexValue
  alignContent?: FlexValue
  justifyItems?: FlexValue
  alignItems?: FlexValue
  gapX?: string
  gapY?: string
  children: React.ReactNode
  className?: string
}

export const FlexContainer: React.FC<FlexContainerProps> = ({
  direction = 'row',
  justifyContent,
  justifyItems,
  alignContent = 'center',
  alignItems,
  gapX = '10px',
  gapY,
  children,
  className,
}) => {
  return (
    <div
      className={`${className}`}
      style={{
        display: 'flex',
        flexDirection: direction,
        justifyContent,
        justifyItems,
        alignContent,
        alignItems,
        gap: `${gapY || '0'} ${gapX || '0'}`,
      }}
    >
      {children}
    </div>
  )
}
