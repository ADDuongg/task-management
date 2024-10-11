import React, { useCallback, useState } from 'react'

import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
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
import Image from 'next/image'

import ModalCreateUser from './ModalCreateUser'
import ModalUpdateUser from './ModalUpdateUser'
import { FlexContainer, Icon } from '@/components'
import { useDebounce } from '@/hooks/useDebounce'
import {
  useDeleteUser,
  useListOfUserManagement,
  useUsersRole,
} from '@/hooks/useUserManagement'
import {
  SortEnum,
  UsersInterface,
  filterInterface,
  sortInterface,
} from '@/types'

const { Option } = Select
const TableUser = () => {
  const [page, setPage] = useState<number>(1)
  const [sort, setSort] = useState<sortInterface[]>([])
  const [filter, setFilter] = useState<filterInterface[]>([])
  const [limit, setLimit] = useState<number>(5)
  const [search, setSearch] = useState<string>('')
  const [openModalCreateUser, setOpenModalCreateUser] = useState<boolean>(false)
  const [openModalUpdateUser, setOpenModalUpdateUser] = useState<boolean>(false)
  const [user, setUser] = useState<UsersInterface>()

  const debouncedSearchTerm = useDebounce(search, 300)
  const { listOfUserManagement, pagination, isLoading } =
    useListOfUserManagement({
      page,
      limit,
      filter,
      sort,
      search: debouncedSearchTerm,
    })
  const { listOfUserRole } = useUsersRole()
  const { deleteUser, isPending } = useDeleteUser()
  const { totalPages, currentPage, pageSize } = pagination || {}

  const handleSortChange = useCallback(
    (field: string) => {
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
    (column: keyof UsersInterface, value: string, checked: boolean) => {
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
    (field: string) => {
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

  const handleSearchChange = useCallback(() => {
    ;(e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    }
  }, [setSearch])

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
  console.log(listOfUserRole)

  const handleOpenModaCreatelUser = () => {
    setOpenModalCreateUser(true)
  }
  const handleOpenModaUpdatelUser = (user: UsersInterface) => {
    setUser(user)
    setOpenModalUpdateUser(true)
  }

  const columns: TableProps<UsersInterface>['columns'] = [
    {
      title: 'ID',
      dataIndex: '_id',
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      render: (avatar: string) => (
        <div className="flex justify-center items-center">
          <Image
            alt="avatar"
            src={avatar}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '80px', height: '80px', borderRadius: '100%' }}
          />
        </div>
      ),
      width: 150,
    },
    {
      title: (
        <FlexContainer justifyContent="space-between">
          Position
          <FlexContainer justifyContent="flex-end">
            <div
              className="cursor-pointer"
              onClick={() => handleSortChange('position')}
            >
              {getSortOrder('avatar') === SortEnum.ASC ? (
                <Icon IconComponent={SortAscendingOutlined} size={16} />
              ) : getSortOrder('avatar') === SortEnum.DESC ? (
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
                              'position',
                              'Project manager',
                              e.target.checked,
                            )
                          }
                        />
                        Project manager
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
                              'position',
                              'Leader',
                              e.target.checked,
                            )
                          }
                        />
                        Leader
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
      dataIndex: 'position',
    },
    {
      title: (
        <FlexContainer justifyContent="space-between">
          Role
          <FlexContainer justifyContent="flex-end">
            <div
              className="cursor-pointer"
              onClick={() => handleSortChange('account_role')}
            >
              {getSortOrder('account_role') === SortEnum.ASC ? (
                <Icon IconComponent={SortAscendingOutlined} size={16} />
              ) : getSortOrder('account_role') === SortEnum.DESC ? (
                <Icon IconComponent={SortDescendingOutlined} size={16} />
              ) : (
                <Icon IconComponent={SortAscendingOutlined} size={16} />
              )}
            </div>
            <Dropdown
              menu={{
                items: listOfUserRole.map((role: string, index: number) => ({
                  key: index.toString(),
                  label: (
                    <div
                      className="flex gap-x-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        onChange={(e) =>
                          handleFilterChange(
                            'account_role',
                            role,
                            e.target.checked,
                          )
                        }
                      />
                      {role.toUpperCase()}
                    </div>
                  ),
                })),
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
      dataIndex: 'account_role',
    },
    {
      title: 'Action',
      align: 'center',
      dataIndex: '_id',
      fixed: 'right',
      width: 100,
      render: (_id, record) => (
        <Space key={`actions-${_id}`} size="middle">
          <Tooltip title={'Update'}>
            <EditOutlined
              key={`edit-${_id}`}
              className="cursor-pointer hover:opacity-70 text-darkBlue-200 text-xl"
              onClick={() => handleOpenModaUpdatelUser(record)}
            />
          </Tooltip>
          <Popconfirm
            key={`delete-${_id}`}
            title={'Confirm'}
            placement="left"
            description={'Are you sure you want to delete this user?'}
            onConfirm={() => deleteUser(_id)}
            cancelText={'Cancel'}
            okText={'OK'}
            cancelButtonProps={{
              type: 'primary',
              danger: true,
              loading: isPending,
            }}
          >
            <Tooltip title={'Delete'}>
              <DeleteOutlined className="cursor-pointer hover:opacity-70 text-red-100 text-xl" />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  return (
    <>
      <div className="flex flex-col xl:flex-row justify-between xl:items-center items-start gap-y-5 my-5">
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
        <FlexContainer className="w-1/2 mt-3" justifyContent="flex-end">
          <Button onClick={clearFilter}>Clear Filters</Button>
          <Button onClick={clearSort}>Clear Sorts</Button>
          <Button onClick={clearAll}>Clear Filters and Sorters</Button>
          <Button onClick={() => handleOpenModaCreatelUser()}>Add user</Button>
        </FlexContainer>
      </div>
      <Table
        dataSource={listOfUserManagement}
        columns={columns}
        rowKey={(record: UsersInterface) => record._id}
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

      {openModalCreateUser && (
        <ModalCreateUser
          openModal={openModalCreateUser}
          setOpenModal={setOpenModalCreateUser}
        />
      )}
      {openModalUpdateUser && user && (
        <ModalUpdateUser
          openModal={openModalUpdateUser}
          setOpenModal={setOpenModalUpdateUser}
          user={user}
        />
      )}
    </>
  )
}

export default TableUser
