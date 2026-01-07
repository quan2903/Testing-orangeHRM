import { faker } from '@faker-js/faker';
import { Location } from './locations-type';

export class LocationFactory {
    constructor(private base?: Partial<Location>) {}

    /* =========================
     * Helpers
     * ========================= */

    private baseValid(): Location {
        return {
            Name: faker.string.alpha({ length: 5 }),
            Country: 'Vietnam',
        };
    }

    private specialChars(length: number): string {
        return '!@#$%^&*()'.repeat(length).slice(0, length);
    }

    private numbers(length: number): string {
        return faker.string.numeric(length);
    }

    private letters(length: number): string {
        return faker.string.alpha({ length });
    }

    private pastedText(): string {
        return 'Pasted text from external source';
    }

    /* =========================
     * LOCATION NAME
     * ========================= */

    createName1SpecialCharWithCountry(): Location {
        return { ...this.baseValid(), Name: this.specialChars(1), ...this.base };
    }

    createName99NumbersWithCountry(): Location {
        return { ...this.baseValid(), Name: this.numbers(99), ...this.base };
    }

    createName100LettersWithCountry(): Location {
        return { ...this.baseValid(), Name: this.letters(100), ...this.base };
    }

    createNamePastedWithCountry(): Location {
        return { ...this.baseValid(), Name: this.pastedText(), ...this.base };
    }

    createNameWithSpaceAtStart(): Location {
        return { ...this.baseValid(), Name: ' ' + this.letters(5), ...this.base };
    }

    createNameWithSpaceInMiddle(): Location {
        return { ...this.baseValid(), Name: 'Ab cde', ...this.base };
    }

    createNameWithSpaceAtEnd(): Location {
        return { ...this.baseValid(), Name: this.letters(5) + ' ', ...this.base };
    }

    createNameDuplicateDifferentCase(existing: string): Location {
        return { ...this.baseValid(), Name: existing.toUpperCase(), ...this.base };
    }

    createNameEmpty(): Location {
        return { ...this.baseValid(), Name: '', ...this.base };
    }

    createNameOverLimit(length: number): Location {
        return { ...this.baseValid(), Name: this.letters(length), ...this.base };
    }

    createNameDuplicateExact(existing: string): Location {
        return { ...this.baseValid(), Name: existing, ...this.base };
    }

    /* =========================
     * CITY
     * ========================= */

    createCity1SpecialChar(): Location {
        return { ...this.baseValid(), City: this.specialChars(1), ...this.base };
    }

    createCity49Numbers(): Location {
        return { ...this.baseValid(), City: this.numbers(49), ...this.base };
    }

    createCity50Letters(): Location {
        return { ...this.baseValid(), City: this.letters(50), ...this.base };
    }

    createCity51Chars(): Location {
        return { ...this.baseValid(), City: this.letters(51), ...this.base };
    }

    createCity100Chars(): Location {
        return { ...this.baseValid(), City: this.letters(100), ...this.base };
    }

    createCityPasted(): Location {
        return { ...this.baseValid(), City: this.pastedText(), ...this.base };
    }

    createCitySpaceAtStart(): Location {
        return { ...this.baseValid(), City: ' ' + this.letters(5), ...this.base };
    }

    createCitySpaceInMiddle(): Location {
        return { ...this.baseValid(), City: 'Ab cd', ...this.base };
    }

    createCitySpaceAtEnd(): Location {
        return { ...this.baseValid(), City: this.letters(5) + ' ', ...this.base };
    }

    /* =========================
     * STATE / PROVINCE
     * ========================= */

    createState1SpecialChar(): Location {
        return { ...this.baseValid(), StateProvince: this.specialChars(1), ...this.base };
    }

    createState29Letters(): Location {
        return { ...this.baseValid(), StateProvince: this.letters(29), ...this.base };
    }

    createState30Numbers(): Location {
        return { ...this.baseValid(), StateProvince: this.numbers(30), ...this.base };
    }

    createState31Chars(): Location {
        return { ...this.baseValid(), StateProvince: this.letters(31), ...this.base };
    }

    createState100Chars(): Location {
        return { ...this.baseValid(), StateProvince: this.letters(100), ...this.base };
    }

    createStatePasted(): Location {
        return { ...this.baseValid(), StateProvince: this.pastedText(), ...this.base };
    }

    createStateSpaceAtStart(): Location {
        return { ...this.baseValid(), StateProvince: ' ' + this.letters(5), ...this.base };
    }

    createStateSpaceInMiddle(): Location {
        return { ...this.baseValid(), StateProvince: 'Ab cd', ...this.base };
    }

    createStateSpaceAtEnd(): Location {
        return { ...this.baseValid(), StateProvince: this.letters(5) + ' ', ...this.base };
    }

    /* =========================
     * ZIP / POSTAL CODE
     * ========================= */

    createZip(length: number): Location {
        return { ...this.baseValid(), ZipPostalCode: this.numbers(length), ...this.base };
    }

    createZipSpecialChars(length: number): Location {
        return { ...this.baseValid(), ZipPostalCode: this.specialChars(length), ...this.base };
    }

    createZipLetters(length: number): Location {
        return { ...this.baseValid(), ZipPostalCode: this.letters(length), ...this.base };
    }

    createZipPasted(): Location {
        return { ...this.baseValid(), ZipPostalCode: this.pastedText(), ...this.base };
    }

    createZipSpaceAtStart(): Location {
        return { ...this.baseValid(), ZipPostalCode: ' 12345', ...this.base };
    }

    createZipSpaceInMiddle(): Location {
        return { ...this.baseValid(), ZipPostalCode: '12 345', ...this.base };
    }

    createZipSpaceAtEnd(): Location {
        return { ...this.baseValid(), ZipPostalCode: '12345 ', ...this.base };
    }

    /* =========================
     * PHONE
     * ========================= */

    createPhone(length: number): Location {
        return { ...this.baseValid(), Phone: this.numbers(length), ...this.base };
    }

    createPhoneWithChars(value: string): Location {
        return { ...this.baseValid(), Phone: value, ...this.base };
    }

    createPhonePasted(): Location {
        return { ...this.baseValid(), Phone: '+84 (028) 123-4567', ...this.base };
    }

    /* =========================
     * FAX
     * ========================= */

    createFax(length: number): Location {
        return { ...this.baseValid(), Fax: this.numbers(length), ...this.base };
    }

    createFaxWithDash(): Location {
        return { ...this.baseValid(), Fax: '028-1234567', ...this.base };
    }

    createFaxPasted(): Location {
        return { ...this.baseValid(), Fax: '(028)1234567', ...this.base };
    }

    /* =========================
     * ADDRESS
     * ========================= */

    createAddressSpecial(length: number): Location {
        return { ...this.baseValid(), Address: this.specialChars(length), ...this.base };
    }

    createAddressNumbers(length: number): Location {
        return { ...this.baseValid(), Address: this.numbers(length), ...this.base };
    }

    createAddressLetters(length: number): Location {
        return { ...this.baseValid(), Address: this.letters(length), ...this.base };
    }

    createAddressPasted(): Location {
        return { ...this.baseValid(), Address: '123 Nguyen Hue, District 1, HCMC', ...this.base };
    }

    /* =========================
     * NOTES
     * ========================= */

    createNotesSpecial(length: number): Location {
        return { ...this.baseValid(), Notes: this.specialChars(length), ...this.base };
    }

    createNotesLetters(length: number): Location {
        return { ...this.baseValid(), Notes: this.letters(length), ...this.base };
    }

    createNotesNumbers(length: number): Location {
        return { ...this.baseValid(), Notes: this.numbers(length), ...this.base };
    }

    createNotesPasted(): Location {
        return { ...this.baseValid(), Notes: this.pastedText(), ...this.base };
    }

    createNotesSpaceAtStart(): Location {
        return { ...this.baseValid(), Notes: ' ' + this.letters(10), ...this.base };
    }

    createNotesSpaceInMiddle(): Location {
        return { ...this.baseValid(), Notes: 'Ab cd ef', ...this.base };
    }

    createNotesSpaceAtEnd(): Location {
        return { ...this.baseValid(), Notes: this.letters(10) + ' ', ...this.base };
    }

    /* =========================
     * EMPTY / NEGATIVE
     * ========================= */

    createAllFieldsEmpty(): Location {
        return {
            Name: '',
            City: '',
            StateProvince: '',
            ZipPostalCode: '',
            Country: '',
            Phone: '',
            Fax: '',
            Address: '',
            Notes: '',
            ...this.base,
        };
    }

    createCountryEmpty(): Location {
        return {
            Name: faker.string.alpha({ length: 5 }),
            Country: '',
            ...this.base,
        };
    }
}
