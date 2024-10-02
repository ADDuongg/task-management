'use client'

import React, { useState } from 'react'

import { FileDoneOutlined } from '@ant-design/icons'
import { Button, Input, message } from 'antd'
import Image from 'next/image'

import forgotPass from '@/assets/images/forgotPass.png'
import { FlexContainer, Icon, Typography } from '@/components'
import { forgotPassword } from '@/services'

const Login = () => {
  const [emailSend, setEmailSend] = useState('')

  const handleForgotPassword = async () => {
    if (!emailSend) {
      message.error('Please enter your email')
      return
    }
    await forgotPassword(emailSend)
      .then((res) => {
        message.success(res.message)
      })
      .catch((error) => {
        message.error(error.response?.data.message)
      })
  }

  return (
    <div className="w-[1200px] mx-auto max-w-[80%] h-auto border border-1 rounded-lg shadow-sm p-8 flex gap-x-5 lg:flex-row flex-col">
      <div className="lg:w-[40%] w-full h-full flex flex-col items-start gap-5">
        <FlexContainer>
          <Icon
            IconComponent={FileDoneOutlined}
            className="!text-blueSmall-100"
          />
          <Typography
            className="!flex !justify-center !items-center"
            text="Tasky"
            color="blueSmall-100"
            fontWeight={true}
          />
        </FlexContainer>
        <FlexContainer gapY="30px" direction="column">
          <Typography text="Forgot password!" level={1} fontWeight={true} />

          <Input
            size="large"
            placeholder="Enter your email to reset password"
            onChange={(e) => setEmailSend(e.target.value)}
          />

          <Button
            htmlType="submit"
            className="w-full p-6"
            onClick={handleForgotPassword}
          >
            Send
          </Button>
        </FlexContainer>
      </div>
      <div className="flex-1">
        <Image className="w-full h-full" src={forgotPass} alt="image" />
      </div>
    </div>
  )
}

export default Login
