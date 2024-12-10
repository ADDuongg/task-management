'use server'

import { LogtimeModel } from "@/model/logtime"
import { logtimeFormRequest } from "@/types"
import { convertMongoToPlainObject } from "@/utils/commons"

export const createLogtime = async (data: logtimeFormRequest) => {
    try {

        /* const existingLogtime = await LogtimeModel.findOne({ userId: data.userId, taskId: data.taskId, dateLogtime: data.dateLogtime });

        if (existingLogtime) {
            existingLogtime.timeLogtime = Number(existingLogtime.timeLogtime) + Number(data.timeLogtime);
            
            await existingLogtime.save();
        
            return { message: 'Create logtime successfully', status: 200 };
        } */
        

        const newLogtime = new LogtimeModel({
            activity: data.activity,
            userId: data.userId,
            taskId: data.taskId,
            comment: data.comment,
            dateLogtime: data.dateLogtime,
            timeLogtime: data.timeLogtime,
        });

        const savedLogtime = await newLogtime.save();
        const plainLogtime = convertMongoToPlainObject(savedLogtime);
        return {
            logtime: plainLogtime,
            message: 'Create logtime successfully'
        };  
    } catch (error) {
        console.error("Error creating logtime:", error);
        throw new Error("Unable to create logtime");
    }
}

export const updateLogtime = async (id: string, data: logtimeFormRequest) => {
    try {
        const updatedLogtime = await LogtimeModel.findByIdAndUpdate(
            id, 
            {
                activity: data.activity,
                userId: data.userId,
                taskId: data.taskId,
                comment: data.comment,
                dateLogtime: data.dateLogtime,
                timeLogtime: data.timeLogtime,
            },
            { new: true, runValidators: true } 
        );

        if (!updatedLogtime) {
            throw new Error('Logtime not found');
        }

        const plainLogtime = convertMongoToPlainObject(updatedLogtime);
        return {
            logtime: plainLogtime,
            message: 'Logtime updated successfully',
        };
    } catch (error) {
        console.error("Error updating logtime:", error);
        throw new Error("Unable to update logtime");
    }
}

export const deleteLogtime = async (id: string) => {
    try {
        const deletedLogtime = await LogtimeModel.findByIdAndDelete(id);

        if (!deletedLogtime) {
            throw new Error('Logtime not found');
        }

        return {
            message: 'Logtime deleted successfully',
        };
    } catch (error) {
        console.error('Error deleting logtime:', error);
        throw new Error('Unable to delete logtime');
    }
}