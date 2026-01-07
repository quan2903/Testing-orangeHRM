import { Page } from "@playwright/test"
import { MembershipPage } from "../memberships-page";

export class EditMembershipPage {
    constructor(public page: Page) {}

    async goto() {
        const membershipPage = new MembershipPage(this.page);
        const name = await membershipPage.getFirstMembershipName();

        if (!name) {
            throw new Error('No membership found to edit');
        }

        await membershipPage.clickEditButton(name);
    }

    async fillMembershipName(name: string) {
        const nameInput = this.page.locator('form').getByRole('textbox');
        await this.page.waitForTimeout(1000);
        await nameInput.clear();
        await this.page.waitForTimeout(1000);
        await nameInput.fill(name);
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
}
