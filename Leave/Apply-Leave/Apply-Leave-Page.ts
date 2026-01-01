import { Page } from "@playwright/test";
import { LeavePage } from "../Leave-Page";
export class ApplyLeavePage {
    constructor(private page: Page) {}

    async goto() {
        const leavepage = new LeavePage(this.page);
        await leavepage.gotoApply();

    }
    
    async chooseLeaveType(value?: string) {
        await this.page.locator('div').filter({ hasText: value}).nth(2).first().click();
    }
    async fillFromDate(value?: string): Promise<void> {
        if (!value) return;
        await this.page.getByRole('textbox', { name: 'dd-mm-yyyy' }).first().fill(value);
    }
    async fillToDate(value?: string): Promise<void> {
        if (!value) return;
        await this.page.getByRole('textbox', { name: 'dd-mm-yyyy' }).nth(1).fill(value);
    }
    async chooseDuration(value?: string):Promise<void> {
        if (!value) return;

        await this.page.locator('div').filter({ hasText: value}).nth(2).click();
    }

    async fillFrom(value?: string):Promise<void> {
        if (!value) return;
        await this.page.getByRole('textbox', { name: 'hh:mm' }).first().fill(value)
    }
    async fillTo(value?: string):Promise<void> {
        if (!value) return;
        await this.page.getByRole('textbox', { name: 'hh:mm' }).nth(1).fill(value)
    }
    async fillComment(value?: string):Promise<void> {
        if (!value) return;
        await this.page.locator('textarea').fill(value)
    }

}
