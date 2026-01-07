import { Page } from '@playwright/test';

export class AddLocationPage {
    constructor(private page: Page) {}


    async fillName(name: string) {
        await this.page.locator('div:nth-child(2) > .oxd-input').first().fill(name);
        await this.page.waitForTimeout(500);
    }

    async fillCity(city: string) {
        await this.page.locator('div:nth-child(2) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input').first().fill(city);
        await this.page.waitForTimeout(500);
    }

    async fillState(state: string) {
        await this.page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-input').fill(state);
        await this.page.waitForTimeout(500);       
    }

    async fillZip(zip: string) {
        await this.page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-input').fill(zip);
        await this.page.waitForTimeout(500);      
    }

async selectCountry(country: string) {
    const dropdown = this.page.getByLabel('Country*');
    await dropdown.click();

    const panel = this.page.locator('.oxd-select-dropdown');
    const optionLocator = panel.locator('.oxd-select-option');

    const target = country.trim();

    let previousScrollTop = -1;

    while (true) {
        const count = await optionLocator.count();

        for (let i = 0; i < count; i++) {
            const option = optionLocator.nth(i);
            const text = (await option.innerText()).trim();

            if (text === target) {
                await option.click();
                return;
            }
        }

        // Scroll xuống
        const currentScrollTop = await panel.evaluate(el => el.scrollTop);
        await panel.evaluate(el => {
            el.scrollTop = el.scrollTop + el.clientHeight;
        });

        await this.page.waitForTimeout(200);

        const newScrollTop = await panel.evaluate(el => el.scrollTop);

        // Không scroll thêm được nữa → đã đến cuối
        if (newScrollTop === currentScrollTop || newScrollTop === previousScrollTop) {
            break;
        }

        previousScrollTop = currentScrollTop;
    }

    throw new Error(`Country "${country}" not found in dropdown`);
}


    async fillPhone(phone: string) {
        await this.page.locator('div:nth-child(5) > .oxd-input-group > div:nth-child(2) > .oxd-input').fill(phone);
        await this.page.waitForTimeout(500);
    }

    async fillFax(fax: string) {
        await this.page.locator('div:nth-child(6) > .oxd-input-group > div:nth-child(2) > .oxd-input').fill(fax);
        await this.page.waitForTimeout(500);
    }

    async fillAddress(address: string) {
        await this.page.locator('textarea').first().fill(address);
        await this.page.waitForTimeout(500);
    }

    async fillNotes(notes: string) {
        await this.page.locator('textarea').nth(1).fill(notes);
        await this.page.waitForTimeout(500);
    }

    /* =====================
       ACTION BUTTONS
    ===================== */

    async clickSave() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async clickCancel() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }

    /* =====================
       ERROR HANDLING
    ===================== */

    async isNameErrorVisible(): Promise<boolean> {
        return this.isErrorVisible('Required');
    }

    async isCountryErrorVisible(): Promise<boolean> {
        return this.isErrorVisible('Required');
    }
    async isPhoneErrorVisible(): Promise<boolean> {
        return this.isErrorVisible(/Invalid|Phone/);
    }
    async isFaxErrorVisible(): Promise<boolean> {
        return this.isErrorVisible(/Invalid|Fax/);
    }
    async isZipErrorVisible(): Promise<boolean> {
        return this.isErrorVisible(/Invalid|Zip|Postal/);
    }
    async isAddressErrorVisible(): Promise<boolean> {
        return this.isErrorVisible(/Should not exceed|Invalid/);
    }
    async isNotesErrorVisible(): Promise<boolean> {
        return this.isErrorVisible(/Should not exceed|Invalid/);
    }

    private async isErrorVisible(text: string | RegExp): Promise<boolean> {
        const errors = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        ).filter({ hasText: text });

        try {
            await errors.first().waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }
}
