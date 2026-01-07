import { Page } from '@playwright/test';

export class LocationPage {
    constructor(private page: Page) {}

    /* =======================
       SEARCH FORM
    ======================= */

    async fillName(name: string) {
        await this.page.getByLabel('Name').fill(name);
    }

    async fillCity(city: string) {
        await this.page.getByLabel('City').fill(city);
    }

    async selectCountry(country: string) {
        await this.page.getByText('-- Select --').click();
        await this.page.getByRole('option', { name: country }).click();
    }

    async clickSearch() {
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    async clickReset() {
        await this.page.getByRole('button', { name: 'Reset' }).click();
    }

    async searchLocation(criteria: {
        name?: string;
        city?: string;
        country?: string;
    }) {
        if (criteria.name !== undefined) {
            await this.fillName(criteria.name);
        }

        if (criteria.city !== undefined) {
            await this.fillCity(criteria.city);
        }

        if (criteria.country !== undefined) {
            await this.selectCountry(criteria.country);
        }

        await this.clickSearch();
    }

    /* =======================
       TABLE DATA (STYLE SKILLS)
    ======================= */

    async getFirstLocationName(): Promise<string | null> {
        try {
            const firstRow = this.page.locator('.oxd-table-card').first();
            await firstRow.waitFor({ state: 'visible', timeout: 5000 });

            const text = await firstRow.innerText();
            return text.split('\n')[0]?.trim() ?? null;
        } catch {
            return null;
        }
    }

    async getThirdLocationName(): Promise<string | null> {
        try {
            const row = this.page.locator('.oxd-table-card').nth(2);
            await row.waitFor({ state: 'visible', timeout: 10000 });

            const text = await row.innerText();
            return text.split('\n')[0]?.trim() ?? null;
        } catch {
            return null;
        }
    }

    async isLocationExist(name?: string): Promise<boolean> {
        if (!name) return false;

        const expectedName = name.trim();

        try {
            const rows = this.page.locator('.oxd-table-card');
            await rows.first().waitFor({ state: 'visible', timeout: 10000 });

            const count = await rows.count();

            for (let i = 0; i < count; i++) {
                const text = await rows.nth(i).innerText();
                const actualName = text.split('\n')[0]?.trim();

                if (actualName === expectedName) {
                    return true;
                }
            }

            return false;
        } catch {
            return false;
        }
    }


    async clickAddButton() {
        await this.page.getByRole('button', { name: 'Add' }).click();
    }

    async clickEditByName(name: string) {
        const rows = this.page.locator('.oxd-table-card');
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const text = await row.innerText();
            const locationName = text.split('\n')[0]?.trim();

            if (locationName === name.trim()) {
                await row.locator('button').nth(1).click(); 
                return;
            }
        }

        throw new Error(`Location "${name}" not found to edit`);
    }

    async clickDeleteByName(name: string) {
        const rows = this.page.locator('.oxd-table-card');
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const text = await row.innerText();
            const locationName = text.split('\n')[0]?.trim();

            if (locationName === name.trim()) {
                await row.locator('button').nth(0).click(); 
                return;
            }
        }

        throw new Error(`Location "${name}" not found to delete`);
    }
}
