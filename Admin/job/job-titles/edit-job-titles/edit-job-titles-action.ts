import { Page } from "@playwright/test";
import { EditJobTitle } from "./edit-job-titles-page";

export class EditJobTitleAction {
  private editJobTitle: EditJobTitle;

  constructor(private page: Page) {
    this.editJobTitle = new EditJobTitle(page);
  }

  async goto() {
    await this.editJobTitle.goto();
  }

  async editAndVerify(
    jobTitle?: string,
    jobDescription?: string,
    note?: string,
    file?: { name: string; mimeType: string; buffer: Buffer } | null
  ) {
    await this.editJobTitle.fillJobTitleDetails(jobTitle, jobDescription, note, file);
  }

  async isJobTitleErrorVisible(): Promise<boolean> {
    return this.editJobTitle.isJobTitleErrorVisible();
  }

  async isJobDescriptionErrorVisible(): Promise<boolean> {
    return this.editJobTitle.isJobDescriptionErrorVisible();
  }

  async isJobNoteErrorVisible(): Promise<boolean> {
    return this.editJobTitle.isJobNoteErrorVisible();
  }

  async isAttachmentErrorVisible(): Promise<boolean> {
    return this.editJobTitle.isAttachmentErrorVisible();
  }

  async isGlobalErrorNotificationVisible(pattern?: string | RegExp): Promise<boolean> {
    return this.editJobTitle.isGlobalErrorNotificationVisible(pattern);
  }

  async isEditSuccessful(): Promise<boolean> {
    return this.editJobTitle.isEditSuccessful();
  }
}
