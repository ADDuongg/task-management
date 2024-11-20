import React, { useCallback, useState } from 'react'

import {
  ClockCircleOutlined,
  DashOutlined,
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
  Tooltip,
} from 'antd'
import { TableProps } from 'antd/lib'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { FlexContainer, Icon, Typography } from '@/components'
import { useDebounce } from '@/hooks/useDebounce'
import { useListOfTaskManagement } from '@/hooks/useTaskManagement'
import {
  RoleEnum,
  SortEnum,
  TaskInterface,
  UsersInterface,
  filterInterface,
  sortInterface,
} from '@/types'

const itemsEditTask = (_id: string) => {
  return [
    {
      key: '2',
      label: (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="flex gap-x-3 !text-blackSmall-100 justify-between"
        >
          <ClockCircleOutlined
            className="cursor-pointer hover:opacity-70 text-darkBlue-200 text-xl"
            onClick={() => {}}
          />
          Logtime
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="flex gap-x-3 !text-blackSmall-100 justify-between"
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
          onConfirm={() => {}}
          cancelText={'Cancel'}
          okText={'OK'}
          cancelButtonProps={{
            type: 'primary',
            danger: true,
          }}
        >
          <div className="flex gap-x-3 !text-blackSmall-100 justify-between">
            <DeleteOutlined className="cursor-pointer hover:opacity-70 text-red-100 text-xl" />
            Delete
          </div>
        </Popconfirm>
      ),
    },
  ]
}

const { Option } = Select
const TableTask = () => {
  const router = useRouter()
  const [page, setPage] = useState<number>(1)
  const [sort, setSort] = useState<sortInterface[]>([])
  const [filter, setFilter] = useState<filterInterface<TaskInterface>[]>([])
  const [limit, setLimit] = useState<number>(5)
  const [search, setSearch] = useState<string>('')
  const [task, setTask] = useState<UsersInterface>()

  const debouncedSearchTerm = useDebounce(search, 300)
  const { listOfTaskManagement, pagination, isLoading } =
    useListOfTaskManagement({
      page,
      limit,
      filter,
      sort,
      search: debouncedSearchTerm,
    })
  const { totalPages, currentPage, pageSize } = pagination || {}

  const handleSortChange = useCallback(
    (field: keyof TaskInterface) => {
      setSort((prevFields) => {
        const existingField = prevFields?.find((f) => f.field === field)
        if (existingField) {
          return prevFields?.map((f) =>
            f.field === field
              ? {
                  ...f,
                  order:
                    f.order === SortEnum.ASC ? SortEnum.DESC : SortEnum.ASC,
                }
              : f,
          )
        } else {
          return [...prevFields, { field, order: SortEnum.ASC }]
        }
      })
    },
    [setSort],
  )

  const handleFilterChange = useCallback(
    (column: keyof TaskInterface, value: string, checked: boolean) => {
      setFilter((prevFilter) => {
        const existingFilter = prevFilter.find(
          (filterItem) => filterItem.field === column,
        )

        if (existingFilter) {
          if (checked) {
            if (!existingFilter.value.includes(value)) {
              return prevFilter.map((filterItem) =>
                filterItem.field === column
                  ? { ...filterItem, value: [...filterItem.value, value] }
                  : filterItem,
              )
            }
          } else {
            return prevFilter
              .map((filterItem) =>
                filterItem.field === column
                  ? {
                      ...filterItem,
                      value: filterItem.value.filter((v) => v !== value),
                    }
                  : filterItem,
              )
              .filter((filterItem) => filterItem.value.length > 0)
          }
        } else {
          return checked
            ? [...prevFilter, { field: column, value: [value] }]
            : prevFilter
        }

        return prevFilter
      })
    },
    [setFilter],
  )

  const getSortOrder = useCallback(
    (field: keyof TaskInterface) => {
      const sortField = sort?.find((f) => f.field === field)
      return sortField ? sortField.order : undefined
    },
    [sort],
  )
  const handleLimitChange = useCallback(
    (value: number) => {
      setLimit(value)
    },
    [setLimit],
  )

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    },
    [setSearch],
  )

  const clearSort = useCallback(() => {
    setSort([])
  }, [setSort])

  const clearFilter = useCallback(() => {
    setFilter([])
  }, [setFilter])

  const clearAll = useCallback(() => {
    setSort([])
    setFilter([])
  }, [setSort, setFilter])

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
              items: itemsEditTask(_id),
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
          className="cursor-pointer"
          onClick={() => {}}
        />
      </Dropdown>

      <Button
        onClick={() => router.push(`/dashboard/${RoleEnum.USER}/task/create`)}
      >
        Add new task
      </Button>
    </div>
  )
  return (
    <>
      <Typography text="List task" fontWeight={true} />
      <div className="text-red-500 md:hidden">sdsdsd</div>
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
        scroll={{ x: 1300 }}
        loading={isLoading}
      />
    </>
  )
}

export default TableTask
