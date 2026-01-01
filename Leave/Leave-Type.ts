export type LeaveType = {
    leaveType:
        | 'Annual Leave'
        | 'Sick Leave'
        | 'Casual Leave'
        | 'US - Bereavement'
        | 'US - FMLA'
        | 'Unpaid Leave';

    fromDate: string;      
    toDate?: string;       
    duration?: 'Full Day' | 'Half Day - Morning' | 'Half Day - Afternoon'| 'Specify Time';
    fromTime?: string;     
    toTime?: string;       
    comment?: string;
};
