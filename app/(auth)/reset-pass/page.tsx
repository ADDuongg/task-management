'use client'

import React from 'react'

import { FileDoneOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import forgotPass from '@/assets/images/forgotPass.png'
import { FlexContainer, Icon, Typography } from '@/components'
import { resetPassword } from '@/services'
import { resetPasswordInterface } from '@/types'

const Login = () => {
  const emailReset = useSearchParams().get('email')
  console.log(emailReset)

  const handleResetPassword = async (data: resetPasswordInterface) => {
    await resetPassword(emailReset || '', data.newPassword || '')
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
          <Typography text="Reset password!" level={1} fontWeight={true} />
          <Form
            onFinish={handleResetPassword}
            initialValues={{ email: emailReset }}
            layout="vertical"
          >
            <Form.Item
              className="w-full"
              label="Your email account"
              name="email"
            >
              <Input
                size="large"
                placeholder="Enter your email to reset password"
                value={emailReset || ''}
                readOnly
              />
            </Form.Item>
            <Form.Item
              className="w-full"
              label="New password"
              name="newPassword"
            >
              <Input.Password size="large" />
            </Form.Item>
            <Button htmlType="submit" className="w-full p-6">
              Submit
            </Button>
          </Form>
        </FlexContainer>
      </div>
      <div className="flex-1">
        <Image className="w-full h-full" src={forgotPass} alt="image" />
      </div>
    </div>
  )
}

export default Login
