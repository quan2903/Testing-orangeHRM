import { Page, expect } from "@playwright/test";
import {EditSkillsPage} from "./edit-skills-page";
import { SkillsPage } from "../skills-page";
import { Skills } from "../skills-type";

export class EditSkillsAction {
    constructor(private page: Page) {}

    async goto(name : string) {
        const skillsPage = new SkillsPage(this.page);
        await skillsPage.clickEditButton(name);
    }

    async editSkills(skills: Skills) {
        const editPage = new EditSkillsPage(this.page);
        await this.goto(skills.name!);

        if (skills.name !== undefined) await editPage.fillSkillsName(skills.name);
        await editPage.clickSaveButton();
    }

    async editSkillsWithoutSave(skills: Skills) {
        const editPage = new EditSkillsPage(this.page);
        await this.goto(skills.name!);

        if (skills.name !== undefined) await editPage.fillSkillsName(skills.name);
        if (skills.description !== undefined) await editPage.fillSkillsDescription(skills.description);
    }

    async cancelEditSkills() {
        const addPage = new EditSkillsPage(this.page);
        await addPage.clickCancelButton();
    }

    async editAndVerifySkills(skills: Skills) {
        const editPage = new EditSkillsPage(this.page);
        await this.editSkillsWithoutSave(skills);
        await editPage.clickSaveButton();

        return await editPage.isSkillsNameErrorVisible();
    }

    async isNameErrorVisible() {
        const page = new EditSkillsPage(this.page);
        return await page.isSkillsNameErrorVisible();
    }
}
