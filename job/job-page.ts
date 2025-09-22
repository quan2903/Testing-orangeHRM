import { Page } from "playwright-core";
import {AdminPage} from "../AdminPage";
export class JobPage {
    constructor(private page: Page) {}

    async goto() {
        const adminPage = new AdminPage(this.page);
        await adminPage.goto();
        await this.page.getByText('Job').click();
    }
    async navigateToJobTitles() {
        await this.page.getByRole('listitem').filter({ hasText: /^Job Titles$/ }).click();
    }
}
