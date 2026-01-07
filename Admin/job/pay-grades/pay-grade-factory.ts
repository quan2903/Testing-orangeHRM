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
    createValidNameWith51Characters(): PayGrade {
    return {
        name: faker.string.alpha({ length: 51 }),
        ...this.base,
        };
    }

    createValidNameWith255Characters(): PayGrade {
        return {
            name: faker.string.alpha({ length: 255 }),
            ...this.base,
        };
    }

    createValidNameEmpty(): PayGrade {
        return {
            name: '',
            ...this.base,
        };
    }

    createValidNameAllSpaces(): PayGrade {
        return {
            name: '   ',
            ...this.base,
        };
    }

    createValidNameWithNumbers(): PayGrade {
        return {
            name: 'Grade123',
            ...this.base,
        };
    }

    createValidNameWithEmoji(): PayGrade {
        return {
            name: 'Salary💰',
            ...this.base,
        };
    }

    // Các case tên trùng hoặc có khoảng trắng theo yêu cầu testcase
    createValidNameDuplicate(

        name: string
    ): PayGrade {
        return {
            name,
            ...this.base,
        };
    }

    createValidNameDuplicateWith1SpaceAtStart(

        name: string
    ): PayGrade {
        return {
            name: ' ' + name,
            ...this.base,
        };
    }

    createValidNameDuplicateWith1SpaceAtEnd(

        name: string
    ): PayGrade {
        return {
            name: name + ' ',
            ...this.base,
        };
    }

    createValidNameDuplicateWithMultipleSpacesAtStart(

        name: string
    ): PayGrade {
        return {
            name: '   ' + name,
            ...this.base,
        };
    }

    createValidNameDuplicateWithMultipleSpacesAtEnd(

        name: string
    ): PayGrade {
        return {
            name: name + '   ',
            ...this.base,
        };
    }
}
