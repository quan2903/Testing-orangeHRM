import { Page } from "playwright-core";

export class JobTitlesPage {
  constructor(public page: Page) {}

    async clickAddButton() {
      await this.page.getByRole('button', { name: 'Add' }).click();
    } 

  async fillJobTitleDetails(jobTitle: string, jobDescription: string, note: string) {
    await this.page.getByRole('textbox').nth(1).fill(jobTitle);
    await this.page.getByRole('textbox', { name: 'Type description here' }).fill(jobDescription);
    await this.page.getByRole('textbox', { name: 'Add note' }).fill(note);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }
}
