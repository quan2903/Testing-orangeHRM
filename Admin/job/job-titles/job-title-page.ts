import { Page } from "playwright-core";

export class JobTitlesPage {
  constructor(public page: Page) {}

    async copyJobTitle(): Promise<string> {
        const firstJobTitle = this.page.locator('.oxd-table-card').first();
        await firstJobTitle.waitFor({ state: 'visible', timeout: 10000 });
        const text = await firstJobTitle.textContent();
        return text ? text.trim() : '';
    }

    async clickAddButton(){
        await this.page.getByRole('button', {name: 'Add' }).click();
    }

    async clickEditButton(name: string) {
        const jobTitle = this.page.locator(`.oxd-table-card >> text=${name}`);
        await jobTitle.first().waitFor({ state: 'visible', timeout: 10000 });
        await jobTitle.locator('button:has(i.icon-pencil)').click();
    }
    
    async clickDeleteButton(name: string) {
        const jobTitle = this.page.locator(`.oxd-table-card >> text=${name}`);
        await jobTitle.first().waitFor({ state: 'visible', timeout: 10000 });
        await jobTitle.locator('button:has(i.icon-trash)').click();
    }
}
