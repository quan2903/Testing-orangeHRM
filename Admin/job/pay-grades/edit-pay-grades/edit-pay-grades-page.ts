import { Page } from "playwright-core";

export class EditPayGradesPage {
    constructor(public page: Page) {}

    async fillName(name: string) {
        const input = this.page.getByRole('textbox').nth(1);
        await input.clear();
        await input.fill(name);
    }

async selectRandomCurrency(): Promise<string> {
    const dropdown = this.page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2);
    await dropdown.click();

    const panel = this.page.locator('.oxd-select-dropdown');
    const optionLocator = panel.locator('.oxd-select-option');

    const collected: string[] = [];
    let previousScrollTop = -1;

    while (true) {
        const count = await optionLocator.count();

        for (let i = 0; i < count; i++) {
            const text = (await optionLocator.nth(i).innerText()).trim();
            if (text && !collected.includes(text)) {
                collected.push(text);
            }
        }

        const currentScrollTop = await panel.evaluate(el => el.scrollTop);

        await panel.evaluate(el => {
            el.scrollTop = el.scrollTop + el.clientHeight;
        });

        await this.page.waitForTimeout(200);

        const newScrollTop = await panel.evaluate(el => el.scrollTop);

        if (newScrollTop === currentScrollTop || newScrollTop === previousScrollTop) {
            break;
        }

        previousScrollTop = currentScrollTop;
    }

    if (collected.length === 0) {
        throw new Error('Currency dropdown is empty');
    }

    const randomIndex = Math.floor(Math.random() * collected.length);
    const chosenCurrency = collected[randomIndex];

    await optionLocator
        .filter({ hasText: chosenCurrency })
        .first()
        .click();

    return chosenCurrency;
}

    async fillMinimumSalary(minimumSalary: number) {
        const input = this.page.getByRole('textbox').nth(3);
        await input.clear();
        await input.fill(minimumSalary.toString());
    }

    async fillMaximumSalary(maximumSalary: number) {
        const input = this.page.getByRole('textbox').nth(3);
        await input.clear();
        await input.fill(maximumSalary.toString());
    }

    async clickSave() {
        await this.page.getByRole('button', { name: 'Save' }).nth(1).click();
    }

    async clickCancel() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }

    async isCurrencyErrorVisible(): Promise<boolean> {
        const container = this.page.locator('//label[normalize-space()="Currency"]/ancestor::div[1]');
        const error = container.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: /Required/ });
        try { await error.first().waitFor({ state: 'visible', timeout: 5000 }); return true; } 
        catch { return false; }
    }

    async isMinimumSalaryErrorVisible(): Promise<boolean> {
        const container = this.page.locator('//label[normalize-space()="Minimum Salary"]/ancestor::div[1]');
        const error = container.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: /Required|Should be a valid number|Minimum Salary must not exceed Maximum Salary/ });
        try { await error.first().waitFor({ state: 'visible', timeout: 5000 }); return true; } 
        catch { return false; }
    }

    async isMaximumSalaryErrorVisible(): Promise<boolean> {
        const container = this.page.locator('//label[normalize-space()="Maximum Salary"]/ancestor::div[1]');
        const error = container.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
        .filter({hasText: 'Should be less than 1,000,000,000'});
        try { await error.first().waitFor({ state: 'visible', timeout: 5000 }); return true; } 
        catch { return false; }
    }


}
