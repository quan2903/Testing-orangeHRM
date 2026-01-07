import { EditMembershipPage } from "./edit-memberships-page";
import { MembershipPage } from "../memberships-page";
import { Page } from "playwright-core";

export type Membership = Partial<{
    name: string;
}>;

export class EditMembershipAction {
    constructor(private page: Page) {}

    async goto() {
        const editPage = new EditMembershipPage(this.page);
        await editPage.goto();
    }

    async editMembership(newName?: string) {
        const editPage = new EditMembershipPage(this.page);

        if (newName !== undefined) {
            await editPage.fillMembershipName(newName);
        }

        await editPage.clickSaveButton();
    }

    async editMembershipWithoutSave(newName: string) {
        const editPage = new EditMembershipPage(this.page);
        await editPage.fillMembershipName(newName);
    }
    async copyMembership(): Promise<string> {
    const membershipPage = new MembershipPage(this.page);
    const name = await membershipPage.getFirstMembershipName();

    if (!name) {
        throw new Error('No membership found to copy');
    }

    return name;
    }
    async isNameErrorVisible(): Promise<boolean> {
        const membershipPage = new MembershipPage(this.page);
        return membershipPage.isMembershipNameErrorVisible();
    }

    async isMembershipExist(name: string): Promise<boolean> {
        const membershipPage = new MembershipPage(this.page);
        return membershipPage.isMembershipExist(name);
    }
}
