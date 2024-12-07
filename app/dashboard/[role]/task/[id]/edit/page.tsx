import { cookies } from 'next/headers'

import { UpdateTask } from '@/modules/Task/UpdateTask'

const UpdateTaskPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  const res = await fetch(`http://localhost:3000/api/task?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
    next: { revalidate: 10 },
  })
  const data = await res.json()

  return (
    <div className="h-full">
      <UpdateTask updateTaskData={data.task} />
    </div>
  )
}

export default UpdateTaskPage
