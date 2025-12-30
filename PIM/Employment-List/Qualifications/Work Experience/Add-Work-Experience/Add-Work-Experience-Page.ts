import { Page } from "playwright-core";
import { QualificationsPage } from "../../Qualifications-Page";

export class AddWorkExperiencePage {
    constructor(private page: Page) {}

    async goto() {
        const qualificationsPage = new QualificationsPage(this.page);
        await qualificationsPage.clickAddWorkExperience();
    }

    async fillCompany(company?: string) {
        if (!company) return;
        const input = this.page.locator('form').filter({ hasText: 'CompanyJob TitleFromToComment' }).getByRole('textbox').first()
        await input.waitFor({ state: 'visible', timeout: 3000 });
        await input.fill(company);
    }

async fillJobTitle(jobTitle?: string) {
    if (!jobTitle) return;
    const input = this.page.locator('form').filter({ hasText: 'CompanyJob TitleFromToComment' }).getByRole('textbox').nth(1); // Playwright tìm input dựa theo label
    await input.waitFor({ state: 'visible', timeout: 5000 });
    await input.fill(jobTitle);
}

    async fillFromDate(fromdate?: string) {
        if(!fromdate) return;
        const input = this.page.getByRole('textbox', { name: 'dd-mm-yyyy' }).first();
        await input.waitFor({ state: 'visible', timeout: 3000 });
        await input.fill(fromdate);
        
    }

    async fillToDate(toDate?: string) {
        if (!toDate) return;
        const input = this.page.getByRole('textbox', { name: 'dd-mm-yyyy' }).nth(1);
        await input.waitFor({ state: 'visible', timeout: 3000 });
        await input.fill(toDate);
         await input.dispatchEvent('input');
    }

    async fillComment(comment?: string) {
        if (!comment) return;
        const textarea = this.page.locator('textarea');
        await textarea.waitFor({ state: 'visible', timeout: 3000 });
        await textarea.fill(comment);
    }

    async clickSave() {
        const btn = this.page.getByRole('button', { name: 'Save' });
        await btn.waitFor({ state: 'visible', timeout: 3000 });
        await btn.click();
    }

    async clickCancel() {
        const btn = this.page.getByRole('button', { name: 'Cancel' });
        await btn.waitFor({ state: 'visible', timeout: 3000 });
        await btn.click();
    }

    async isCompanyErrorVisible(): Promise<boolean> {
        const field = this.page.locator('.oxd-input-group').nth(0);
        const error = field.locator('.oxd-input-field-error-message');

        try {
            await error.waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }
    async isJobTitleErrorVisible():Promise<boolean>{
        const field = this.page.locator('.oxd-input-group').nth(1);
        const error = field.locator('.oxd-input-field-error-message');

        try {
            await error.waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    async isFromDateErrorVisible(): Promise<boolean> {
        const field = this.page.locator('.oxd-input-group').nth(2);
        const error = field.locator('.oxd-input-field-error-message');

        try {
            await error.waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    async isToDateErrorVisible(): Promise<boolean> {
        const field = this.page.locator('.oxd-input-group').nth(3);
        const error = field.locator('.oxd-input-field-error-message');

        try {
            await error.waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }
    async isCommentErrorVisible(): Promise<boolean> {
        const field = this.page.locator('.oxd-input-group').nth(4);
        const error = field.locator('.oxd-input-field-error-message');

        try {
            await error.waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }
    
}
