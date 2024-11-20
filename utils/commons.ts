/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";

export const convertToDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
};

export const calculateRemainingTime = (startDate: string, dueDate: string): number => {
    const start = convertToDate(startDate);
    const due = convertToDate(dueDate);
    
    const differenceInMilliseconds = due.getTime() - start.getTime();
    
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    
    return differenceInDays;
};

export const addAlert = ({type, content}:{type: 'success' | 'error' | 'info' | 'warning', content: string}) => {
    switch (type) {
      case 'success':
        message.success(content)
        break
      case 'error':
        message.error(content)
        break
      case 'info':
        message.info(content)
        break
      case 'warning':
        message.warning(content)
        break
      default:
        message.info(content) 
    }
}

export function convertMongoToPlainObject<T>(mongoObject: T): Omit<T, '_id' | '__v'> & { id?: string } {
  const { _id, __v, ...plainEntry } = (mongoObject as any).toObject
    ? (mongoObject as any).toObject() 
    : mongoObject; 

  return plainEntry
}



