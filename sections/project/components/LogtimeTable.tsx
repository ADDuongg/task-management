'use client'

import React, { useState } from 'react'

import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons'
import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
} from 'antd'
import { TableProps } from 'antd/lib'

import { deleteLogtime } from '@/action'
import { FlexContainer, Icon, Typography } from '@/components'
import { dataActivity } from '@/constants'
import { useHandleDataTable } from '@/hooks/useHandleDataTable'
import { useDeleteLogtime, useListOfLogtime } from '@/hooks/useLogtime'
import { useListOfProjectManagement } from '@/hooks/useProjectManagement'
import { ModalLogtime } from '@/modules/Task/Logtime'
import {
  ActionData,
  LogtimeInterface,
  SortEnum,
  TaskInterface,
  UsersInterface,
} from '@/types'

const { Option } = Select
export const LogtimeTable = () => {
  const {
    sort,
    filter,
    page,
    limit,
    search,
    setPage,
    clearSort,
    clearFilter,
    clearAll,
    handleSortChange,
    handleFilterChange,
    getSortOrder,
    handleLimitChange,
    handleSearchChange,
  } = useHandleDataTable<LogtimeInterface>()
  const { listOfLogtime, pagination, isLoading } = useListOfLogtime({
    page,
    limit,
    filter,
    sort,
    search,
  })
  const { deleteLogtime, isPending } = useDeleteLogtime()
  const { totalPages, currentPage, pageSize } = pagination || {}
  const itemsActionTable = [
    {
      key: '1',
      label: <Button onClick={clearAll}>Clear All</Button>,
    },
    {
      key: '2',
      label: <Button onClick={clearFilter}>Clear Filters</Button>,
    },
    {
      key: '3',
      label: <Button onClick={clearSort}>Clear Sorts</Button>,
    },
  ]
  const renderActionTable = () => (
    <div className="flex justify-between items-center gap-x-3">
      <Dropdown
        trigger={['click']}
        menu={{
          items: itemsActionTable,
        }}
        placement="bottomRight"
      >
        <Icon
          IconComponent={MenuFoldOutlined}
          size={16}
          className="cursor-pointer dark:text-white"
          onClick={() => {}}
        />
      </Dropdown>
    </div>
  )
  const [openModalLogtime, setOpenModalLogtime] = useState(false)
  const [dataUpdate, setDataUpdate] = useState<LogtimeInterface>()
  const itemFilter = dataActivity?.map((item, index) => ({
    key: index,
    label: (
      <div className="flex gap-x-3" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          onChange={(e) =>
            handleFilterChange('activity', item.value, e.target.checked)
          }
        />
        {item.label}
      </div>
    ),
  }))
  const { listOfProjectManagement } = useListOfProjectManagement({
    isPagination: false,
  })
  const columns: TableProps<LogtimeInterface>['columns'] = [
    {
      title: 'ID',
      dataIndex: '_id',
      sorter: true,
    },
    {
      title: 'User',
      dataIndex: 'userId',
      render: (userId: UsersInterface) => <div>{userId.username}</div>,
    },
    {
      title: 'Task',
      dataIndex: 'taskId',
      render: (taskId: TaskInterface) => <div>{taskId.subject}</div>,
    },
    {
      dataIndex: 'activity',
      render: (activity: string) => <div>{activity}</div>,
      title: (
        <FlexContainer justifyContent="space-between">
          Activity
          <FlexContainer justifyContent="flex-end">
            <div
              className="cursor-pointer"
              onClick={() => handleSortChange('activity')}
            >
              {getSortOrder('activity') === SortEnum.ASC ? (
                <Icon IconComponent={SortAscendingOutlined} size={16} />
              ) : getSortOrder('activity') === SortEnum.DESC ? (
                <Icon IconComponent={SortDescendingOutlined} size={16} />
              ) : (
                <Icon IconComponent={SortAscendingOutlined} size={16} />
              )}
            </div>
            <Dropdown
              menu={{
                items: itemFilter,
              }}
              trigger={['click']}
            >
              <div className="cursor-pointer">
                <Icon IconComponent={FilterOutlined} size={16} />
              </div>
            </Dropdown>
          </FlexContainer>
        </FlexContainer>
      ),
    },
    {
      title: 'Hours',
      dataIndex: 'timeLogtime',
    },
    {
      title: (
        <FlexContainer justifyContent="space-between">
          Date
          <FlexContainer justifyContent="flex-end">
            <div
              className="cursor-pointer"
              onClick={() => handleSortChange('dateLogtime')}
            >
              {getSortOrder('dateLogtime') === SortEnum.ASC ? (
                <Icon IconComponent={SortAscendingOutlined} size={16} />
              ) : getSortOrder('dateLogtime') === SortEnum.DESC ? (
                <Icon IconComponent={SortDescendingOutlined} size={16} />
              ) : (
                <Icon IconComponent={SortAscendingOutlined} size={16} />
              )}
            </div>
          </FlexContainer>
        </FlexContainer>
      ),
      dataIndex: 'dateLogtime',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
    },
    {
      title: 'Action',
      align: 'center',
      dataIndex: '_id',
      fixed: 'right',
      width: 100,
      render: (_id, record) => (
        <Space key={`actions-${_id}`} size="middle">
          <div
            onClick={() => {
              setOpenModalLogtime(true)
              setDataUpdate(record)
            }}
            className="flex gap-x-3 !text-blackSmall-100 justify-between dark:text-white"
          >
            <EditOutlined
              key={`edit`}
              className="cursor-pointer hover:opacity-70 text-darkBlue-200 text-xl"
            />
          </div>
          <Popconfirm
            key={`delete`}
            title={'Confirm'}
            placement="left"
            description={'Are you sure you want to delete this user?'}
            onConfirm={() => deleteLogtime(_id)}
            cancelText={'Cancel'}
            okText={'OK'}
            okButtonProps={{
              loading: isPending,
            }}
            cancelButtonProps={{
              type: 'primary',
              danger: true,
            }}
          >
            <DeleteOutlined className="cursor-pointer text-xl" />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const projectOption = listOfProjectManagement?.map((item) => ({
    label: item.projectName,
    value: item._id,
  }))
  console.log('listOfProjectManagement[0]?._id', projectOption[0]?.value)
  return (
    <div className="p-3">
      <Typography text="List Log time" fontWeight={true} />
      <Select
        defaultValue={[
          {
            label: 'Choose project',
            value: listOfProjectManagement[0]?._id,
          },
        ]}
        style={{ width: 140, marginTop: 10 }}
        options={projectOption}
      />
      <div className="flex flex-row justify-between xl:items-center items-start gap-y-5 my-5">
        <FlexContainer className="!w-1/2" justifyContent="flex-end">
          <Input
            size="large"
            placeholder="Search Task"
            prefix={<SearchOutlined />}
            className="w-full"
            onChange={handleSearchChange}
          />
          <Select
            size="large"
            defaultValue={10}
            style={{ width: 120 }}
            onChange={handleLimitChange}
          >
            <Option value={1}>1</Option>
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
            <Option value={100}>100</Option>
          </Select>
        </FlexContainer>
        {renderActionTable()}
      </div>
      <Table
        dataSource={listOfLogtime}
        columns={columns}
        rowKey={(record: LogtimeInterface) => record._id}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalPages,
          onChange: (page) => setPage(page),
          showSizeChanger: false,
        }}
        bordered
        scroll={{ x: 1300 }}
        loading={isLoading}
      />
      {openModalLogtime && (
        <ModalLogtime
          open={openModalLogtime}
          onCancel={() => setOpenModalLogtime(false)}
          action={ActionData.UPDATE}
          dataUpdate={dataUpdate}
        />
      )}
    </div>
  )
}
