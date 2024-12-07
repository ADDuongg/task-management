'use client'

import React, { useCallback, useState } from 'react'

import {
  DashOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Pagination,
  Popconfirm,
  Select,
  Tooltip,
} from 'antd'

import { deleteProject } from '@/action/project'
import { FlexContainer, Icon, RenderListData } from '@/components'
import { useDebounce } from '@/hooks/useDebounce'
import { useListOfProjectManagement } from '@/hooks/useProjectManagement'
import {
  ModalCreateProject,
  ModalUpdateProject,
  ModalViewProject,
} from '@/modules/Project'
import {
  ActionData,
  ProjectInterface,
  ProjectStatus,
  filterInterface,
} from '@/types'

const { Option } = Select
const ProjectGrid = () => {
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<filterInterface<ProjectInterface>[]>([])
  const [limit, setLimit] = useState<number>(10)
  const [search, setSearch] = useState<string>('')

  const [modalState, setModalState] = useState<{
    create: boolean
    view: boolean
    update: boolean
    project: ProjectInterface | null
  }>({
    create: false,
    view: false,
    update: false,
    project: null,
  })

  const debouncedSearchTerm = useDebounce(search, 300)
  const { listOfProjectManagement, pagination } = useListOfProjectManagement({
    page,
    limit,
    filter,
    search: debouncedSearchTerm,
  })
  const { totalPages, currentPage, pageSize } = pagination || {}

  const handleFilterChange = useCallback(
    (column: keyof ProjectInterface, value: string) => {
      setFilter(value !== '' ? [{ field: column, value: [value] }] : [])
    },
    [setFilter],
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

  const handleOpenModal = (type: ActionData, project?: ProjectInterface) => {
    setModalState((prevState) => ({
      ...prevState,
      [type]: true,
      project: project || null,
    }))
  }

  const handleCloseModal = (type: ActionData) => {
    setModalState((prevState) => ({
      ...prevState,
      [type]: false,
      project: null,
    }))
  }

  const handleDeleteProject = async (id: string) => {
    await deleteProject(id)
  }

  const itemsEditTask = (project: ProjectInterface) => {
    return [
      {
        key: '2',
        label: (
          <div
            className="flex gap-x-3 w-full"
            onClick={() => handleOpenModal(ActionData.VIEW, project)}
          >
            <EyeOutlined className="cursor-pointer hover:opacity-70 text-darkBlue-200 text-xl" />
            <span>View</span>
          </div>
        ),
      },
      {
        key: '3',
        label: (
          <div
            className="flex gap-x-3 w-full"
            onClick={() => handleOpenModal(ActionData.UPDATE, project)}
          >
            <EditOutlined className="cursor-pointer hover:opacity-70 text-darkBlue-200 text-xl" />
            Edit
          </div>
        ),
      },
      {
        key: '4',
        label: (
          <Popconfirm
            title={'Confirm'}
            placement="left"
            description={'Are you sure you want to delete this project ?'}
            onConfirm={() => handleDeleteProject(project._id)}
            cancelText={'Cancel'}
            okText={'OK'}
            cancelButtonProps={{
              type: 'primary',
              danger: true,
            }}
          >
            <div className="flex gap-x-3">
              <DeleteOutlined className="cursor-pointer hover:opacity-70 text-red-500 text-xl" />
              Delete
            </div>
          </Popconfirm>
        ),
      },
    ]
  }

  return (
    <>
      <div className="flex flex-col xl:flex-row justify-between xl:items-center items-start gap-y-5 my-5">
        <FlexContainer className="!w-1/2" justifyContent="flex-end">
          <Input
            placeholder="Search Task"
            prefix={<SearchOutlined />}
            className="w-full"
            onChange={handleSearchChange}
          />
          <Select
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
        <FlexContainer className="w-1/2 " justifyContent="flex-end">
          <Select
            style={{ width: 120 }}
            onChange={(value) => handleFilterChange('status', value)}
            defaultValue=""
          >
            <Option value="">All Status</Option>
            <Option value="open">Open</Option>
            <Option value="close">Close</Option>
          </Select>

          <Button onClick={() => handleOpenModal(ActionData.CREATE)}>
            Add Project
          </Button>
        </FlexContainer>
      </div>
      <div className="grid xxl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 auto-rows-auto gap-4 space-y-0">
        <RenderListData
          data={listOfProjectManagement}
          renderComponent={(item) => (
            <div className="p-4 border-2 border-solid rounded-md flex justify-between">
              <div>
                <div className="flex dark:text-white">
                  Project name: {item.projectName}
                </div>
                <div className="flex dark:text-white">
                  Number of tasks: {item.taskId?.length}
                </div>
                <div className="flex items-center dark:text-white">
                  Members:
                  <Avatar.Group
                    max={{
                      count: 3,
                      style: {
                        color: '#f56a00',
                        backgroundColor: '#fde3cf',
                      },
                    }}
                  >
                    {item.userId.map((user) => (
                      <Tooltip title={user.username} key={user._id}>
                        <Avatar src={user.avatar} alt={user.username} />
                      </Tooltip>
                    ))}
                  </Avatar.Group>
                </div>

                <div className="flex dark:text-white">
                  Status: {item.status as ProjectStatus}
                </div>
              </div>
              <Dropdown
                trigger={['click']}
                menu={{
                  items: itemsEditTask(item),
                }}
                placement="topRight"
              >
                <Icon
                  IconComponent={DashOutlined}
                  className="cursor-pointer dark:text-white"
                  onClick={() => {}}
                  size={24}
                />
              </Dropdown>
            </div>
          )}
        />
      </div>
      <Pagination
        className="mt-4"
        current={currentPage}
        pageSize={pageSize}
        total={totalPages}
        onChange={(page) => setPage(page)}
      />
      {modalState.create && (
        <ModalCreateProject
          open={modalState.create}
          onCancel={() => handleCloseModal(ActionData.CREATE)}
        />
      )}
      {modalState.update && modalState.project && (
        <ModalUpdateProject
          open={modalState.update}
          onCancel={() => handleCloseModal(ActionData.CREATE)}
          updateProject={modalState.project}
        />
      )}
      {modalState.view && modalState.project && (
        <ModalViewProject
          open={modalState.view}
          onCancel={() => handleCloseModal(ActionData.VIEW)}
          updateProject={modalState.project}
        />
      )}
    </>
  )
}

export default ProjectGrid
