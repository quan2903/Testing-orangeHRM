import { Page } from "playwright";
import { PersonalDetailsPage } from "./Personal-Details-Page";
import {PersonalDetailsType } from "./Personal-Details-Type";
export class PersonalDetailsAction {
    constructor(private page: Page) {}
    async goto() {
        await new PersonalDetailsPage(this.page).goto();
    }
    async fillFirstName(firstName: string): Promise<void> {
        await new PersonalDetailsPage(this.page).fillFirstName(firstName);
    }
    async fillMiddleName(middleName: string): Promise<void> {
        await new PersonalDetailsPage(this.page).fillMiddleName(middleName);
    }
    async fillLastName(lastName: string): Promise<void> {
        await new PersonalDetailsPage(this.page).fillLastName(lastName);
    }
    async fillEmployeeId(employeeId: string): Promise<void> {
        await new PersonalDetailsPage(this.page).fillEmployeeId(employeeId);
    }
    async fillOtherId(otherId: string): Promise<void> {
        await new PersonalDetailsPage(this.page).fillOtherId(otherId);
    }
    async fillLicenseNumber(licenseNumber: string): Promise<void> {
        await new PersonalDetailsPage(this.page).fillLicenseNumber(licenseNumber);
    }
    async fillLicenseExpiryDate(licenseExpiryDate: string): Promise<void> {
        await new PersonalDetailsPage(this.page).fillLicenseExpiryDate(licenseExpiryDate);
    }
    async fillDateOfBirth(dateOfBirth: string): Promise<void> {
        await new PersonalDetailsPage(this.page).fillDateOfBirth(dateOfBirth);
    }
    async chooseRandomNationality(nationality: string): Promise<void> {
        await new PersonalDetailsPage(this.page).chooseRandomNationality(nationality);
    }
    async saveChanges(): Promise<void> {
        await new PersonalDetailsPage(this.page).saveChanges();
    }
    
    async updatePersonalDetails(personalDetails: PersonalDetailsType) {
        await this.fillFirstName(personalDetails.firstName);
        await this.fillMiddleName(personalDetails.middleName);
        await this.fillLastName(personalDetails.lastName);
        await this.fillEmployeeId(personalDetails.employeeId);
        await this.fillOtherId(personalDetails.otherId);
        await this.fillLicenseNumber(personalDetails.licenseNumber);
        await this.fillLicenseExpiryDate(personalDetails.licenseExpiryDate);
        await this.fillDateOfBirth(personalDetails.dateOfBirth);
        await this.chooseRandomNationality(personalDetails.nationality);
        await this.saveChanges();
    }

    async isFirstNameErrorVisible(): Promise<boolean> {
        return await new PersonalDetailsPage(this.page).isFirstNameErrorVisible();
    }
    async isMiddleNameErrorVisible(): Promise<boolean> {
        return await new PersonalDetailsPage(this.page).isMiddleNameErrorVisible();
    }
    async isLastNameErrorVisible(): Promise<boolean> {
        return await new PersonalDetailsPage(this.page).isLastNameErrorVisible();
    }
    async isEmployeeIdErrorVisible(): Promise<boolean> {
        return await new PersonalDetailsPage(this.page).isEmployeeIdErrorVisible();
    }
    async isLicenseNumberErrorVisible(): Promise<boolean> {
        return await new PersonalDetailsPage(this.page).isLicenseNumberErrorVisible();
    }
    async isLicenseExpiryDateErrorVisible(): Promise<boolean> {
        return await new PersonalDetailsPage(this.page).isLicenseExpiryDateErrorVisible();
    }

    async isDateOfBirthErrorVisible(): Promise<boolean> {
        return await new PersonalDetailsPage(this.page).isDateOfBirthErrorVisible();
    }
}