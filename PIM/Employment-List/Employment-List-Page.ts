import { Page } from "playwright-core";
import { PIMPage } from "../PIM-Page";

export class EmploymentListPage {
    constructor(private page: Page) {}
    async goto() {
        const pimPage = new PIMPage(this.page);
        await pimPage.go();
    }
    async getFirstEmployeeName(): Promise<string> {
        const firstRow = this.page.getByRole('row').nth(1); 
        const nameCell = firstRow.locator('div').nth(2); 

        await nameCell.waitFor({ state: 'visible', timeout: 5000 });

        const name = await nameCell.innerText();
        return name.trim();
    }

      async clickEditByEmployeeName(employeeName: string) {
        const row = this.page.getByRole('row', {
            name: new RegExp(employeeName)
        });

        await row.waitFor({ state: 'visible', timeout: 5000 });
        await row.getByRole('button').first().click(); 
    }
    
}
