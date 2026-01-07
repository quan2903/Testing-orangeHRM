import { Page } from "playwright-core";
import { MembershipPage } from "../memberships-page";

export class AddMembershipPage {
    constructor(public page: Page) {}

    async goto() {
        const membershipPage = new MembershipPage(this.page);
        await membershipPage.clickAddButton();
    }

    async fillMembershipName(name: string) {
        await this.page.getByRole('textbox').nth(1).fill(name);
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async clickCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }
}