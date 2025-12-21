import PayGrade from './pay-grades-type';
import { faker } from '@faker-js/faker';

export class PayGradeFactory {
    constructor(private base?: Partial<PayGrade>) {}

    createValidNameWith5Characters(): PayGrade {
        return { name: faker.string.alpha({ length: 5 }), ...this.base };
    }

    createValidNameWith1Character(): PayGrade {
        return { name: faker.string.alpha({ length: 1 }), ...this.base };
    }

    createValidNameWith49Characters(): PayGrade {
        return { name: faker.string.alpha({ length: 49 }), ...this.base };
    }

    createValidNameWith50Characters(): PayGrade {
        return { name: faker.string.alpha({ length: 50 }), ...this.base };
    }

    createValidNameByPastingText(): PayGrade {
        return { name: "Sample Name Pasted From Another Source", ...this.base };
    }

    createValidNameWithVietnameseCharacters(): PayGrade {
        return { name: "Bậc lương", ...this.base };
    }

    createValidNameWithSpecialCharacters(): PayGrade {
        return { name: "Salary@Grade#1!", ...this.base };
    }

    createEditWithCurrencyOnly(currency: string): PayGrade {
        return {
            name: faker.string.alpha({ length: 6 }),
            currency,
            ...this.base,
        };
    }

    createEditWithCurrencyAndMinimum(
        currency: string,
        minimumSalary: number
    ): PayGrade {
        return {
            name: faker.string.alpha({ length: 6 }),
            currency,
            minimumSalary,
            ...this.base,
        };
    }

    createEditWithCurrencyAndMaximum(
        currency: string,
        maximumSalary: number
    ): PayGrade {
        return {
            name: faker.string.alpha({ length: 6 }),
            currency,
            maximumSalary,
            ...this.base,
        };
    }

    createEditWithCurrencyAndMinMax(
        currency: string,
        minimumSalary: number,
        maximumSalary: number
    ): PayGrade {
        return {
            name: faker.string.alpha({ length: 6 }),
            currency,
            minimumSalary,
            maximumSalary,
            ...this.base,
        };
    }
}
