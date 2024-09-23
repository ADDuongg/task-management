import React from 'react'

import { FilterFilled, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'

export const SubHeader = () => {
  return (
    <div className="w-full bg-white px-8 flex justify-between pb-10">
      <Input
        size="large"
        placeholder="Search Task"
        prefix={<SearchOutlined />}
        className="lg:w-1/3 w-2/4"
      />
      <Button
        className="font-bold bg-white text-blackSmall-100 text-lg"
        size="large"
        icon={<FilterFilled />}
      >
        SortBy: Deadline
      </Button>
    </div>
  )
}
