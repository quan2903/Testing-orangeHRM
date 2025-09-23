import { Page } from "playwright-core";

export class EditJobTitle{
    constructor (public page: Page){

    }
    async goto(){
        const jobTitle = this.page.locator(`.oxd-table-card >> text=${name}`);
        await jobTitle.first().waitFor({ state: 'visible', timeout: 10000 });

        await jobTitle.locator('button:has(i.icon-pencil)').click();

    }
    async fillJobTitleDetails(jobTitle: string, jobDescription: string, note: string,file: { name: string; mimeType: string; buffer: Buffer } | null) {
      await this.page.getByRole('textbox').nth(1).fill("");
      await this.page.getByRole('textbox').nth(1).fill(jobTitle);
      await this.page.getByRole('textbox', { name: 'Type description here' }).fill("");
      await this.page.getByRole('textbox', { name: 'Type description here' }).fill(jobDescription);
      await this.page.getByRole('textbox', { name: 'Add note' }).fill("");
      await this.page.getByRole('textbox', { name: 'Add note' }).fill(note);
       if (file) {  
            await this.page.setInputFiles('input[type="file"]', file);
        }

        await this.page.getByRole('button', { name: 'Save' }).click();
      await this.page.getByRole('button', { name: 'Save' }).click();
    }
}