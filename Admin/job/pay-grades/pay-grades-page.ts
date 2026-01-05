import { Page } from "playwright-core";

export class PayGradesPage {
    constructor(public page: Page) {}



    async clickAddButton() {
        // wait a moment for page to stabilize
        try {
            await this.page.waitForLoadState('networkidle', { timeout: 2000 });
        } catch {}

        // Primary selector: accessible role button with name 'Add'
        const addButtons = this.page.getByRole('button', { name: 'Add' });
        if (await addButtons.count() > 0) {
            await addButtons.first().click();
            return;
        }

        // Fallbacks: try several common alternatives (localized text, icon+text, CSS classes)
        const fallbacks = [
            'button:has-text("Add")',
            'button:has-text(" Add")',
            'button[title="Add"]',
            '.oxd-button--secondary:has-text("Add")',
            'button.oxd-button:has-text("Add")',
            'text="Add"'
        ];

        for (const sel of fallbacks) {
            const el = this.page.locator(sel);
            if (await el.count() > 0) {
                await el.first().click();
                return;
            }
        }

        throw new Error('No Add buttons found on Pay Grades page');
    }
    
    async clickEditButtonAndGetOldName(): Promise<string> {
        // 1️⃣ Lấy dòng đầu tiên trong bảng
        const firstRow = this.page.locator('.oxd-table-card').first();
        await firstRow.waitFor({ state: 'visible', timeout: 10000 });

        // 2️⃣ Lấy oldName từ cột Name
        // (OrangeHRM: cột đầu tiên là Name)
        const nameCell = firstRow.locator('.oxd-table-cell').first();
        const oldName = (await nameCell.innerText()).trim();

        // 3️⃣ Click nút Edit (icon bút chì) trong cùng dòng

        await this.page.getByRole('row', { name: oldName }).getByRole('button').nth(1).click();

        await this.page.getByRole('button', { name: '' }).first().click();
        // 4️⃣ Trả oldName để dùng cho verify
        return oldName;
    }


    async getFirstRowName(): Promise<string> {
        const firstRow = this.page.locator('.oxd-table-card').first();
        await firstRow.waitFor({ state: 'visible', timeout: 10000 });

        const nameCell = firstRow.locator('.oxd-table-cell').first();
        return (await nameCell.innerText()).trim();
    }

    async clickDeleteButton(name: string) {
        const payGrade = this.page.locator(`.oxd-table-card >> text=${name}`);
        await payGrade.first().waitFor({ state: 'visible', timeout: 10000 });
        await payGrade.locator('button:has(i.icon-trash)').click();
    }

}