import { Page } from "playwright-core";

export class AddJobTitlesPage {
    constructor(public page: Page) {}

    async fillJobTitleDetails(
        name: string,
        description: string,
        note: string,
        file: { name: string; mimeType: string; buffer: Buffer } | null
    ) {
        await this.page.getByRole('textbox').nth(1).fill(name);
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('textbox', { name: 'Type description here' }).fill(description);
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('textbox', { name: 'Add note' }).fill(note);
        await this.page.waitForTimeout(2000);
        if (file) {  
            await this.page.setInputFiles('input[type="file"]', file);
        }

        await this.page.getByRole('button', { name: 'Save' }).click();
    }
}
