import { faker } from '@faker-js/faker';
import { ApplyLeaveType } from './Assign-Leave-Type';

export class ApplyLeaveFactory {
    constructor(private base?: Partial<ApplyLeaveType>) {}

    // ================== DATE HELPERS (INLINE) ==================
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

    // ================== BASE VALID ==================
    private baseValidOneDay(): ApplyLeaveType {
        return {
            leaveType: this.base?.leaveType ?? 'US - Bereavement',
            fromDate: this.today(),
            toDate: this.today(),
            duration: 'Full Day',
            comment: faker.lorem.words(3),
        };
    }

    // ================== COMMENT ==================
    createComment1CharacterAllNumber(): ApplyLeaveType {
        return {
            ...this.baseValidOneDay(),
            comment: faker.string.numeric(1),
        };
    }

    createComment249CharactersAllAlphabet(): ApplyLeaveType {
        return {
            ...this.baseValidOneDay(),
            duration: 'Half Day - Morning',
            comment: faker.string.alpha(249),
        };
    }

    createComment250CharactersAllSpecial(): ApplyLeaveType {
        const specialChars = "!@#$%^&*()_+-=[]{}';:\"\\|,.<>/?";
        let comment = '';

        for (let i = 0; i < 250; i++) {
            comment += specialChars[Math.floor(Math.random() * specialChars.length)];
        }

        return {
            ...this.baseValidOneDay(),
            duration: 'Half Day - Afternoon',
            comment,
        };
    }

    createComment251Characters(): ApplyLeaveType {
        return {
            ...this.baseValidOneDay(),
            comment: faker.string.alphanumeric(251),
        };
    }

    createComment300Characters(): ApplyLeaveType {
        return {
            ...this.baseValidOneDay(),
            comment: faker.string.alphanumeric(300),
        };
    }

    // ================== SPECIFIC TIME ==================
    createValidSpecificTime(): ApplyLeaveType {
        return {
            ...this.baseValidOneDay(),
            duration: 'Specify Time',
            fromTime: '09:00',
            toTime: '12:00',
        };
    }

    createSpecificTimeFromAfterTo(): ApplyLeaveType {
        return {
            ...this.baseValidOneDay(),
            duration: 'Specify Time',
            fromTime: '15:00',
            toTime: '10:00',
        };
    }

    createSpecificTimeInvalidFormat(): ApplyLeaveType {
        return {
            ...this.baseValidOneDay(),
            duration: 'Specify Time',
            fromTime: 'aa:bb',
            toTime: 'cc:dd',
        };
    }

    createSpecificTimeExceedOneShift(): ApplyLeaveType {
        return {
            ...this.baseValidOneDay(),
            duration: 'Specify Time',
            fromTime: '08:00',
            toTime: '20:00',
        };
    }
    createWithoutFromDate(): ApplyLeaveType {
    const data = this.baseValidOneDay();
    delete data.fromDate;
    return data;
}

    // ================== MULTI DAY ==================
    createMultiDayValidFromToday(days: number): ApplyLeaveType {
        return {
            leaveType: this.base?.leaveType ?? 'Annual Leave',
            fromDate: this.today(),
            toDate: this.future(days),
            duration: 'Full Day',
            comment: faker.lorem.words(5),
        };
    }

    createFromDateAfterToDate(): ApplyLeaveType {
        return {
            leaveType: this.base?.leaveType ?? 'Sick Leave',
            fromDate: this.future(5),
            toDate: this.today(),
            duration: 'Full Day',
        };
    }

    // ================== INVALID DATE ==================
    createFromDateAlphabet(): ApplyLeaveType {
        return {
            ...this.baseValidOneDay(),
            fromDate: faker.string.alpha(8),
        };
    }

    createToDateSpecialCharacter(): ApplyLeaveType {
        return {
            ...this.baseValidOneDay(),
            toDate: '@@-##-$$$$',
        };
    }

    createInvalidDateFormat(): ApplyLeaveType {
        return {
            ...this.baseValidOneDay(),
            fromDate: '2026/01/09',
        };
    }

    // ================== PAST DATE ==================
    createOneDayInPast(): ApplyLeaveType {
        return {
            ...this.baseValidOneDay(),
            fromDate: this.past(3),
            toDate: this.past(3),
        };
    }

    createMultiDayPastToFuture(): ApplyLeaveType {
        return {
            leaveType: 'Annual Leave',
            fromDate: this.past(5),
            toDate: this.future(5),
            duration: 'Full Day',
        };
    }
}
