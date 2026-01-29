import { faker } from '@faker-js/faker';
import { AssignLeaveType } from './Assign-Leave-Type';

export class AssignLeaveFactory {
    constructor(private base?: Partial<AssignLeaveType>) {}

    private formatDate(date: Date): string {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    }

    private today(): string {
        return this.formatDate(new Date());
    }

    private future(days: number): string {
        return this.formatDate(faker.date.soon({ days }));
    }

    private past(days: number): string {
        return this.formatDate(faker.date.recent({ days }));
    }

    private baseValidOneDay(): AssignLeaveType {
        return {
            name: this.base?.name ?? faker.string.alpha(1),
            leaveType: this.base?.leaveType ?? 'US - Bereavement',
            fromDate: this.today(),
            toDate: this.today(),
            duration: 'Full Day',
            comment: faker.lorem.words(3),
        };
    }

    createOneDayValidComment1Number(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            comment: faker.string.numeric(1),
        };
    }

    createHalfDayMorningValidComment249Alphabet(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            duration: 'Half Day - Morning',
            comment: faker.string.alpha(249),
        };
    }

    createHalfDayAfternoonValidComment250Special(): AssignLeaveType {
        const special = "!@#$%^&*()_+-=[]{}';:\"\\|,.<>/?";
        let comment = '';
        for (let i = 0; i < 250; i++) {
            comment += special[Math.floor(Math.random() * special.length)];
        }
        return {
            ...this.baseValidOneDay(),
            duration: 'Half Day - Afternoon',
            comment,
        };
    }

    createOneShiftValidSpecificTime(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            duration: 'Specify Time',
            fromTime: '09:00',
            toTime: '17:00',
        };
    }

    createMultiDayValidFromToday(days: number): AssignLeaveType {
        return {
            name: faker.string.alpha(1),
            leaveType: 'Annual Leave',
            fromDate: this.today(),
            toDate: this.future(days),
            duration: 'Full Day',
        };
    }

    createMultiDayAllMorning(days: number): AssignLeaveType {
        return {
            name: faker.string.alpha(1),
            leaveType: 'Annual Leave',
            fromDate: this.today(),
            toDate: this.future(days),
            duration: 'Half Day - Morning',
        };
    }

    createMultiDayAllAfternoon(days: number): AssignLeaveType {
        return {
            name: faker.string.alpha(1),
            leaveType: 'Annual Leave',
            fromDate: this.today(),
            toDate: this.future(days),
            duration: 'Half Day - Afternoon',
        };
    }

    createMultiDayAllSpecificTime(): AssignLeaveType {
        return {
            name: faker.string.alpha(1),
            leaveType: 'Annual Leave',
            fromDate: this.today(),
            toDate: this.future(3),
            duration: 'Specify Time',
            fromTime: '09:00',
            toTime: '12:00',
        };
    }

    createExceedLeaveTypeLimit(): AssignLeaveType {
        return {
            name: faker.string.alpha(1),
            leaveType: 'Annual Leave',
            fromDate: this.today(),
            toDate: this.future(30),
            duration: 'Full Day',
        };
    }

    createExceedRemainingLeave(): AssignLeaveType {
        return {
            name: faker.string.alpha(1),
            leaveType: 'Annual Leave',
            fromDate: this.today(),
            toDate: this.future(15),
            duration: 'Full Day',
        };
    }

    createWithoutEmployee(): AssignLeaveType {
        const data = this.baseValidOneDay();
        delete data.name;
        return data;
    }

    createEmployeeTypedButNotSelected(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            name: 'a',
        };
    }

    createWithoutFromDate(): AssignLeaveType {
        const data = this.baseValidOneDay();
        delete data.fromDate;
        return data;
    }

    createWithoutToDate(): AssignLeaveType {
        const data = this.baseValidOneDay();
        delete data.toDate;
        return data;
    }

    createFromDateAfterToDate(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            fromDate: this.future(5),
            toDate: this.today(),
        };
    }

    createOneDayInPast(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            fromDate: this.past(1),
            toDate: this.past(1),
        };
    }

    createMultiDayInPast(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            fromDate: this.past(5),
            toDate: this.past(1),
        };
    }

    createPastToFuture(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            fromDate: this.past(3),
            toDate: this.future(3),
        };
    }

    createFromDateAlphabet(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            fromDate: faker.string.alpha(8),
        };
    }

    createToDateAlphabet(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            toDate: faker.string.alpha(8),
        };
    }

    createFromDateSpecialChar(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            fromDate: '@@-##-$$$$',
        };
    }

    createToDateSpecialChar(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            toDate: '@@-##-$$$$',
        };
    }

    createFromDateInvalidFormat(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            fromDate: '2026/01/09',
        };
    }

    createToDateInvalidFormat(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            toDate: '2026/01/10',
        };
    }

    createSpecificTimeExceedShift(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            duration: 'Specify Time',
            fromTime: '08:00',
            toTime: '20:00',
        };
    }

    createSpecificTimeFromAfterTo(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            duration: 'Specify Time',
            fromTime: '15:00',
            toTime: '10:00',
        };
    }

    createSpecificTimeInvalidFrom(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            duration: 'Specify Time',
            fromTime: 'aa:bb',
            toTime: '10:00',
        };
    }

    createSpecificTimeInvalidTo(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            duration: 'Specify Time',
            fromTime: '09:00',
            toTime: 'cc:dd',
        };
    }

    createComment251Characters(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            comment: faker.string.alphanumeric(251),
        };
    }

    createComment300Characters(): AssignLeaveType {
        return {
            ...this.baseValidOneDay(),
            comment: faker.string.alphanumeric(300),
        };
    }
}
