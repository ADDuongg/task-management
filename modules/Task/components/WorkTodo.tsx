/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { UseFormSetValue } from 'react-hook-form'

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'

import { Icon, Typography } from '@/components'
import { TaskFormRequest } from '@/types'

interface WorkTodo {
  todos: string[]
  setTodos: React.Dispatch<string[]>
  setValue: UseFormSetValue<TaskFormRequest>
  getValues: any
}

export const WorkTodo: React.FC<WorkTodo> = ({ todos, setTodos, setValue }) => {
  const handleAddTodo = () => {
    setTodos([...todos, ''])
  }

  const handleTodoChange = (index: number, value: string) => {
    const updatedTodos = [...todos]
    updatedTodos[index] = value
    setTodos(updatedTodos)
    setValue('workToDo', updatedTodos)
  }
  const handleDeleteTodo = (indexTodo: number) => {
    const newTodos = todos.filter((item, index) => index !== indexTodo)
    setTodos(newTodos)
  }
  return (
    <div>
      <div className="flex justify-between">
        <Typography text="Work to do" fontWeight={true} level={3} />
        <Button onClick={handleAddTodo}>
          <Icon IconComponent={PlusOutlined} size={16} />
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-y-4 ">
        {todos.map((item, index) => (
          <div
            className="flex justify-start items-center gap-x-4 !mb-3"
            key={index}
          >
            <div className="bg-graySmall-100 w-9 h-9 flex justify-center items-center rounded-lg ">
              {index + 1}
            </div>
            <Input
              type="text"
              value={item}
              onChange={(e) => handleTodoChange(index, e.target.value)}
              className="w-full"
              size="large"
            />
            <Button onClick={() => handleDeleteTodo(index)}>
              <Icon IconComponent={DeleteOutlined} size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
