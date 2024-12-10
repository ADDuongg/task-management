'use client'

import React, { useState } from 'react'

import { FileDoneOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { useSetAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import taskImage from '@/assets/images/taskImage2.png'
import { FlexContainer, Icon, Typography } from '@/components'
import { loginUser } from '@/services'
import { userRoleState } from '@/states/users'
import { RoleEnum } from '@/types'

interface loginType {
  email: string
  password: string
}

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const setRole = useSetAtom(userRoleState)
  const router = useRouter()

  const onFinish = (values: loginType) => {
    setIsSubmitting(true)
    loginUser(values.email, values.password)
      .then((res) => {
        const userRole = res.user.account_role
        setRole(userRole)
        router.push(`dashboard/${[userRole as RoleEnum]}`)
        message.success('Login successful!')
      })
      .catch((error) => {
        if (error instanceof Error) {
          message.error(error.message)
        } else {
          message.error('An unexpected error occurred.')
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="dark:bg-blackSmall-100 w-[1200px] mx-auto max-w-[80%] h-auto border border-1 rounded-lg shadow-sm p-8 flex gap-x-5 lg:flex-row flex-col">
      <div className="lg:w-[40%] w-full h-full flex flex-col items-start gap-5">
        <span className="text-red-500 md:hidden">sss</span>
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
        <Typography text="Welcome Back!" level={1} fontWeight={true} />
        <Typography
          text="Please enter your login details below"
          color="blackSmall-100"
          level={5}
        />
        <Form
          className="w-full space-y-4 h-auto"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            className="w-full"
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input size="large" placeholder="Enter the email" />
          </Form.Item>
          <Form.Item
            className="w-full"
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" placeholder="Enter the Password" />
          </Form.Item>
          <FlexContainer justifyContent="flex-end">
            <Typography
              onClick={() => router.push('forgot-pass')}
              text="Forgot your password?"
              level={5}
              fontWeight={true}
              className="cursor-pointer"
            />
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
          <Typography text="Don't have an account yet?" />
          <Link
            href={'/register'}
            className="underline text-blueSmall-100 mt-1 font-bold"
          >
            Sign Up
          </Link>
        </FlexContainer>
      </div>
      <div className="flex-1">
        <Image
          className="w-full h-full"
          src={taskImage}
          alt="image"
          width={1200}
          height={800} // Thay đổi chiều cao theo tỉ lệ của hình ảnh
        />
      </div>
    </div>
  )
}

export default Login
