import { Page } from "playwright-core";
import { JobTitlesPage } from "../job-title-page";
export class AddJobTitlesPage {
    constructor(public page: Page) {}

    async goto() {
       
        const addjobtitlespage = new JobTitlesPage(this.page)
        await addjobtitlespage.clickAddButton();
    }

    async fillName(name: string) {
        // first textbox after header is usually the name
        await this.page.getByRole('textbox').nth(1).fill(name);
    }

    async fillDescription(description: string) {
        await this.page.getByRole('textbox', { name: 'Type description here' }).fill(description);
    }

    async fillNote(note: string) {
        await this.page.getByRole('textbox', { name: 'Add note' }).fill(note);
    }

    async uploadFile(file: { name: string; mimeType: string; buffer: Buffer }) {
        if (file) {
            await this.page.setInputFiles('input[type="file"]', file);
        }
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async clickCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }

   async isNameErrorVisible(): Promise<boolean> {
            const base = this.page.locator(
                'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
            );

            const error = base
                .filter({ hasText: 'Required' })
                .or(base.filter({ hasText: 'Should be less than 100 characters' }));

            try {
                await error.first().waitFor({ state: 'visible', timeout: 5000 });
                return true;
            } catch {
                return false;
            }
            }


    async isDescriptionErrorVisible(): Promise<boolean> {
        const error = this.page.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: 'Required' });
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
        } catch (e) {
            return false;
        }
        return await error.count() > 0;
    }

    async isNoteErrorVisible(): Promise<boolean> {
        const error = this.page.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: 'Required' });
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
        } catch (e) {
            return false;
        }
        return await error.count() > 0;
    }

    async isJobTitleExist(name: string): Promise<boolean> {
        // Generic text search on the page for the job title name in list/table
        try {
            const el = this.page.locator(`text="${name}"`);
            await el.first().waitFor({ state: 'visible', timeout: 3000 });
            return await el.count() > 0;
        } catch (e) {
            return false;
        }
    }

    // convenience method that fills all fields and saves (keeps original signature)
    async fillJobTitleDetails(
        name: string,
        description: string,
        note: string,
        file: { name: string; mimeType: string; buffer: Buffer } | null
    ) {
        await this.fillName(name);
        await this.page.waitForTimeout(500);
        await this.fillDescription(description);
        await this.page.waitForTimeout(500);
        await this.fillNote(note);
        await this.page.waitForTimeout(500);
        if (file) {
            await this.uploadFile(file as any);
        }

        await this.clickSaveButton();
    }
}
