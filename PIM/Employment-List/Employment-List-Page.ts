import { Page } from "playwright-core";
import { PIMPage } from "../PIM-Page";

export class EmploymentListPage {
    constructor(private page: Page) {}
    async goto() {
        const pimPage = new PIMPage(this.page);
        await pimPage.goto();
    }
    async getFirstEmployeeName(): Promise<string> {
        const firstRow = this.page.getByRole('row').nth(1); 
        const nameCell = firstRow.locator('div').nth(2); 

        await nameCell.waitFor({ state: 'visible', timeout: 5000 });

        const name = await nameCell.innerText();
        return name.trim();
    }

    async clickEditFirstRow() {
        const firstRow = this.page
            .locator('.oxd-table-body')
            .getByRole('row')
            .first();
        await this.page.mouse.wheel(0, 200);
        await firstRow.waitFor({ state: 'visible', timeout: 5000 });
        await firstRow.locator('button').first().click();
    }

    
}
