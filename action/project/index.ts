'use server'
import ProjectModel from "@/model/project";
import { ProjectFormRequest } from "@/types";
import { convertMongoToPlainObject } from "@/utils/commons";

export const createProject = async (data: ProjectFormRequest) => {
  try {
    const newProject = new ProjectModel({
      projectName: data.projectName,
      status: data.status,
      description: data.description,
      startDate: data.startDate,
      dueDate: data.dueDate,
      taskId: data.taskId,
      userId: data.userId,
    });

    const savedProject = await newProject.save();
    const plainProject = convertMongoToPlainObject(savedProject);
    return {
      project: plainProject,
      message: 'Create project successfully'
    };  
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Unable to create project");
  }
};

export const updateProject = async (projectId: string, data: ProjectFormRequest) => {
  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId, 
      {
        projectName: data.projectName,
        status: data.status,
        description: data.description,
        startDate: data.startDate,
        dueDate: data.dueDate,
        taskId: data.taskId,
        userId: data.userId,
      },
      { new: true, runValidators: true } 
    );

    if (!updatedProject) {
      throw new Error('Project not found');
    }

    const plainProject = convertMongoToPlainObject(updatedProject);
    return {
      project: plainProject,
      message: 'Project updated successfully',
    };
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Unable to update project");
  }
};
export const deleteProject = async (projectId: string) => {
  try {
    const deletedProject = await ProjectModel.findByIdAndDelete(projectId);

    if (!deletedProject) {
      throw new Error('Project not found');
    }

    return {
      message: 'Project deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Unable to delete project');
  }
};