import { Page, expect } from "@playwright/test";
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

        if (education.name !== undefined) await addPage.fillEducationName(education.name);

        await addPage.clickSaveButton();
    }

    async addEducationWithoutSave(education: Education) {
        const addEducation = new AddEducationPage(this.page);
        await this.goto();

        if (education.name !== undefined) await addEducation.fillEducationName(education.name);
    }

    async cancelAddEducation() {
        const addPage = new AddEducationPage(this.page);
        await addPage.clickCancelButton();
    }

    async addAndVerifyEducation(education: Education) {
        const addPage = new AddEducationPage(this.page);
        await this.addEducationWithoutSave(education);
        await addPage.clickSaveButton();
        
        return await addPage.isEducationNameErrorVisible();
    }

    async isNameErrorVisible() {
        const page = new AddEducationPage(this.page);
        return await page.isEducationNameErrorVisible();
    }
}
