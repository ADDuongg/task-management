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
