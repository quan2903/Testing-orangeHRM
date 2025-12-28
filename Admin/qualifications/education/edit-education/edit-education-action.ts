import { EditEducationPage } from "./edit-education-page";

export type Education = Partial<{
    name: string;
}>;

export class EditEducationAction {
    constructor(private page: Page) {}
    async goto(name: string) {
        const editPage = new EditEducationPage(this.page);
        await editPage.goto(name);
    }
    async editEducation(education: Education) {
        const editPage = new EditEducationPage(this.page);
        if (education.name !== undefined) await editPage.fillEducationName(education.name);

        await editPage.clickSaveButton();
    }
    async editEducationWithoutSave(education: Education) {
        const editPage = new EditEducationPage(this.page);
        if (education.name !== undefined) await editPage.fillEducationName(education.name);
    }
    async isNameErrorVisible() {
        const page = new EditEducationPage(this.page);
        return await page.isEducationNameErrorVisible();
    }
}