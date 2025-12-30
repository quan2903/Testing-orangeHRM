import {faker} from '@faker-js/faker';
import { SalaryType } from '../Salary-Type';

export class SalaryFactory {
    constructor(private base?: Partial<SalaryType>){}
    createSalaryWithSalaryComponent1SpecialCharacter() {
        return {
            salaryComponent: "@",
            payGrade: this.base?.payGrade,
            payFrequency: this.base?.payFrequency,
            currency: faker.string.alpha(1),
            amount: faker.number.int(10),
            comments: this.base?.comments
        };
    }
    createSalaryWithSalaryComponent99Characters() {
        return {
            salaryComponent: faker.string.alpha({ length: 99 }),
            payGrade: this.base?.payGrade,
            payFrequency: this.base?.payFrequency,
            currency: faker.string.alpha(1),
            amount: faker.number.int(10),
            comments: this.base?.comments
        };
    }

    createSalaryWithSalaryComponent100NumberCharacters() {
        return {
            salaryComponent: faker.number.int(100),
            payGrade: this.base?.payGrade,
            payFrequency: this.base?.payFrequency,
            currency: faker.string.alpha(1),
            amount: faker.number.int(1),
            comments: this.base?.comments
        };
    }

    createSalaryWithPayGrades(){
        return{
            salaryComponent: faker.string.alpha(1),
            payGrade: faker.string.alpha(1),
            payFrequency: this.base?.payFrequency,
            currency: faker.string.alpha(1),
            amount: faker.number.int(1),
            comments: this.base?.comments
        }
    }
}   