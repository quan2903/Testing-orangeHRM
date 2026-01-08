// add-job-titles-action.ts
import { Page, expect } from "@playwright/test";
import { AddJobTitlesPage } from "./add-job-titles-page";

export type JobTitleInput = Partial<{
    name: string;
    description: string;
    note: string;
    file: { name: string; mimeType: string; buffer: Buffer } | null;
}>;

export class AddJobTitlesAction {
    constructor(private page: Page) {}

    async goto() {
        const addPage = new AddJobTitlesPage(this.page);
        await addPage.goto();
    }

    async addJobTitle(job: JobTitleInput) {
        const addPage = new AddJobTitlesPage(this.page);
        await addPage.goto();

        if (job.name !== undefined) await addPage.fillName(job.name);
        if (job.description !== undefined) await addPage.fillDescription(job.description);
        if (job.note !== undefined) await addPage.fillNote(job.note);
        if (job.file) await addPage.uploadFile(job.file as any);

        await addPage.clickSaveButton();
    }

    async addJobTitleWithoutSave(job: JobTitleInput) {
        const addPage = new AddJobTitlesPage(this.page);
        await addPage.goto();

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

        if (!job.name) throw new Error("Job title name is required for verification");

        const addPage = new AddJobTitlesPage(this.page);
        const exists = await addPage.isJobTitleExist(job.name);
        expect(exists).toBeTruthy();
    }

    async isNameErrorVisible() {
        const addPage = new AddJobTitlesPage(this.page);
        return addPage.isNameErrorVisible();
    }

    async isDescriptionErrorVisible() {
        const addPage = new AddJobTitlesPage(this.page);
        return addPage.isDescriptionErrorVisible();
    }

    async isNoteErrorVisible() {
        const addPage = new AddJobTitlesPage(this.page);
        return addPage.isNoteErrorVisible();
    }

    async isJobTitleExist(name: string, description?: string): Promise<boolean> {
        const addPage = new AddJobTitlesPage(this.page);
        return addPage.isJobTitleExist(name, description);
    }

    async isGlobalErrorNotificationVisible (): Promise<boolean>{
        const addPage = new AddJobTitlesPage(this.page); 
        return addPage.isGlobalErrorNotificationVisible();   
    }
    async copyFirstJobTitle(): Promise<string | null> {
        const addPage = new AddJobTitlesPage(this.page);
        return addPage.copyFirstJobTitle();
    }
}
