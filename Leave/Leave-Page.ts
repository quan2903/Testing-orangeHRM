import { Page } from "@playwright/test";

export class LeavePage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.getByRole('link', { name: 'Leave' }).click();
    }

    async gotoApply() {
        await this.page.getByRole('link', { name: 'Apply' }).click();
    }

    async gotoAssignLeave() {

    
        await this.page.getByRole('link', { name: 'Assign Leave' }).click();
    }

    async gotoConfig(){
        await this.page.getByText('Configure').click();
    }

}
