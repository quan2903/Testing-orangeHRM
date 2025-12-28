import { Page, expect } from "@playwright/test";
import { AddSkillsPage } from "./add-skills-page";
import { SkillsPage } from "../skills-page";
import { Skills } from "../skills-type";

export class AddSkillsAction {
    constructor(private page: Page) {}

    async goto() {
        const skillsPage = new SkillsPage(this.page);
        await skillsPage.clickAddButton();
    }

    async addSkills(skills: Skills) {
        const addPage = new AddSkillsPage(this.page);
        await this.goto();

        if (skills.name !== undefined) await addPage.fillSkillsName(skills.name);
        await addPage.clickSaveButton();
    }

    async addSkillsWithoutSave(skills: Skills) {
        const add = new AddSkillsPage(this.page);
        await this.goto();

        if (skills.name !== undefined) await add.fillSkillsName(skills.name);
        if (skills.description !== undefined) await add.fillSkillsDescription(skills.description);
    }

    async cancelAddSkills() {
        const addPage = new AddSkillsPage(this.page);
        await addPage.clickCancelButton();
    }

    async addAndVerifySkills(skills: Skills) {
        const addPage = new AddSkillsPage(this.page);
        await this.addSkillsWithoutSave(skills);
        await addPage.clickSaveButton();

        return await addPage.isSkillsNameErrorVisible();
    }

    async isNameErrorVisible() {
        const page = new AddSkillsPage(this.page);
        return await page.isSkillsNameErrorVisible();
    }
}
