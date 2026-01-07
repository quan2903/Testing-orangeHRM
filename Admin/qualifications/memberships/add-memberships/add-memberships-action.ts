import { Page } from "@playwright/test";
import { MembershipPage } from "../memberships-page";
import { AddMembershipPage } from "./add-memberships-page";
import { Membership } from "../memberships-type";

export class AddMembershipAction {
    constructor(private page: Page) {}

    async goto() {
        const membershipPage = new MembershipPage(this.page);
        await membershipPage.clickAddButton();
    }

    async addMembership(membership: Membership) {
        const addPage = new AddMembershipPage(this.page);
        await this.goto();

        if (membership.name !== undefined) {
            await addPage.fillMembershipName(membership.name);
        }

        await addPage.clickSaveButton();
    }

    async addMembershipWithoutSave(membership: Membership) {
        const addPage = new AddMembershipPage(this.page);
        await this.goto();

        if (membership.name !== undefined) {
            await addPage.fillMembershipName(membership.name);
        }
    }

    async cancelAddMembership() {
        const addPage = new AddMembershipPage(this.page);
        await addPage.clickCancelButton();
    }

    async addAndVerifyMembership(membership: Membership): Promise<boolean> {
        const membershipPage = new MembershipPage(this.page);
        await this.addMembership(membership);
        return membershipPage.isMembershipNameErrorVisible();
    }

    async isNameErrorVisible(): Promise<boolean> {
        const membershipPage = new MembershipPage(this.page);
        return membershipPage.isMembershipNameErrorVisible();
    }

    async isMembershipExist(name: string): Promise<boolean> {
        const membershipPage = new MembershipPage(this.page);
        return membershipPage.isMembershipExist(name);
    }

    async copyMembership(): Promise<string> {
        const membershipPage = new MembershipPage(this.page);
        const name = await membershipPage.getFirstMembershipName();

        if (!name) {
            throw new Error('No membership found to copy');
        }

        return name;
    }
}