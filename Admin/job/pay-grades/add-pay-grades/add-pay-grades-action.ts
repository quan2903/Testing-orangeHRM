import { Page, expect } from "@playwright/test";
import { AddPayGradesPage } from "./add-pay-grades-page";
import PayGradeType from "../pay-grades-type";
import { PayGradesPage } from "../pay-grades-page"

export class AddPayGradesAction {
    constructor(private page: Page) {}

    async goto() {
        const addPage = new AddPayGradesPage(this.page);
        await addPage.goto();
    }

    // === Flow cũ: thêm + save + chọn currency ===
    async addPayGrade(payGrade: PayGradeType) {
        const addPage = new AddPayGradesPage(this.page);
        await addPage.goto();
        await addPage.fillPayGradeDetails(
            payGrade.name!,
            payGrade.currency,
            payGrade.minimumSalary,
            payGrade.maximumSalary
        );
    }


    async addPayGradeWithNameOnly(payGrade: PayGradeType) {
        const addPage = new AddPayGradesPage(this.page);
        await addPage.goto();
        if (payGrade.name) await addPage.fillName(payGrade.name);


        await addPage.saveNameOnly();
        await addPage.page.waitForTimeout(5000);
        // Cancel currency → vẫn lưu tên
        await addPage.cancelCurrency();
    }

    async addPayGradeWithoutSave(payGrade: PayGradeType) {
        const addPage = new AddPayGradesPage(this.page);
        await addPage.goto();
        if (payGrade.name) 
            await addPage.fillName(payGrade.name);
        if (payGrade.currency) 
            await addPage.fillCurrency(payGrade.currency);
        if (payGrade.minimumSalary !== undefined) 
            await addPage.fillMinimumSalary(payGrade.minimumSalary);
        if (payGrade.maximumSalary !== undefined) 
            await addPage.fillMaximumSalary(payGrade.maximumSalary);
    }

    async cancelAddPayGrade() {
        const addPage = new AddPayGradesPage(this.page);
        await addPage.clickCancelButton();
    }

    async verifyPayGradeExists(name?: string) {
        if (!name) return;
        const addPage = new PayGradesPage(this.page);
        const exists = await addPage.isPayGradeExist(name);
        expect(exists).toBeTruthy();
    }

    async isNameErrorVisible() {
        const addPage = new AddPayGradesPage(this.page);
        return addPage.isNameErrorVisible();
    }

    async isSalaryErrorVisible() {
        const addPage = new AddPayGradesPage(this.page);
        return addPage.isSalaryErrorVisible();
    }

    async isPayGradeExist(name?: string): Promise<boolean> {
        const payPage = new PayGradesPage(this.page);
        return payPage.isPayGradeExist(name);
    }

    async isGlobalErrorNotificationVisible(): Promise<boolean> {
        const addPage = new AddPayGradesPage(this.page);
        return addPage.isGlobalErrorNotificationVisible();
    }

    async copyFirstPayGrade(): Promise<string | null> {
        const addPage = new AddPayGradesPage(this.page);
        return addPage.copyFirstPayGrade();
    }
}
