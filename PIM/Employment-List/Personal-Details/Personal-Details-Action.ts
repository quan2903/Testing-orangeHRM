import { PersonalDetailsPage } from "./Personal-Details-Page";
import {PersonalDetailsType } from "./Personal-Details-Type";
export class PersonalDetailsAction {
    constructor(private personalDetailsPage: PersonalDetailsPage) {}
    async updatePersonalDetails(personalDetails: PersonalDetailsType) {
        await this.personalDetailsPage.fillPersonalDetails(
            personalDetails.firstName,
            personalDetails.middleName,
            personalDetails.lastName,
            personalDetails.employeeId,
            personalDetails.otherId,
            personalDetails.licenseNumber,
            personalDetails.licenseExpiryDate,
            personalDetails.nationality,
            personalDetails.maritalStatus,
            personalDetails.dateOfBirth,
            personalDetails.Gender
        );
        await this.personalDetailsPage.saveChanges();
    }

    async isFirstNameErrorVisible(): Promise<boolean> {
        return await this.personalDetailsPage.isFirstNameErrorVisible();
    }
    async isMiddleNameErrorVisible(): Promise<boolean> {
        return await this.personalDetailsPage.isMiddleNameErrorVisible();
    }
    async isLastNameErrorVisible(): Promise<boolean> {
        return await this.personalDetailsPage.isLastNameErrorVisible();
    }
    async isEmployeeIdErrorVisible(): Promise<boolean> {
        return await this.personalDetailsPage.isEmployeeIdErrorVisible();
    }
    async isLicenseNumberErrorVisible(): Promise<boolean> {
        return await this.personalDetailsPage.isLicenseNumberErrorVisible();
    }
    async isLicenseExpiryDateErrorVisible(): Promise<boolean> {
        return await this.personalDetailsPage.isLicenseExpiryDateErrorVisible();
    }

    async isDateOfBirthErrorVisible(): Promise<boolean> {
        return await this.personalDetailsPage.isDateOfBirthErrorVisible();
    }
}