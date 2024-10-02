'use client'

import React, { useState } from 'react'

import { FileDoneOutlined } from '@ant-design/icons'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Form, Input, message } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import taslImage from '@/assets/images/taskImage2.png'
import { FlexContainer, Icon, Typography } from '@/components'
import { registerUser } from '@/services'
import { registerInterface } from '@/types'

/* eslint-disable @typescript-eslint/no-unused-vars */

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const onFinish = (data: registerInterface) => {
    setIsSubmitting(true)
    registerUser(data)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => console.log(error.response.data.error))
      .finally(() => setIsSubmitting(false))
  }

  return (
    <div className="w-[1200px] mx-auto max-w-[80%] h-auto border border-1 rounded-lg shadow-sm p-8 flex gap-x-5 lg:flex-row flex-col">
      <div className="flex-1">
        <Image className="w-full h-full" src={taslImage} alt="image" />
      </div>
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
        <Typography text="Register" level={1} fontWeight={true} />
        <Typography
          text="Let's get you all set up so you can verify your personal account and begin setting up your profile."
          color="blackSmall-100"
          level={5}
        />
        <Form
          className="w-full space-y-4 h-auto"
          layout="vertical"
          onFinish={onFinish}
          validateTrigger={['onSubmit']}
        >
          <Form.Item
            className="w-full"
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" placeholder="Enter your username" />
          </Form.Item>
          <FlexContainer>
            <Form.Item
              className="w-1/2"
              label="Phone number"
              name="phone_number"
              rules={[
                { required: true, message: 'Please input your Phone number!' },
              ]}
            >
              <Input size="large" placeholder="Enter the Phone number" />
            </Form.Item>
            <Form.Item
              className="w-1/2"
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input size="large" placeholder="Enter the Email" />
            </Form.Item>
          </FlexContainer>

          <FlexContainer>
            <Form.Item
              className="w-1/2"
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password size="large" placeholder="Enter the Password" />
            </Form.Item>
            <Form.Item
              className="w-1/2"
              label="Confirm Password"
              name="confirm_password"
              rules={[
                { required: true, message: 'Please confirm your Password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('The two passwords do not match!'),
                    )
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Confirm your Password"
              />
            </Form.Item>
          </FlexContainer>

          <Button
            htmlType="submit"
            className="w-full p-6"
            loading={isSubmitting}
          >
            Sign in
          </Button>
        </Form>
        <FlexContainer justifyContent="center">
          <Typography text="Already have an account?" />
          <Link
            href={'/login'}
            className="underline text-blueSmall-100 mt-1 font-bold"
          >
            Log in
          </Link>
        </FlexContainer>
      </div>
    </div>
  )
}

export default Register
