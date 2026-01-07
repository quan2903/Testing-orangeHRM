import { EditLanguagePage } from "./edit-languages-page";
import { LanguagePage } from "../languages-page";
import { Page } from "playwright-core";

export type Language = Partial<{
    name: string;
}>;

export class EditLanguageAction {
    constructor(private page: Page) {}

    async goto() {
        const editPage = new EditLanguagePage(this.page);
        await editPage.goto();
    }

    async editLanguage(newName?: string) {
        const editPage = new EditLanguagePage(this.page);

        if (newName !== undefined) {
            await editPage.fillLanguageName(newName);
        }

        await editPage.clickSaveButton();
    }

    async editLanguageWithoutSave(newName: string) {
        const editPage = new EditLanguagePage(this.page);
        await editPage.fillLanguageName(newName);
    }

    async isNameErrorVisible(): Promise<boolean> {
        const languagePage = new LanguagePage(this.page);
        return languagePage.isLanguageNameErrorVisible();
    }

    async isLanguageExist(name: string): Promise<boolean> {
        const languagePage = new LanguagePage(this.page);
        return languagePage.isLanguageExist(name);
    }
}
