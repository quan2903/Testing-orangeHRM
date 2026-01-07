import { Page } from "@playwright/test";
import {JobTitleType} from "../job-titles-type"
export class EditJobTitle {
  private _lastJobTitle?: string;
  private _lastJobDescription?: string;

  constructor(public page: Page) {}

  async goto() {
    const firstRow = this.page.locator('.oxd-table-card').first();
    await firstRow.waitFor({ state: 'visible', timeout: 10000 });
    await firstRow.getByRole('button').nth(1).click();
    await this.page.getByRole('textbox').nth(1).waitFor({
      state: 'visible',
      timeout: 10000,
    });
  }

  async fillJobTitle(jobTitle?: string) {
    if (jobTitle !== undefined) {
      const locator = this.page.getByRole('textbox').nth(1);
      await locator.click();
      await locator.fill(jobTitle);
      this._lastJobTitle = jobTitle;
    }
  }

  async fillJobDescription(jobDescription?: string) {
    if (jobDescription !== undefined) {
      const locator = this.page.getByRole('textbox', { name: 'Type description here' });
      await locator.fill(jobDescription);
      this._lastJobDescription = jobDescription;
    }
  }

  async fillNote(note?: string) {
    if (note !== undefined) {
      const locator = this.page.getByRole('textbox', { name: 'Add note' });
      await locator.fill(note);
    }
  }

  async uploadFile(file?: { name: string; mimeType: string; buffer: Buffer } | null) {
    if (file) {
      await this.page.setInputFiles('input[type="file"]', file);
    }
  }

  async fillJobTitleDetails(
    jobTitle?: string,
    jobDescription?: string,
    note?: string,
    file?: { name: string; mimeType: string; buffer: Buffer } | null
  ) {
    await this.fillJobTitle(jobTitle);
    await this.fillJobDescription(jobDescription);
    await this.fillNote(note);
    await this.uploadFile(file);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  private async isErrorVisible(pattern: string | RegExp): Promise<boolean> {
    const error = this.page
      .locator('span.oxd-input-field-error-message')
      .filter({ hasText: pattern });
    try {
      await error.first().waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isJobTitleErrorVisible(): Promise<boolean> {
    return this.isErrorVisible(/Required|Already exists|Should not exceed|Invalid|Only spaces/);
  }

  async isJobDescriptionErrorVisible(): Promise<boolean> {
    return this.isErrorVisible(/Should not exceed|Invalid/);
  }

  async isJobNoteErrorVisible(): Promise<boolean> {
    return this.isErrorVisible(/Should not exceed|Invalid/);
  }

  async isAttachmentErrorVisible(): Promise<boolean> {
    return this.isErrorVisible(/File type not allowed|Invalid file|File size exceeded/);
  }

  async isEditSuccessful(): Promise<boolean> {
      if (!this._lastJobTitle) return false;

      try {
          const scrollable = this.page.locator('.oxd-table-body');
          let found = false;
          let lastScrollHeight = 0;

          while (true) {
              const rows = this.page.locator('.oxd-table-card');
              const count = await rows.count();

              for (let i = 0; i < count; i++) {
                  const row = rows.nth(i);
                  await row.scrollIntoViewIfNeeded();
                  const text = await row.innerText();
                  if (
                      text.includes(this._lastJobTitle) &&
                      (!this._lastJobDescription || text.includes(this._lastJobDescription))
                  ) {
                      found = true;
                      break;
                  }
              }

              if (found) break;

              const currentScrollHeight = await scrollable.evaluate(el => el.scrollHeight);
              if (currentScrollHeight === lastScrollHeight) break; 
              lastScrollHeight = currentScrollHeight;

              await scrollable.evaluate(el => el.scrollBy(0, 300)); 
              await this.page.waitForTimeout(200); 
          }

          return found;
      } catch {
          return false;
      }
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
}
