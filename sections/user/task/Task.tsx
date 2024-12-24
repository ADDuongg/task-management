'use client'

import { useState } from 'react'

import { Select } from 'antd'
import { useAtomValue } from 'jotai'

import { TableTask } from './components'
import { useListOfProjectManagement } from '@/hooks/useProjectManagement'
import { currentUserState } from '@/states/users'
import { isAdminRole } from '@/utils/commons'

export const UserTaskManagement = () => {
  const [projectId, setProjectId] = useState<any>()
  const userValue = useAtomValue(currentUserState)
  const { listOfProjectManagement } = useListOfProjectManagement({
    isPagination: false,
    currentUserId: userValue && isAdminRole(userValue),
  })

  const projectOption =
    listOfProjectManagement?.map((item) => ({
      label: item.projectName,
      value: item._id,
    })) || []
  return (
    <div className="flex flex-col">
      <Select
        defaultValue={[
          {
            label: 'Choose project',
            value: '',
          },
        ]}
        style={{ width: 140, marginTop: 10 }}
        options={projectOption}
        onChange={(e) => {
          setProjectId(e)
        }}
      />
      {projectId ? (
        projectId ? (
          <TableTask projectId={projectId} />
        ) : (
          <span className="text-center dark:text-white">
            No task found for this project
          </span>
        )
      ) : (
        <span className="text-center dark:text-white">
          Please select a project to view task
        </span>
      )}
    </div>
  )
}
