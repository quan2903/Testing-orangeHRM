import { Page, Locator } from "@playwright/test";
import { LeavePage } from "../Leave-Page";

export class ApplyLeavePage {
    constructor(private page: Page) {}

    async goto(): Promise<void> {
        await new LeavePage(this.page).gotoApply();
    }

    // ================== COMMON HELPERS ==================
    private async fillIfProvided(locator: Locator, value?: string): Promise<void> {
        if (!value) return;
        await locator.fill(value);
    }

    private async isErrorVisible(pattern: string | RegExp): Promise<boolean> {
        const error = this.page
            .locator('span.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: pattern });

        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    // ================== ACTIONS ==================
    async chooseLeaveType(value?: string): Promise<void> {
      


        await this.page.locator('form i').first().click();
        const option = this.page.getByRole('option',{name: value});
    await option.waitFor({ state: 'visible' });
    await option.click();
    }

    async fillFromDate(value?: string): Promise<void> {
        await this.fillIfProvided(
            this.page.getByRole('textbox', { name: 'dd-mm-yyyy' }).first(),
            value
        );
    }

    async fillToDate(value?: string): Promise<void> {
        await this.fillIfProvided(
            this.page.getByRole('textbox', { name: 'dd-mm-yyyy' }).nth(1),
            value
        );
    }

    /**
     * ⚠️ DÙNG CHO CẢ Duration (1 ngày) & Partial Day (nhiều ngày)
     * - UI sẽ render dropdown khác nhau
     * - form i index thay đổi → kiểm tra tồn tại trước khi click
     */
    async chooseDuration(value?: string): Promise<void> {
        if (!value) return;

        // thử Duration trước (1 ngày)
        const durationDropdown = this.page.locator('form i').nth(4);
        if (await durationDropdown.count() > 0 && await durationDropdown.isVisible()) {
            await durationDropdown.click();
            await this.page.locator('div').filter({ hasText: value }).nth(2).click();
            return;
        }

        // fallback sang Partial Day (nhiều ngày)
        const partialDropdown = this.page.locator('form i').nth(4);
        if (await partialDropdown.count() > 0 && await partialDropdown.isVisible()) {
            await partialDropdown.click();
            await this.page.locator('div').filter({ hasText: value }).nth(2).click();
        }
    }

    async fillFrom(value?: string): Promise<void> {
        await this.fillIfProvided(
            this.page.getByRole('textbox', { name: 'hh:mm' }).first(),
            value
        );
    }

    async fillTo(value?: string): Promise<void> {
        await this.fillIfProvided(
            this.page.getByRole('textbox', { name: 'hh:mm' }).nth(1),
            value
        );
    }

    async fillComment(value?: string): Promise<void> {
        await this.fillIfProvided(this.page.locator('textarea'), value);
    }

    async saveChanges(): Promise<void> {
        await this.page.getByRole('button', { name: 'Apply' }).click();
    }

    // ================== ERROR CHECKS ==================
    async isLeaveTypeErrorVisible(): Promise<boolean> {
        return this.isErrorVisible('Required');
    }

    async isFromDateErrorVisible(): Promise<boolean> {
        return this.isErrorVisible(
            /Should be a valid date in dd-mm-yyyy format|From date should be before/
        );
    }

    async isToDateErrorVisible(): Promise<boolean> {
        return this.isErrorVisible(
            /Should be a valid date in dd-mm-yyyy format|To date should be after/
        );
    }

    async isDurationErrorVisible(): Promise<boolean> {
        return this.isErrorVisible('Required');
    }

    async isFromTimeErrorVisible(): Promise<boolean> {
        return this.isErrorVisible(
            /Should be a valid time|From time should be before/
        );
    }

    async isToTimeErrorVisible(): Promise<boolean> {
        return this.isErrorVisible(
            /Should be a valid time|To time should be after/
        );
    }

    async isCommentErrorVisible(): Promise<boolean> {
        return this.isErrorVisible('Should not exceed');
    }
    
}
