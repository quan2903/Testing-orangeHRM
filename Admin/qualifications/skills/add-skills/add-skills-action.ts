// add-skills-action.ts
import { Page } from "@playwright/test";
import { SkillsPage } from "../skills-page";
import { AddSkillsPage } from "./add-skills-page";
import { Skills } from "../skills-type";

export class AddSkillsAction {
    constructor(private page: Page) {}

    async goto() {
        const skillsPage = new SkillsPage(this.page);
        await skillsPage.clickAddButton();
    }

    async addSkill(skill: Skills) {
        const addPage = new AddSkillsPage(this.page);
        await this.goto();
        
        if (skill.name !== undefined) {
            await addPage.fillSkillName(skill.name);

                if (skill.description !== undefined) {
                    await addPage.fillSkillDescription(skill.description);
                }
        }

        await addPage.clickSaveButton();
    }

    async addSkillWithoutSave(skill: Skills) {
        const addPage = new AddSkillsPage(this.page);
        await this.goto();

        if (skill.name !== undefined) {
            await addPage.fillSkillName(skill.name);
        }

        if (skill.description !== undefined) {
            await addPage.fillSkillDescription(skill.description);
        }
    }

    async cancelAddSkill() {
        const addPage = new AddSkillsPage(this.page);
        await addPage.clickCancelButton();
    }

    async addAndVerifySkills(skill: Skills): Promise<boolean> {
        const skillsPage = new SkillsPage(this.page);
        await this.addSkill(skill);
        return skillsPage.isSkillNameErrorVisible();
    }

    async isNameErrorVisible(): Promise<boolean> {
        const skillsPage = new SkillsPage(this.page);
        return skillsPage.isSkillNameErrorVisible();
    }

    async isSkillExist(name: string): Promise<boolean> {
        const skillsPage = new SkillsPage(this.page);
        return skillsPage.isSkillExist(name);
    }

    async copySkill(): Promise<string> {
        const skillsPage = new SkillsPage(this.page);
        const name = await skillsPage.getFirstSkillName();

        if (!name) {
            throw new Error('No skill found to copy');
        }

        return name;
    }
}
