import { Page, expect } from "@playwright/test";
import { PayGradesPage } from "../pay-grades-page";
import { AddPayGradesPage } from "./add-pay-grades-page";


export type PayGradeInput = Partial<{
    name: string;
    currency: string;
    minumumSalary: number;
    maximumSalary: number;
    
}>;

export class AddPayGradesAction {
    constructor(private page: Page) {}

    async goto() {
        const payGradesPage = new PayGradesPage(this.page);
        await payGradesPage.clickAddButton();
    }

    async addPayGrade(payGrade: PayGradeInput) {
        const addPage = new AddPayGradesPage(this.page);
        await this.goto();

        if (payGrade.name !== undefined) await addPage.fillName(payGrade.name);

        await addPage.clickSaveButton();
    }

    async addPayGradeWithoutSave(payGrade: PayGradeInput) {
        const addPage = new AddPayGradesPage(this.page);
        await this.goto();

        if (payGrade.name !== undefined) await addPage.fillName(payGrade.name);
    }

    async cancelAddPayGrade() {
        const addPage = new AddPayGradesPage(this.page);
        await addPage.clickCancelButton();
    }

    async addAndVerifyPayGrade(payGrade: PayGradeInput) {
        await this.addPayGrade(payGrade);

        if (!payGrade.name) {
            throw new Error("Pay grade name is required for verification");
        }

        const payGradesPage = new PayGradesPage(this.page);
        const exists = await payGradesPage.isPayGradeExist(payGrade.name);
        expect(exists).toBe(true);
    }

    async isNameErrorVisible() {
        const page = new AddPayGradesPage(this.page);
        return await page.isNameErrorVisible();
    }

    async isPayGradeExist(name: string): Promise<boolean> {
        const payGradesPage = new PayGradesPage(this.page);
        return await payGradesPage.isPayGradeExist(name);
    }
}
