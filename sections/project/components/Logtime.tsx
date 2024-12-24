'use client'

import { useMemo, useState } from 'react'

import { Select } from 'antd'
import { useAtomValue } from 'jotai'

import { LogtimeTable } from './LogtimeTable'
import { Typography } from '@/components'
import { useListOfProjectManagement } from '@/hooks/useProjectManagement'
import { useListOfTaskManagement } from '@/hooks/useTaskManagement'
import { currentUserState } from '@/states/users'
import { isAdminRole } from '@/utils/commons'

export const Logtime = () => {
  const [projectId, setProjectId] = useState<any>()
  const userValue = useAtomValue(currentUserState)
  const { listOfProjectManagement } = useListOfProjectManagement({
    isPagination: false,
    currentUserId: userValue && isAdminRole(userValue),
  })

  const { listOfTaskManagement } = useListOfTaskManagement({
    isPagination: false,
  })

  const task = useMemo(() => {
    const taskByProject = listOfTaskManagement?.find(
      (item) => item.projectId?._id === projectId,
    )
    return taskByProject
  }, [projectId, listOfTaskManagement])

  const projectOption =
    listOfProjectManagement?.map((item) => ({
      label: item.projectName,
      value: item._id,
    })) || []

  return (
    <div className="p-3 flex flex-col">
      <Typography text="List Log time" fontWeight={true} />
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
        task ? (
          <LogtimeTable task={task} />
        ) : (
          <span className="text-center">
            No log time found for this project
          </span>
        )
      ) : (
        <span className="text-center">
          Please select a project to view log time
        </span>
      )}
    </div>
  )
}
