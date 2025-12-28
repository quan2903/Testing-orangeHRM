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
    createValidNameWith4CharactersAnd1SpaceAtStart(): PayGrade {
        return { name: ' ' + faker.string.alpha({ length: 4 }), ...this.base };
    }
    createValidNameWith4CharactersAnd1SpaceAtEnd(): PayGrade {
        return { name: faker.string.alpha({ length: 4 }) + ' ', ...this.base };
    }
    createValidNameWith4CharactersAndMultipleSpacesAtStart(): PayGrade {
        return { name: '   ' + faker.string.alpha({ length: 4 }), ...this.base };
    }
    createValidNameWith4CharactersAndMultipleSpacesAtEnd(): PayGrade {
        return { name: faker.string.alpha({ length: 4 }) + '   ', ...this.base };
    }
    createValidNameWithSpecialLeadingAndTrailingSpaces(): PayGrade {
        return { name: '  ' + faker.string.alpha({ length: 6 }) + '  ', ...this.base };
    }
    createValidNamewWith4CharactersAndSpaceInMiddle(): PayGrade {
        return { name: faker.string.alpha({ length: 2 }) + ' ' + faker.string.alpha({ length: 2 }), ...this.base };
    }
    createValidNameWith4CharactersAndSpaceInMiddle(): PayGrade {
        return { name: faker.string.alpha({ length: 2 }) + ' ' + faker.string.alpha({ length: 2 }), ...this.base };
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

    createValidNameWithChineseCharacters(): PayGrade {
        return { name: "工资等级", ...this.base };
    }
    
    createValidNameWithSpecialCharacters(): PayGrade {
        return { name: "Salary@Grade#1!", ...this.base };
    }

    createEditWithCurrencyOnly(): PayGrade {
        return {
            name: faker.string.alpha({ length: 6 }),
            ...this.base,
        };
    }

    createEditWithCurrencyAndMinimum(

        minimumSalary: number
    ): PayGrade {
        return {
            name: faker.string.alpha({ length: 6 }),
            minimumSalary,
            ...this.base,
        };
    }

    createEditWithCurrencyAndMaximum(

        maximumSalary: number
    ): PayGrade {
        return {
            name: faker.string.alpha({ length: 6 }),
            maximumSalary,
            ...this.base,
        };
    }

    createEditWithCurrencyAndMinMax(

        minimumSalary: number,
        maximumSalary: number
    ): PayGrade {
        return {
            name: faker.string.alpha({ length: 6 }),
            minimumSalary,
            maximumSalary,
            ...this.base,
        };
    }
}
