import { Page } from "playwright-core";
import { JobTitlesPage } from "../job-title-page";

export class AddJobTitlesPage {
    constructor(public page: Page) {}

    async goto() {
        const jobTitlesPage = new JobTitlesPage(this.page);
        await jobTitlesPage.clickAddButton();
    }

    async fillName(name: string) {
        await this.page.getByRole('textbox').nth(1).fill(name);
    }

    async fillDescription(description: string) {
        await this.page.getByRole('textbox', { name: 'Type description here' }).fill(description);
    }

    async fillNote(note: string) {
        await this.page.getByRole('textbox', { name: 'Add note' }).fill(note);
    }

    async uploadFile(file: { name: string; mimeType: string; buffer: Buffer }) {
        if (file) {
            await this.page.setInputFiles('input[type="file"]', file);
        }
    }

    async clickSaveButton() {
    await Promise.all([
        this.page.waitForURL('**/admin/viewJobTitleList'),
        this.page.getByRole('button', { name: 'Save' }).click(),
    ]);
    }

    async clickCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }

    async isErrorVisible(field: 'name' | 'description' | 'note'): Promise<boolean> {
        const base = this.page.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message');
        let error;
        switch (field) {
            case 'name':
                error = base.filter({ hasText: /Required|Should not exceed 100 characters| Already exists/ });
                break;
            case 'description':
                error = base.filter({ hasText: /Required|Should not exceed 400 characters/ });
                break;
            case 'note':
                error = base.filter({ hasText: /Required|Should not exceed 400 characters/ });
                break;
            default:
                return false;
        }

        try {
            await error.first().waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    async isNameErrorVisible() {
        return this.isErrorVisible('name');
    }

    async isDescriptionErrorVisible() {
        return this.isErrorVisible('description');
    }

    async isNoteErrorVisible() {
        return this.isErrorVisible('note');
    }

    /**
     * Kiểm tra job title đã tồn tại theo logic scroll + row
     */
    async isJobTitleExist(name: string, description?: string): Promise<boolean> {
    if (!name) return false;

    // Wait for at least one job row to be visible instead of relying on .oxd-table-body
    // which may not exist or may be removed in certain app versions.
    await this.page.locator('.oxd-table-card').first().waitFor({ state: 'visible', timeout: 5000 });

    const expectedName = name.trim();
    const expectedDesc = description?.trim();


    while (true) {
        const rows = this.page.locator('.oxd-table-card')
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);

            const jobName = (
                await row.locator('.oxd-table-cell').nth(1).innerText()
            ).trim();

            if (jobName !== expectedName) continue;

            if (!expectedDesc) return true;

            const jobDesc = (
                await row.locator('.oxd-table-cell').nth(2).innerText()
            ).trim();

            if (jobDesc === expectedDesc) return true;
        }

        // 👉 NÚT NEXT PAGE (BIẾN MẤT Ở TRANG CUỐI)
        const nextBtn = this.page.locator(
            '.oxd-pagination-page-item--previous-next'
        );

        // 👉 Trang cuối: button không còn trong DOM
        if (await nextBtn.count() === 0) break;

        await nextBtn.click();
        await this.page.waitForTimeout(300);
    }

    return false;
}

  async isGlobalErrorNotificationVisible(
    pattern: string | RegExp = /Error|Invalid|Failed|Unable|Not allowed|Already exists/
  ): Promise<boolean> {
    const toast = this.page
      .locator('.oxd-toast-content, .oxd-alert-content, .oxd-toast, .oxd-alert')
      .filter({ hasText: pattern });
    try {
      await toast.first().waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
    async copyFirstJobTitle(): Promise<string | null> {
        try {
            const firstRow = this.page.locator('.oxd-table-card').first();
            await firstRow.scrollIntoViewIfNeeded();
            const text = await firstRow.innerText();
            // giả sử tên job title là dòng đầu tiên trong innerText
            const lines = text.split('\n');
            return lines[0] ?? null;
        } catch {
            return null;
        }
    }

    /** Tiện ích điền tất cả thông tin và click Save */
    async fillJobTitleDetails(
        name: string,
        description: string,
        note: string,
        file: { name: string; mimeType: string; buffer: Buffer } | null
    ) {
        await this.fillName(name);
        await this.page.waitForTimeout(200);
        await this.fillDescription(description);
        await this.page.waitForTimeout(200);
        await this.fillNote(note);
        await this.page.waitForTimeout(200);
        if (file) await this.uploadFile(file);
        await this.clickSaveButton();
    }
}
