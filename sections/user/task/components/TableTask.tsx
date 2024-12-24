'use client'

import React, { useState } from 'react'

import {
  ClockCircleOutlined,
  DashOutlined,
  DeleteFilled,
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
import { useAtomValue } from 'jotai'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { FlexContainer, Icon, Typography } from '@/components'
import { useHandleDataTable } from '@/hooks/useHandleDataTable'
import {
  useDeleteTask,
  useListOfTaskManagement,
} from '@/hooks/useTaskManagement'
import { ModalLogtime } from '@/modules/Task/Logtime'
import { userRoleState } from '@/states/users'
import { ActionData, SortEnum, TaskInterface, UsersInterface } from '@/types'

const { Option } = Select
export const TableTask = ({ projectId }: { projectId: string }) => {
  const router = useRouter()
  const role = useAtomValue(userRoleState)
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
  } = useHandleDataTable<TaskInterface>()
  const { listOfTaskManagement, pagination, isLoading } =
    useListOfTaskManagement({
      page,
      limit,
      filter,
      sort,
      search,
      projectId,
    })
  const { deleteTask, isPending } = useDeleteTask()
  const { totalPages, currentPage, pageSize } = pagination || {}
  const [openModalLogtime, setOpenModalLogtime] = useState(false)
  const [task, setTask] = useState<TaskInterface>()
  const itemsActionRow = (task: TaskInterface) => {
    return [
      {
        key: '2',
        label: (
          <div
            className="flex gap-x-3 !text-blackSmall-100 justify-between dark:text-white"
            onClick={() => {
              setOpenModalLogtime(true)
              setTask(task)
            }}
          >
            <ClockCircleOutlined className="cursor-pointer hover:opacity-70 text-darkBlue-200 text-xl" />
            Logtime
          </div>
        ),
      },
      {
        key: '3',
        label: (
          <Link
            rel="noopener noreferrer"
            href={`/dashboard/${role}/task/${task._id}/edit`}
            className="flex gap-x-3 !text-blackSmall-100 justify-between dark:text-white"
          >
            <EditOutlined
              key={`edit`}
              className="cursor-pointer hover:opacity-70 text-darkBlue-200 text-xl"
              onClick={() => {}}
            />
            Edit
          </Link>
        ),
      },
      {
        key: '4',
        label: (
          <Popconfirm
            key={`delete`}
            title={'Confirm'}
            placement="left"
            description={'Are you sure you want to delete this user?'}
            onConfirm={() => deleteTask(task._id)}
            cancelText={'Cancel'}
            okText={'OK'}
            cancelButtonProps={{
              type: 'primary',
              danger: true,
            }}
            okButtonProps={{
              loading: isPending,
            }}
          >
            <div className="flex gap-x-3  justify-between text-red-500">
              <DeleteFilled className="cursor-pointer  text-xl" />
              Delete
            </div>
          </Popconfirm>
        ),
      },
    ]
  }
  const columns: TableProps<TaskInterface>['columns'] = [
    {
      title: 'ID',
      dataIndex: '_id',
      sorter: true,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
    },
    {
      title: 'Task Owner',
      dataIndex: 'taskOwner',
      render: (taskOwner: UsersInterface) => <div>{taskOwner.username}</div>,
    },
    {
      dataIndex: 'assignTo',
      render: (assignTo: UsersInterface) => <div>{assignTo.username}</div>,
      title: (
        <FlexContainer justifyContent="space-between">
          Position
          <FlexContainer justifyContent="flex-end">
            <div
              className="cursor-pointer"
              onClick={() => handleSortChange('assignTo')}
            >
              {getSortOrder('assignTo') === SortEnum.ASC ? (
                <Icon IconComponent={SortAscendingOutlined} size={16} />
              ) : getSortOrder('assignTo') === SortEnum.DESC ? (
                <Icon IconComponent={SortDescendingOutlined} size={16} />
              ) : (
                <Icon IconComponent={SortAscendingOutlined} size={16} />
              )}
            </div>
          </FlexContainer>
        </FlexContainer>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      render: (createdAt: string) => (
        <div>{moment(createdAt).format('DD/MM/YYYY')}</div>
      ),
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
    },
    {
      title: 'Due date',
      dataIndex: 'dueDate',
    },
    {
      title: '% Done',
      dataIndex: 'done',
    },
    {
      title: 'Estimate time',
      dataIndex: 'estimateTime',
    },
    {
      title: (
        <FlexContainer justifyContent="space-between">
          Status
          <FlexContainer justifyContent="flex-end">
            <div
              className="cursor-pointer"
              onClick={() => handleSortChange('status')}
            >
              {getSortOrder('status') === SortEnum.ASC ? (
                <Icon IconComponent={SortAscendingOutlined} size={16} />
              ) : getSortOrder('status') === SortEnum.DESC ? (
                <Icon IconComponent={SortDescendingOutlined} size={16} />
              ) : (
                <Icon IconComponent={SortAscendingOutlined} size={16} />
              )}
            </div>
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: (
                      <div
                        className="flex gap-x-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          onChange={(e) =>
                            handleFilterChange(
                              'status',
                              'open/todo',
                              e.target.checked,
                            )
                          }
                        />
                        Open/Todo
                      </div>
                    ),
                  },
                  {
                    key: '2',
                    label: (
                      <div
                        className="flex gap-x-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          onChange={(e) =>
                            handleFilterChange(
                              'status',
                              'doing',
                              e.target.checked,
                            )
                          }
                        />
                        Doing
                      </div>
                    ),
                  },
                  {
                    key: '3',
                    label: (
                      <div
                        className="flex gap-x-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          onChange={(e) =>
                            handleFilterChange(
                              'status',
                              'review',
                              e.target.checked,
                            )
                          }
                        />
                        Review
                      </div>
                    ),
                  },
                ],
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
      dataIndex: 'status',
    },

    {
      title: 'Action',
      align: 'center',
      dataIndex: '_id',
      fixed: 'right',
      width: 100,
      render: (_id, record) => (
        <Space key={`actions-${_id}`} size="middle">
          <Dropdown
            trigger={['click']}
            menu={{
              items: itemsActionRow(record),
            }}
            placement="bottomRight"
          >
            <Icon
              IconComponent={DashOutlined}
              className="cursor-pointer"
              onClick={() => {}}
              size={16}
            />
          </Dropdown>
        </Space>
      ),
    },
  ]
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

      <Button onClick={() => router.push(`/dashboard/${role}/task/create`)}>
        Add new task
      </Button>
    </div>
  )
  return (
    <div className="p-3">
      <Typography text="List task" fontWeight={true} />
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
        dataSource={listOfTaskManagement}
        columns={columns}
        rowKey={(record: TaskInterface) => record._id}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalPages,
          onChange: (page) => setPage(page),
          showSizeChanger: false,
        }}
        bordered
        scroll={{ x: 1300, y: 500 }}
        loading={isLoading}
      />
      {openModalLogtime && task && (
        <ModalLogtime
          open={openModalLogtime}
          onCancel={() => setOpenModalLogtime(false)}
          task={task}
          action={ActionData.CREATE}
        />
      )}
    </div>
  )
}
