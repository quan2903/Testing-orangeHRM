import { Page } from '@playwright/test';
import { EmploymentListPage } from '../Employment-List-Page';

export class SalaryPage {
    constructor(private page: Page) {}

    async goto() {
        const employmentListPage = new EmploymentListPage(this.page);
        await employmentListPage.clickEditFirstRow();
        await this.page.getByRole('tab', { name: 'Salary' }).click();
    }

    async clickAddSalaryComponent() {
        await this.page.getByRole('button', { name: ' Add' }).first().click();
    }

    
}
