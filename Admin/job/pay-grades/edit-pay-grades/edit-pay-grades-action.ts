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

    private selectedCurrency?: string;
    async gotoEdit() {
        const payGradesPage = new PayGradesPage(this.page);
        await payGradesPage.clickEditButtonAndGetOldName();
    }
    async clickAddButton(){
        const paygrade = new PayGradesPage(this.page);
        await paygrade.clickAddButton()
    }

    async editPayGrade( newData: PayGradeInput) {

        await this.fillEditForm(newData);
        const editPage = new EditPayGradesPage(this.page);
        await editPage.clickSave();
        await this.page.waitForTimeout(500);
        await expect(this.page.locator('.oxd-table-card').first()).toBeVisible();
    }

    async fillEditForm(newData: PayGradeInput) {
        const editPage = new EditPayGradesPage(this.page);
        await this.gotoEdit();
        await this.clickAddButton();
        if (newData.name !== undefined) await editPage.fillName(newData.name);
        await this.page.waitForTimeout(500);
        this.selectedCurrency = await editPage.selectRandomCurrency();
        await this.page.waitForTimeout(500);
        if (newData.minimumSalary !== undefined) await editPage.fillMinimumSalary(newData.minimumSalary);
        await this.page.waitForTimeout(500);
        if (newData.maximumSalary !== undefined) await editPage.fillMaximumSalary(newData.maximumSalary);
    }

    async editPayGradeWithoutSave( newData: PayGradeInput) {
        await this.fillEditForm(newData);
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
async isCurrencyExist(): Promise<boolean> {
    const currency =  this.selectedCurrency;
    if (!currency) return false;

    const normalizedCurrency = currency.includes('-')
        ? currency.split('-').slice(1).join('-').trim()
        : currency.trim();

    try {
        const rows = this.page.locator('.oxd-table-card');
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            await row.scrollIntoViewIfNeeded();

            const text = (await row.innerText()).trim();

            if (text.includes(normalizedCurrency)) {
                return true;
            }
        }
        return false;
    } catch {
        return false;
    }
}


}
