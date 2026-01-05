import { Page, expect } from "@playwright/test";
import { AddPayGradesPage } from "./add-pay-grades-page";
import PayGradeType from "../pay-grades-type";

export class AddPayGradesAction {
    constructor(private page: Page) {}

    async goto() {
        const addPage = new AddPayGradesPage(this.page);
        await addPage.goto();
    }

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

    // === Tách ra hàm riêng ===
    async addPayGradeAndSave(payGrade: PayGradeType) {
        await this.addPayGrade(payGrade);
        const addPage = new AddPayGradesPage(this.page);
        await addPage.clickSaveButton();
    }

    async verifyPayGradeExists(name?: string) {
        if (!name) 
            return

        const addPage = new AddPayGradesPage(this.page);
        const exists = await addPage.isPayGradeExist(name);
        expect(exists).toBeTruthy();
    }
    // ==========================

    async isNameErrorVisible() {
        const addPage = new AddPayGradesPage(this.page);
        return addPage.isNameErrorVisible();
    }

    async isSalaryErrorVisible() {
        const addPage = new AddPayGradesPage(this.page);
        return addPage.isSalaryErrorVisible();
    }

    async isPayGradeExist(name?: string): Promise<boolean> {
        const addPage = new AddPayGradesPage(this.page);
        return addPage.isPayGradeExist(name);
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
