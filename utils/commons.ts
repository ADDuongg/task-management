/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";
import moment from "moment";

export const convertToDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
};

export function calculateRemainingTime(startDate: string, dueDate: string): string {
  const start = moment(startDate);
  const due = moment(dueDate);

  const daysRemaining = due.diff(start, 'days'); 

  return daysRemaining >= 0 ? daysRemaining.toString() : '0'; 
}
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



