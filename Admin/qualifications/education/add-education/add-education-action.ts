import { Page } from "@playwright/test";
import { EducationPage } from "../education-page";
import { AddEducationPage } from "./add-education-page";

export type Education = Partial<{
    name: string;
}>;

export class AddEducationAction {
    constructor(private page: Page) {}

    async goto() {
        const educationPage = new EducationPage(this.page);
        await educationPage.clickAddButton();
    }

    async addEducation(education: Education) {
        const addPage = new AddEducationPage(this.page);
        await this.goto();

        if (education.name !== undefined) {
            await addPage.fillEducationName(education.name);
        }

        await addPage.clickSaveButton();
    }

    async addEducationWithoutSave(education: Education) {
        const addPage = new AddEducationPage(this.page);
        await this.goto();

        if (education.name !== undefined) {
            await addPage.fillEducationName(education.name);
        }
    }

    async cancelAddEducation() {
        const addPage = new AddEducationPage(this.page);
        await addPage.clickCancelButton();
    }

    async addAndVerifyEducation(education: Education): Promise<boolean> {
        const educationPage = new EducationPage(this.page);
        await this.addEducation(education);
        return educationPage.isEducationNameErrorVisible();
    }

    async isNameErrorVisible(): Promise<boolean> {
        const educationPage = new EducationPage(this.page);
        return educationPage.isEducationNameErrorVisible();
    }
}
