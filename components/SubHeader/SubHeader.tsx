import React from 'react'

import { FilterFilled, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'

const SubHeader = () => {
  return (
    <div className="w-full bg-white px-8 flex justify-between py-10">
      <Input
        size="large"
        placeholder="Search Task"
        prefix={<SearchOutlined />}
        className="w-[20%]"
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
export default SubHeader
