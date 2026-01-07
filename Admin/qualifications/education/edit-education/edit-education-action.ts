import { EditEducationPage } from "./edit-education-page";
import { EducationPage } from "../education-page";
import { Page } from "playwright-core";

export type Education = Partial<{
    name: string;
}>;

export class EditEducationAction {
    constructor(private page: Page) {}

    async goto() {
        const editPage = new EditEducationPage(this.page);
        await editPage.goto();
    }

    async editEducation(newName: string) {
        const editPage = new EditEducationPage(this.page);

        await editPage.fillEducationName(newName);
        await editPage.clickSaveButton();
    }

    async editEducationWithoutSave(newName: string) {
        const editPage = new EditEducationPage(this.page);
        await editPage.fillEducationName(newName);
    }


    async isNameErrorVisible(): Promise<boolean> {
        const educationPage = new EducationPage(this.page);
        return educationPage.isEducationNameErrorVisible();
    }


    async isEducationExist(name: string): Promise<boolean> {
        const educationPage = new EducationPage(this.page);
        return educationPage.isEducationExist(name);
    }
}
