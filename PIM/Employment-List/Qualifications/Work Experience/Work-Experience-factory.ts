import { faker } from '@faker-js/faker';
import { WorkExperience } from './Work-Experience-Type';

function formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

export class WorkExperienceFactory {
    constructor(private base?: Partial<WorkExperience>) {}

    createWorkExperienceWithRequiredFields() {
        return {
            company: faker.company.name(),
            JobTitle: faker.person.jobTitle(),
            From: this.base?.From,
            To: this.base?.To,
            comment: this.base?.Comment
        };
    }

    createWorkExperienceWithCompanyAndJobTitle1SpecialCharacter() {
        return {
            company: "@",
            JobTitle: "#",
            From: this.base?.From,
            To: this.base?.To,
            comment: this.base?.Comment
        };
    }

    createWorkExperienceWithCompanyAndJobTitle99NumberCharacters() {
        return {
            company: faker.string.numeric(99),
            JobTitle: faker.string.numeric(99),
            From: this.base?.From,
            To: this.base?.To,
            comment: this.base?.Comment
        };
    }

    createWorkExperienceWithCompanyAndJobTitle100AlphabetCharacters() {
        return {
            company: faker.string.alpha({ length: 100 }),
            JobTitle: faker.string.alpha({ length: 100 }),
            From: this.base?.From,
            To: this.base?.To,
            comment: this.base?.Comment
        };
    }

    createWorkExperienceWithFromDate1YearInPast() {
        return {
            company: faker.string.alpha({ length: 100 }),
            JobTitle: faker.string.alpha({ length: 100 }),
            From: formatDateToDDMMYYYY(faker.date.past({ years: 1 })),
            To: this.base?.To,
            comment: this.base?.Comment
        };
    }

    createWorkExperienceWithFromDate9YearsInPast() {
        return {
            company: faker.company.name(),
            JobTitle: faker.person.jobTitle(),
            From: formatDateToDDMMYYYY(faker.date.past({ years: 9 })),
            To: this.base?.To,
            comment: this.base?.Comment
        };
    }

    createWorkExperienceWithToDate1YearInPast() {
        return {
            company: faker.company.name(),
            JobTitle: faker.person.jobTitle(),
            From: this.base?.From,
            To: formatDateToDDMMYYYY(faker.date.past({ years: 1 })),
            comment: this.base?.Comment
        };
    }

    createWorkExperienceWithToDate9YearsInPast() {
        return {
            company: faker.company.name(),
            JobTitle: faker.person.jobTitle(),
            From: this.base?.From,
            To: formatDateToDDMMYYYY(faker.date.past({ years: 9 })),
            comment: this.base?.Comment
        };
    }

    createWorkExperienceWithComment1SpecialCharacter() {
        return {
            company: faker.company.name(),
            JobTitle: faker.person.jobTitle(),
            From: this.base?.From,
            To: this.base?.To,
            comment: "@"
        };
    }

    createWorkExperienceWithComment199NumberCharacters() {
        return {
            company: faker.company.name(),
            JobTitle: faker.person.jobTitle(),
            From: this.base?.From,
            To: this.base?.To,
            comment: faker.string.numeric(199)
        };
    }

    createWorkExperienceWithComment200AlphabetCharacters() {
        return {
            company: faker.company.name(),
            JobTitle: faker.person.jobTitle(),
            From: this.base?.From,
            To: this.base?.To,
            comment: faker.string.alpha({ length: 200 })
        };
    }
}
