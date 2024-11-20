import React from 'react'

interface RenderListDataProps<T> {
  data: T[]
  renderComponent: (item: T, index: number) => React.ReactNode
  className?: string
}

export function RenderListData<T>({
  data,
  renderComponent,
  className = '',
}: RenderListDataProps<T>) {
  return (
    <>
      {data.map((item, index) => (
        <div className={className} key={index}>
          {renderComponent(item, index)}
        </div>
      ))}
    </>
  )
}
