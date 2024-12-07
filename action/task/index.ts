/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { TaskModel } from "@/model";
import { taskServices } from "@/services/task";
import { TaskStatus } from "@/types";
import { deleteImageToCloudinary, uploadImageToCloudinary } from "@/utils/cloudinary";

import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from "next/cache";
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const getTaskById = async (_id: string) => {
    const task = await taskServices.getTaskById(_id);
    return task;
}


export const updateTask = async (id: string ,formData: FormData) => {
    try {
      const taskId = id as string
      const subject = formData.get('subject') as string
      const done = formData.get('done') as string
      const startDate = formData.get('startDate') as string
      const dueDate = formData.get('dueDate') as string
      const assignTo = formData.get('assignTo') as string
      const status = formData.get('status') as string
      const descriptions = formData.get('descriptions') as string | null
      const workToDo = formData.getAll('workToDo') as string[]
      const taskOwner = formData.get('taskOwner') as string
      const estimateTime = formData.get('estimateTime') as string
      const files = formData.getAll('files') as unknown as File[] 

      if (!taskId) {
        return { message: 'Task ID is required', status: 400 }
      }
  
      const task = await TaskModel.findById(taskId)
      if (!task) {
        return { message: 'Task not found', status: 404 }
      }
  
      const existingTaskWithSubject = await TaskModel.findOne({ subject })
      if (existingTaskWithSubject && existingTaskWithSubject._id.toString() !== taskId) {
        return { message: 'Subject already exists', status: 400 }
      }
  
      task.subject = subject || task.subject
      task.done = done ? Number(done) : task.done
      task.startDate = startDate || task.startDate
      task.dueDate = dueDate || task.dueDate
      task.assignTo = assignTo || task.assignTo
      task.status = status as TaskStatus || task.status
      task.descriptions = descriptions || task.descriptions
      task.estimateTime = estimateTime || task.estimateTime
      task.workToDo = workToDo || task.workToDo
      task.taskOwner = taskOwner || task.taskOwner
  
      if (files.length > 0) {
        const newFileUrls = await Promise.all(files.map(uploadImageToCloudinary))
  
        if (task.files && task.files?.length > 0) {
          const filesToDelete = task.files?.filter(fileUrl => !newFileUrls.includes(fileUrl)) || []
          await Promise.all(filesToDelete.map(deleteImageToCloudinary))
        }
  
        task.files = [...newFileUrls]
      }
      await task.save()
      revalidatePath('/');
      return { message: 'Task updated successfully', status: 200 }
    } catch (error) {
      console.error(error)
      return { message: 'An error occurred while updating the task', status: 500 }
    }
  }

export const deleteTask = async (id: string) => {
    try {
      if (!id) {
        return { message: 'Task ID is required', status: 400 };
      }
  
      const task = await TaskModel.findById(id);
      if (!task) {
        return { message: 'Task not found', status: 404 };
      }
  
      if (task.files && task.files.length > 0) {
        await Promise.all(task.files.map(deleteImageToCloudinary));
      }
  
      await TaskModel.findByIdAndDelete(id);
  
      return { message: 'Task deleted successfully', status: 200 };
    } catch (error) {
      console.error(error);
      return { message: 'An error occurred while deleting the task', status: 500 };
    }
  };