/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'

import { InboxOutlined } from '@ant-design/icons'
import { message } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { UploadFile } from 'antd/lib'

import { Icon } from '@/components'
import { TaskFormRequest } from '@/types'

interface UploadFileTaskProps {
  setValue: UseFormSetValue<TaskFormRequest>
  getValues: any
}

export const UploadFileTask: React.FC<UploadFileTaskProps> = ({
  setValue,
  getValues,
}) => {
  const [files, setFiles] = useState<UploadFile[]>([])
  useEffect(() => {
    const fileUrls = getValues('files') || []
    const mappedFiles = fileUrls.map((url: string, index: number) => ({
      uid: `${index}`,
      name: url.split('/').pop() || `File-${index}`,
      status: 'done',
      url,
    }))
    setFiles(mappedFiles)
  }, [])
  const handleChange = (info: any) => {
    const { fileList } = info

    setFiles(fileList)
    setValue(
      'files',
      fileList.map((item: any) => item.originFileObj || item.url),
    )

    const { status } = info.file
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  const onRemove = (file: UploadFile) => {
    const newFileList = files.filter((item) => item.uid !== file.uid)
    const newFileList2 = [].map((item: any) => item.originFileObj || item.url)
    setFiles(newFileList)
    setValue('files', newFileList2)
  }
  return (
    <div>
      <Dragger
        className="h-auto block"
        onChange={handleChange}
        onRemove={onRemove}
        listType="picture"
        fileList={files}
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
