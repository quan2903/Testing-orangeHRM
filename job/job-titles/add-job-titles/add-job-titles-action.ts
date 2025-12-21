import { Page, expect } from "@playwright/test";
import { JobTitlesPage } from "../job-title-page";
import { AddJobTitlesPage } from "./add-job-titles-page";

export type JobTitleInput = Partial<{
  name: string;
  description: string;
  note: string;
  file: { name: string; mimeType: string; buffer: Buffer } | null;
}>;

export class AddJobTitlesAction {
  constructor(private page: Page) {}

  /* =======================
     Navigation
  ======================== */
  async goto() {
    await this.page.getByRole("button", { name: "Add" }).click();
  }

  async addJobTitle(job: JobTitleInput) {
    const addPage = new AddJobTitlesPage(this.page);
    await this.goto();

    if (job.name !== undefined) await addPage.fillName(job.name);
    if (job.description !== undefined) await addPage.fillDescription(job.description);
    if (job.note !== undefined) await addPage.fillNote(job.note);
    if (job.file) await addPage.uploadFile(job.file as any);

    await addPage.clickSaveButton();
  }

  async addJobTitleWithoutSave(job: JobTitleInput) {
    const addPage = new AddJobTitlesPage(this.page);
    await this.goto();

    if (job.name !== undefined) await addPage.fillName(job.name);
    if (job.description !== undefined) await addPage.fillDescription(job.description);
    if (job.note !== undefined) await addPage.fillNote(job.note);
    if (job.file) await addPage.uploadFile(job.file as any);
  }

  async cancelAddJobTitle() {
    const addPage = new AddJobTitlesPage(this.page);
    await addPage.clickCancelButton();
  }


  async addAndVerifyJobTitle(job: JobTitleInput) {
    await this.addJobTitle(job);

    if (!job.name) {
      throw new Error("Job title name is required for verification");
    }

    const jobTitlesPage = new JobTitlesPage(this.page);
    const exists = await jobTitlesPage.isJobTitlesexist(job.name);
    expect(exists).toBe(true);
  }


  async isNameErrorVisible() {
    const page = new AddJobTitlesPage(this.page);
    return await page.isNameErrorVisible();
  }

  async isDescriptionErrorVisible() {
    const page = new AddJobTitlesPage(this.page);
    return await page.isDescriptionErrorVisible();
  }

  async isNoteErrorVisible() {
    const page = new AddJobTitlesPage(this.page);
    return await page.isNoteErrorVisible();
  }


  async isJobTitleExist(name: string): Promise<boolean> {
    const jobTitlesPage = new JobTitlesPage(this.page);
    return await jobTitlesPage.isJobTitlesexist(name);
  }
}
