/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { InboxOutlined } from '@ant-design/icons'
import { message } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { UploadFile } from 'antd/lib'

import { Icon } from '@/components'

interface UploadFileTaskProps {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const UploadFileTask: React.FC<UploadFileTaskProps> = ({ files, setFiles }) => {
  const handleChange = (info: any) => {
    const { fileList } = info
    const newFileList = fileList.map((item: any) => item.originFileObj)
    setFiles(newFileList)

    const { status } = info.file
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  return (
    <div>
      <Dragger
        className="h-auto block"
        onChange={handleChange}
        listType="picture"
      >
        <Icon IconComponent={InboxOutlined} color="blueSmall-100" />
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </div>
  )
}

export default UploadFileTask
