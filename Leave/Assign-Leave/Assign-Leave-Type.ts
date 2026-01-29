export type AssignLeaveType = {
    name?: string
    leaveType?: 
        | 'CAN - Bereavement'
        | 'CAN - FMLA'
        | 'CAN - Matternity'
        | 'US - Bereavement'
        | 'US - FMLA'
        | 'US - Matternity'
        | 'US - Personal'
        | 'US - Vacation'
        | string; 


    fromDate?: string;
    toDate?: string;
    duration?: 
        | 'Full Day'
        | 'Half Day - Morning'
        | 'Half Day - Afternoon'
        | 'Specify Time'
        | string;


    fromTime?: string;
    toTime?: string;


    comment?: string;
};
