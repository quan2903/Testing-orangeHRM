import { Page } from "playwright-core";

export class EditWorkExperiencePage {
    constructor(private page: Page) {}

    async gotoEdit(workExperienceIndex: number) {
        // Giả sử có 1 nút Edit cho từng row kinh nghiệm làm việc
        const editBtn = this.page.locator('.work-experience-row').nth(workExperienceIndex).getByRole('button', { name: 'Edit' });
        await editBtn.click();
    }

    async fillCompany(company?: string) {
        if (!company) return;
        const input = this.page.locator('form').getByRole('textbox', { name: 'Company' });
        await input.fill(company);
    }

    async fillJobTitle(jobTitle?: string) {
        if (!jobTitle) return;
        const input = this.page.locator('form').getByRole('textbox', { name: 'Job Title' });
        await input.fill(jobTitle);
    }

    async fillFromDate(fromDate?: string) {
        if (!fromDate) return;
        const input = this.page.getByRole('textbox', { name: 'dd-mm-yyyy' }).first();
        await input.fill(fromDate);
        await input.evaluate((el, value) => {
            (el as HTMLInputElement).value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, fromDate);
    }

    async fillToDate(toDate?: string) {
        if (!toDate) return;
        const input = this.page.getByRole('textbox', { name: 'dd-mm-yyyy' }).nth(1);
        await input.fill(toDate);
        await input.evaluate((el, value) => {
            (el as HTMLInputElement).value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, toDate);
    }

    async fillComment(comment?: string) {
        if (!comment) return;
        const textarea = this.page.locator('textarea');
        await textarea.fill(comment);
    }

    async clickSave() {
        const btn = this.page.getByRole('button', { name: 'Save' });
        await btn.click();
    }

    async clickCancel() {
        const btn = this.page.getByRole('button', { name: 'Cancel' });
        await btn.click();
    }

    async isAnyErrorVisible(): Promise<boolean> {
        const errors = this.page.locator('.oxd-input-field-error-message');
        return await errors.count() > 0;
    }
}
