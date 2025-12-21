import { Page, expect } from "@playwright/test";
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

    async gotoEdit(name: string) {
        const payGradesPage = new PayGradesPage(this.page);
        await payGradesPage.clickEditButton(name);
    }

    async editPayGrade(oldName: string, newData: PayGradeInput) {
        const editPage = new EditPayGradesPage(this.page);
        await this.gotoEdit(oldName);

        if (newData.name !== undefined) {
            await editPage.fillName(newData.name);
        }

        if (newData.currency !== undefined) {
            await editPage.selectCurrency(newData.currency);
        }

        if (newData.minimumSalary !== undefined) {
            await editPage.fillMinimumSalary(newData.minimumSalary);
        }

        if (newData.maximumSalary !== undefined) {
            await editPage.fillMaximumSalary(newData.maximumSalary);
        }

        await this.page.getByRole("button", { name: "Save" }).click();
    }

    async editPayGradeWithoutSave(oldName: string, newData: PayGradeInput) {
        const editPage = new EditPayGradesPage(this.page);
        await this.gotoEdit(oldName);

        if (newData.name !== undefined) {
            await editPage.fillName(newData.name);
        }

        if (newData.currency !== undefined) {
            await editPage.selectCurrency(newData.currency);
        }

        if (newData.minimumSalary !== undefined) {
            await editPage.fillMinimumSalary(newData.minimumSalary);
        }

        if (newData.maximumSalary !== undefined) {
            await editPage.fillMaximumSalary(newData.maximumSalary);
        }
    }

    async cancelEditPayGrade() {
        await this.page.getByRole("button", { name: "Cancel" }).click();
    }

    async editAndVerifyPayGrade(oldName: string, newData: PayGradeInput) {
        await this.editPayGrade(oldName, newData);

        const expectedName = newData.name ?? oldName;
        const payGradesPage = new PayGradesPage(this.page);
        const exists = await payGradesPage.isPayGradeExist(expectedName);

        expect(exists).toBe(true);
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

    async isPayGradeExist(name: string): Promise<boolean> {
        const payGradesPage = new PayGradesPage(this.page);
        return await payGradesPage.isPayGradeExist(name);
    }
}
