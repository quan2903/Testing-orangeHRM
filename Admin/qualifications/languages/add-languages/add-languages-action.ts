import { Page } from "@playwright/test";
import { LanguagePage } from "../languages-page";
import { AddLanguagePage } from "./add-languages-page";
import { Language } from "../languages-type";

export class AddLanguageAction {
    constructor(private page: Page) {}

    async goto() {
        const languagePage = new LanguagePage(this.page);
        await languagePage.clickAddButton();
    }

    async addLanguage(language: Language) {
        const addPage = new AddLanguagePage(this.page);
        await this.goto();

        if (language.name !== undefined) {
            await addPage.fillLanguageName(language.name);
        }

        await addPage.clickSaveButton();
    }

    async addLanguageWithoutSave(language: Language) {
        const addPage = new AddLanguagePage(this.page);
        await this.goto();

        if (language.name !== undefined) {
            await addPage.fillLanguageName(language.name);
        }
    }

    async cancelAddLanguage() {
        const addPage = new AddLanguagePage(this.page);
        await addPage.clickCancelButton();
    }

    async addAndVerifyLanguage(language: Language): Promise<boolean> {
        const languagePage = new LanguagePage(this.page);
        await this.addLanguage(language);
        return languagePage.isLanguageNameErrorVisible();
    }

    async isNameErrorVisible(): Promise<boolean> {
        const languagePage = new LanguagePage(this.page);
        return languagePage.isLanguageNameErrorVisible();
    }
}
