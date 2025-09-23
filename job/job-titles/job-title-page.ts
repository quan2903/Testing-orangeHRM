import { Page } from "playwright-core";

export class JobTitlesPage {
  constructor(public page: Page) {}

    async copyJobTitle(): Promise<string> {
        const firstJobTitle = this.page.locator('.oxd-table-card').first();
        await firstJobTitle.waitFor({ state: 'visible', timeout: 10000 });
        const text = await firstJobTitle.textContent();
        return text ? text.trim() : '';
    }

    async isJobTitlesexist(name: string):Promise<boolean>{
        const jobTitle = this.page.locator(`.oxd-table-card >> text=${name}`);
        await jobTitle.first().waitFor({ state: 'visible', timeout: 30000 });
        return await jobTitle.count() > 0;
    }

    
    async clickDeleteButton(name: string) {
        const jobTitle = this.page.locator(`.oxd-table-card >> text=${name}`);
        await jobTitle.first().waitFor({ state: 'visible', timeout: 10000 });
        await jobTitle.locator('button:has(i.icon-trash)').click();
    }
}
