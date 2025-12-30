import { Page } from "playwright-core";

export class PIMPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async goto() {
        await this.page.getByRole('link').filter({ hasText: 'PIM' }).click();
        await this.page.waitForURL('**/pim/viewEmployeeList', { timeout: 30000 });
        await this.page.waitForSelector('h6:has-text("PIM")', { timeout: 30000 });
    }
}