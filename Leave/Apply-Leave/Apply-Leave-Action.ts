import { Page } from "playwright-core";
import { ApplyLeavePage } from "./Apply-Leave-Page";
import { LeaveType } from "../Leave-Type"

export class ApplyLeaveAction {
    constructor(private page: Page) {}
    async goto() {
        await new ApplyLeavePage(this.page).goto();
    }
    async chooseLeaveType(leavetype: string): Promise<void> {
        await new ApplyLeavePage(this.page).chooseLeaveType(leavetype);
    }
    async fillFromDate(fromdate: string): Promise<void> {
        await new ApplyLeavePage(this.page).fillFromDate(fromdate);
    }
    async fillToDate(todate: string): Promise<void> {
        await new ApplyLeavePage(this.page).fillToDate(todate);
    }
    async chooseDuration(duration: string): Promise<void> {
        await new ApplyLeavePage(this.page).chooseDuration(duration);
    }
    async fillFrom(from: string): Promise<void> {
        await new ApplyLeavePage(this.page).fillFrom(from);
    }
    async fillTo(to: string): Promise<void> {
        await new ApplyLeavePage(this.page).fillTo(to);
    }
    async fillComment(comment: string): Promise<void> {
        await new ApplyLeavePage(this.page).fillComment(comment);
    }

    async saveChanges(): Promise<void> {
        await new ApplyLeaveAction(this.page).saveChanges();
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
        return await new ApplyLeaveAction(this.page).isFirstNameErrorVisible();
    }
    async isMiddleNameErrorVisible(): Promise<boolean> {
        return await new ApplyLeaveAction(this.page).isMiddleNameErrorVisible();
    }
    async isLastNameErrorVisible(): Promise<boolean> {
        return await new ApplyLeaveAction(this.page).isLastNameErrorVisible();
    }
    async isEmployeeIdErrorVisible(): Promise<boolean> {
        return await new ApplyLeaveAction(this.page).isEmployeeIdErrorVisible();
    }
    async isLicenseNumberErrorVisible(): Promise<boolean> {
        return await new ApplyLeaveAction(this.page).isLicenseNumberErrorVisible();
    }
    async isLicenseExpiryDateErrorVisible(): Promise<boolean> {
        return await new ApplyLeaveAction(this.page).isLicenseExpiryDateErrorVisible();
    }

    async isDateOfBirthErrorVisible(): Promise<boolean> {
        return await new ApplyLeaveAction(this.page).isDateOfBirthErrorVisible();
    }
}