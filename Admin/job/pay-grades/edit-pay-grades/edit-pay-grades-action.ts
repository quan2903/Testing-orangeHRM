import { Page, expect } from "@playwright/test";
import { EditPayGradesPage } from "./edit-pay-grades-page";
import { PayGradesPage } from "../pay-grades-page";

export type PayGradeInput = Partial<{
    name: string;
    currency: string;
    minimumSalary: number;
    maximumSalary: number;
}>;

export class EditPayGradeAction {
    constructor(private page: Page) {}

    async gotoEdit(oldName: string) {
        const payGradesPage = new PayGradesPage(this.page);
        await payGradesPage.clickEditButtonAndGetOldName(oldName);
    }

    async editPayGrade(oldName: string, newData: PayGradeInput) {
        await this.fillEditForm(oldName, newData);
        const editPage = new EditPayGradesPage(this.page);
        await editPage.clickSave();
    }

    async fillEditForm(oldName: string, newData: PayGradeInput) {
        const editPage = new EditPayGradesPage(this.page);
        await this.gotoEdit(oldName);

        if (newData.name !== undefined) await editPage.fillName(newData.name);
        if (newData.currency !== undefined) await editPage.fillCurrency(newData.currency);
        if (newData.minimumSalary !== undefined) await editPage.fillMinimumSalary(newData.minimumSalary);
        if (newData.maximumSalary !== undefined) await editPage.fillMaximumSalary(newData.maximumSalary);
    }

    async editPayGradeWithoutSave(oldName: string, newData: PayGradeInput) {
        await this.fillEditForm(oldName, newData);
    }

    async cancelEdit() {
        const editPage = new EditPayGradesPage(this.page);
        await editPage.clickCancel();
    }

    async verifyPayGradeExists(name?: string) {
        if (!name) return;
        const payGradesPage = new PayGradesPage(this.page);
        const exists = await payGradesPage.isPayGradeExist(name);
        expect(exists).toBeTruthy();
    }

    async isPayGradeExist(name?: string): Promise<boolean> {
        if (!name) return false;
        const payGradesPage = new PayGradesPage(this.page);
        return payGradesPage.isPayGradeExist(name);
    }

    async isCurrencyErrorVisible(): Promise<boolean> {
        const editPage = new EditPayGradesPage(this.page);
        return editPage.isCurrencyErrorVisible();
    }

    async isMinimumSalaryErrorVisible(): Promise<boolean> {
        const editPage = new EditPayGradesPage(this.page);
        return editPage.isMinimumSalaryErrorVisible();
    }

    async isMaximumSalaryErrorVisible(): Promise<boolean> {
        const editPage = new EditPayGradesPage(this.page);
        return editPage.isMaximumSalaryErrorVisible();
    }
}
