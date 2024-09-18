import React from 'react'

import { QuestionOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const HelpCenter = () => {
  return (
    <div className="w-full h-[280px] bg-blackSmall-100 rounded-xl text-center text-white relative z-10 flex flex-col justify-end items-center pb-10">
      <div className="px-4 space-y-3 pb-10">
        <div className="font-semibold">Help Center</div>
        <div>
          Having Trouble in Learning. Please contact us for more questions.
        </div>
      </div>
      <Button className="bg-white text-black border-none font-semibold px-8 py-5">
        Go To Help Center
      </Button>
      <div className="border border-blackSmall-100 bg-white rounded-full p-1 h-16 w-16 absolute -top-8 left-2/4 -translate-x-2/4 z-20">
        <div className="w-full h-full bg-blackSmall-100 rounded-full flex justify-center items-center text-2xl">
          <QuestionOutlined />
        </div>
      </div>
    </div>
  )
}

export default HelpCenter
