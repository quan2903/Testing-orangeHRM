import { Page } from '@playwright/test';

export class LocationPage {
  constructor(private page: Page) {}

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

  private async findRowByLocationName(name: string) {
    if (!name) return null;

    const expectedName = name.trim();

    while (true) {
      const rows = this.page.locator('.oxd-table-card');
      const count = await rows.count();

      for (let i = 0; i < count; i++) {
        const row = rows.nth(i);
        const locationName = (
          await row.locator('.oxd-table-cell').nth(1).innerText()
        ).trim();

        if (locationName === expectedName) {
          return row;
        }
      }

      const nextBtn = this.page
        .locator('.oxd-pagination-page-item--previous-next')
        .nth(1);

      if (!(await nextBtn.isVisible())) break;

      await nextBtn.click();
      await this.page.waitForTimeout(300);
    }

    return null;
  }

  async getFirstLocationName(): Promise<string | null> {
    try {
      const firstRow = this.page.locator('.oxd-table-card').first();
      await firstRow.waitFor({ state: 'visible', timeout: 5000 });

      const name = await firstRow
        .locator('.oxd-table-cell')
        .nth(1)
        .innerText();

      return name.trim();
    } catch {
      return null;
    }
  }

  async isLocationExist(name?: string): Promise<boolean> {
    if (!name) return false;

    const row = await this.findRowByLocationName(name);
    return row !== null;
  }

  async clickAddButton() {
    await this.page.getByRole('button', { name: 'Add' }).click();
  }

  async clickEditByName(name: string) {
    const row = await this.findRowByLocationName(name);

    if (!row) {
      throw new Error(`Location "${name}" not found to edit`);
    }

    await row.locator('button:has(i.icon-pencil)').click();
  }

  async clickDeleteByName(name: string) {
    const row = await this.findRowByLocationName(name);

    if (!row) {
      throw new Error(`Location "${name}" not found to delete`);
    }

    await row.locator('button:has(i.icon-trash)').click();
  }
}
