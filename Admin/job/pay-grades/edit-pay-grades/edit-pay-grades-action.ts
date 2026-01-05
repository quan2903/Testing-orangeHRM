import { Page } from "@playwright/test";
import { PayGradesPage } from "../pay-grades-page";
import { EditPayGradesPage } from "./edit-pay-grades-page";

export type PayGradeInput = Partial<{
    name: string;
    currency: string;
    minimumSalary: number;
    maximumSalary: number;
}>;

export class EditPayGradeAction {
    constructor(private page: Page) {}

    // ======================
    // Navigation
    // ======================
    async gotoEdit(oldName: string) {
        const payGradesPage = new PayGradesPage(this.page);
        await payGradesPage.clickEditButtonAndGetOldName();
    }

    // ======================
    // Core edit action
    // ======================
    async editPayGrade(oldName: string, newData: PayGradeInput) {
        const editPage = new EditPayGradesPage(this.page);

        await this.gotoEdit(oldName);

        if (newData.name !== undefined) {
            await editPage.fillName(newData.name);
        }

        if (newData.minimumSalary !== undefined) {
            await editPage.fillMinimumSalary(newData.minimumSalary);
        }

        if (newData.maximumSalary !== undefined) {
            await editPage.fillMaximumSalary(newData.maximumSalary);
        }

        await editPage.clickSave();
    }

    // ======================
    // Fill only – no submit
    // ======================
    async fillEditForm(oldName: string, newData: PayGradeInput) {
        const editPage = new EditPayGradesPage(this.page);

        await this.gotoEdit(oldName);

        if (newData.name !== undefined) {
            await editPage.fillName(newData.name);
        }


            
        

        if (newData.minimumSalary !== undefined) {
            await editPage.fillMinimumSalary(newData.minimumSalary);
        }

        if (newData.maximumSalary !== undefined) {
            await editPage.fillMaximumSalary(newData.maximumSalary);
        }
    }

    // ======================
    // Cancel
    // ======================
    async cancelEdit() {
        const editPage = new EditPayGradesPage(this.page);
        await editPage.clickCancel();
    }

    // backward-compatible helper used by tests: fill form but do not save
    async editPayGradeWithoutSave(oldName: string, newData: PayGradeInput) {
        await this.fillEditForm(oldName, newData);
    }

    // ======================
    // Verification helpers
    // ======================
    async isPayGradeExist(name: string): Promise<boolean> {
        const payGradesPage = new PayGradesPage(this.page);
        return await payGradesPage.isPayGradeExist(name);
    }

    async isCurrencyErrorVisible(): Promise<boolean> {
        const editPage = new EditPayGradesPage(this.page);
        return await editPage.isCurrencyErrorVisible();
    }

    async isMinimumSalaryErrorVisible(): Promise<boolean> {
        const editPage = new EditPayGradesPage(this.page);
        return await editPage.isMinimumSalaryErrorVisible();
    }

    async isMaximumSalaryErrorVisible(): Promise<boolean> {
        const editPage = new EditPayGradesPage(this.page);
        return await editPage.isMaximumSalaryErrorVisible();
    }
}
