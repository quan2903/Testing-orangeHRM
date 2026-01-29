export type ApplyLeaveType = {
    /** LEAVE TYPE – đầy đủ option trên UI */
    leaveType?: 
        | 'CAN - Bereavement'
        | 'CAN - FMLA'
        | 'CAN - Matternity'
        | 'US - Bereavement'
        | 'US - FMLA'
        | 'US - Matternity'
        | 'US - Personal'
        | 'US - Vacation'
        | string; // cho negative / data sai

    /** DATE */
    fromDate?: string;
    toDate?: string;

    /**
     * Duration / Partial Day
     * - 1 ngày → hiện Duration
     * - Nhiều ngày → Full Day
     */
    duration?: 
        | 'Full Day'
        | 'Half Day - Morning'
        | 'Half Day - Afternoon'
        | 'Specify Time'
        | string;

    /** SPECIFY TIME */
    fromTime?: string;
    toTime?: string;

    /** COMMENT */
    comment?: string;
};
