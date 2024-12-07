'use client'

import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

import { HomeOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Select,
  Upload,
  UploadProps,
} from 'antd'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import { FlexContainer } from '@/components'
import { useUpdateUser } from '@/hooks/useUserManagement'
import { userRoleState } from '@/states/users'
import { UsersInterface } from '@/types'

const CustomUpload = styled(Upload)`
  .ant-upload-select {
    width: 80% !important;
    display: block !important;
  }
`
const { TextArea } = Input
const { Option } = Select
export const Profile = ({ profile }: { profile: UsersInterface }) => {
  const role = useAtomValue(userRoleState)
  const { control, setValue, errors, updateUser, isPending } =
    useUpdateUser(profile)
  const [fileUploaded, setFileUploaded] = useState<File | null>(null)
  const defaultAvatar = profile.avatar

  const onChange = (value: any) => {
    const { file } = value
    setFileUploaded(file)
    setValue('avatar', file)
  }
  console.log('fileUploaded', fileUploaded)

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: (
              <>
                <HomeOutlined />
                <Link href={`/dashboard/${role}`}>Home</Link>
              </>
            ),
          },
          {
            title: 'Profile',
          },
        ]}
      />

      <div className="w-[85%] flex justify-between items-start gap-x-3 mx-auto pt-3">
        {/* left side */}
        <div
          style={{ flex: 3 }}
          className="flex flex-col gap-y-10 bg-whiteSmall-100 dark:bg-blackSmall-100 rounded-lg p-5 h-[500px]"
        >
          <div className="flex items-center justify-center">
            <Image
              src={
                fileUploaded
                  ? URL.createObjectURL(fileUploaded)
                  : defaultAvatar || '/default-avatar.png'
              }
              width={300}
              height={300}
              alt="avatar"
              style={{ width: '200px', height: '200px', borderRadius: '100%' }}
            />
          </div>

          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <Form.Item className="d-flex justify-center w-full mb-0">
                <CustomUpload
                  {...field}
                  beforeUpload={() => false}
                  onChange={onChange}
                  showUploadList={false}
                  rootClassName="flex justify-center items-center"
                  children={
                    <Button
                      className="w-full mx-auto"
                      icon={<UploadOutlined />}
                    >
                      Upload
                    </Button>
                  }
                ></CustomUpload>
              </Form.Item>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Description"
                layout="vertical"
                className="flex-1"
              >
                <TextArea {...field} placeholder="Enter description" rows={4} />
              </Form.Item>
            )}
          />
        </div>

        {/* right side */}
        <div
          style={{ flex: 7 }}
          className="w-full bg-whiteSmall-100 rounded-lg p-5 space-y-4 dark:bg-blackSmall-100 h-[500px]"
        >
          <FlexContainer justifyContent="space-between">
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Please enter your email!' }}
              render={({ field }) => (
                <Form.Item
                  layout="vertical"
                  label="Email"
                  validateStatus={errors.email ? 'error' : ''}
                  help={errors.email?.message}
                  className="flex-1"
                >
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    size="large"
                  />
                </Form.Item>
              )}
            />

            <Controller
              name="username"
              control={control}
              rules={{ required: 'Please enter your username!' }}
              render={({ field }) => (
                <Form.Item
                  layout="vertical"
                  className="flex-1"
                  label="Username"
                  validateStatus={errors.username ? 'error' : ''}
                  help={errors.username?.message}
                >
                  <Input
                    size="large"
                    {...field}
                    placeholder="Enter your username"
                  />
                </Form.Item>
              )}
            />

            <Controller
              name="account_role"
              control={control}
              rules={{ required: 'Please select an account role!' }}
              render={({ field }) => (
                <Form.Item
                  layout="vertical"
                  label="Account Role"
                  validateStatus={errors.account_role ? 'error' : ''}
                  help={errors.account_role?.message}
                  className="flex-1"
                >
                  <Select
                    size="large"
                    {...field}
                    placeholder="Select an account role"
                  >
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                    <Option value="moderator">Moderator</Option>
                  </Select>
                </Form.Item>
              )}
            />
          </FlexContainer>

          <FlexContainer justifyContent="space-between">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="Password"
                  validateStatus={errors.password ? 'error' : ''}
                  help={errors.password?.message}
                  className="flex-1"
                >
                  <Input.Password
                    size="large"
                    {...field}
                    placeholder="Enter your password"
                  />
                </Form.Item>
              )}
            />

            <Controller
              name="confirm_password"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="Confirm Password"
                  validateStatus={errors.confirm_password ? 'error' : ''}
                  help={errors.confirm_password?.message}
                  className="flex-1"
                >
                  <Input.Password
                    size="large"
                    {...field}
                    placeholder="Confirm your password"
                  />
                </Form.Item>
              )}
            />

            <Controller
              name="specialization"
              control={control}
              render={({ field }) => (
                <Form.Item label="Specialization" className="flex-1">
                  <Input
                    size="large"
                    {...field}
                    placeholder="Enter your specialization"
                  />
                </Form.Item>
              )}
            />
          </FlexContainer>

          <FlexContainer justifyContent="space-between">
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="Position"
                  className="flex-1"
                  layout="vertical"
                >
                  <Input
                    size="large"
                    {...field}
                    placeholder="Enter your position"
                  />
                </Form.Item>
              )}
            />

            <Controller
              name="phone_number"
              control={control}
              render={({ field }) => (
                <Form.Item label="Phone Number" layout="vertical">
                  <Input
                    size="large"
                    {...field}
                    placeholder="Enter your phone number"
                  />
                </Form.Item>
              )}
            />

            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Form.Item label="Date" layout="vertical">
                  <Input size="large" type="date" {...field} />
                </Form.Item>
              )}
            />
          </FlexContainer>

          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <Form.Item label="Skills" layout="vertical">
                <Select
                  size="large"
                  mode="tags"
                  placeholder="Enter your skills"
                  {...field}
                >
                  <Option value="JavaScript">JavaScript</Option>
                  <Option value="React">React</Option>
                  <Option value="Node.js">Node.js</Option>
                </Select>
              </Form.Item>
            )}
          />

          <div className="flex justify-end items-center">
            <Button size="large" loading={isPending} onClick={updateUser}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
