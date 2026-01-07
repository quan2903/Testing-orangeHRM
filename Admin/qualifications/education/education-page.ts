import { Page } from "playwright-core";

export class EducationPage {
    constructor(public page: Page) {}

    async clickAddButton() {
        try {
            await this.page.waitForLoadState('networkidle', { timeout: 2000 });
            await this.page.getByRole('button', { name: 'Add' }).click();
        } catch {}
    }

    async clickEditButton(name?: string) {
        const education = this.page.getByRole('row', { name });
        await education.first().waitFor({ state: 'visible', timeout: 10000 });
        await education.getByRole('button').nth(1).click();
    }

    async clickDeleteButton(name: string) {
        const education = this.page.locator(`.oxd-table-card >> text=${name}`);
        await education.first().waitFor({ state: 'visible', timeout: 10000 });
        await education.locator('button:has(i.icon-trash)').click();
    }

    // ====== Lấy tên education đầu tiên ======
    async getFirstEducationName(): Promise<string | null> {
        try {
            const firstRow = this.page.locator('.oxd-table-card').first();
            await firstRow.waitFor({ state: 'visible', timeout: 5000 });

            const text = await firstRow.innerText();
            return text.split('\n')[0]?.trim() ?? null;
        } catch {
            return null;
        }
    }

    // ====== NEW: Copy tên education thứ 3 ======
    async getThirdEducationName(): Promise<string | null> {
        try {
            const thirdRow = this.page.locator('.oxd-table-card').nth(2);
            await thirdRow.waitFor({ state: 'visible', timeout: 5000 });

            const text = await thirdRow.innerText();
            return text.split('\n')[0]?.trim() ?? null;
        } catch {
            return null;
        }
    }

    // ====== NEW: Kiểm tra lỗi tên education ======
    async isEducationNameErrorVisible(): Promise<boolean> {
        const base = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        );

        const error = base.filter({
            hasText: /Required|Should not exceed 100 characters|Already exists/
        });

        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    // ====== NEW: Kiểm tra education tồn tại trong bảng ======
    async isEducationExist(expectedName: string): Promise<boolean> {
        const rows = this.page.locator('.oxd-table-card');
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
            const rowText = (await rows.nth(i).innerText()).trim();
            if (rowText.includes(expectedName)) {
                return true;
            }
        }
        return false;
    }
}
