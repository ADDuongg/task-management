/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Controller, UseFormSetValue } from 'react-hook-form'
import { Control, FieldErrors } from 'react-hook-form'

import { PlusOutlined } from '@ant-design/icons'
import {
  Form,
  GetProp,
  Input,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd'

import { FlexContainer } from '@/components'
import { ActionData, UserFormRequest, UsersInterface } from '@/types'

const { TextArea } = Input
const { Option } = Select

interface UserFormProps {
  control: Control<UserFormRequest>
  watch: (name?: string) => any
  errors: FieldErrors<UsersInterface>
  action: ActionData
  setValue: UseFormSetValue<UserFormRequest>
  defaultAvatar?: string
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
const UserForm: React.FC<UserFormProps> = ({
  control,
  errors,
  setValue,
  defaultAvatar,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if (fileList.length > 0) {
      return
    }
    setFileList(newFileList)

    if (newFileList.length > 0) {
      const fileObj = newFileList[0].originFileObj
      setValue('avatar', fileObj)
    } else {
      setValue('avatar', undefined)
    }
  }

  useEffect(() => {
    if (defaultAvatar) {
      setFileList([
        {
          uid: '-1',
          name: 'avatar.png',
          status: 'done',
          url: defaultAvatar,
        },
      ])
    }
  }, [defaultAvatar])

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as FileType)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const onRemove = (file: UploadFile) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid)
    setFileList(newFileList)
    setValue('avatar', undefined)
  }

  return (
    <>
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
              <Input {...field} placeholder="Enter your email" />
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
              <Input {...field} placeholder="Enter your username" />
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
              <Select {...field} placeholder="Select an account role">
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
              <Input.Password {...field} placeholder="Enter your password" />
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
              <Input.Password {...field} placeholder="Confirm your password" />
            </Form.Item>
          )}
        />

        <Controller
          name="specialization"
          control={control}
          render={({ field }) => (
            <Form.Item label="Specialization" className="flex-1">
              <Input {...field} placeholder="Enter your specialization" />
            </Form.Item>
          )}
        />
      </FlexContainer>

      <FlexContainer justifyContent="space-between">
        <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <Form.Item label="Position" className="flex-1" layout="vertical">
              <Input {...field} placeholder="Enter your position" />
            </Form.Item>
          )}
        />

        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <Form.Item label="Phone Number" layout="vertical">
              <Input {...field} placeholder="Enter your phone number" />
            </Form.Item>
          )}
        />

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <Form.Item label="Date" layout="vertical">
              <Input type="date" {...field} />
            </Form.Item>
          )}
        />
      </FlexContainer>

      <Controller
        name="skills"
        control={control}
        render={({ field }) => (
          <Form.Item label="Skills" layout="vertical">
            <Select mode="tags" placeholder="Enter your skills" {...field}>
              <Option value="JavaScript">JavaScript</Option>
              <Option value="React">React</Option>
              <Option value="Node.js">Node.js</Option>
            </Select>
          </Form.Item>
        )}
      />

      <FlexContainer justifyContent="space-between">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Form.Item label="Description" layout="vertical" className="flex-1">
              <TextArea {...field} placeholder="Enter description" rows={4} />
            </Form.Item>
          )}
        />

        <Form.Item layout="vertical" name="avatar">
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <Form.Item label="Avatar" layout="vertical">
                <Upload
                  {...field}
                  listType="picture-card"
                  beforeUpload={() => false}
                  onChange={onChange}
                  onPreview={onPreview}
                  onRemove={onRemove}
                  fileList={fileList}
                >
                  {fileList.length === 0 && (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            )}
          />
        </Form.Item>
      </FlexContainer>
    </>
  )
}

export default UserForm
