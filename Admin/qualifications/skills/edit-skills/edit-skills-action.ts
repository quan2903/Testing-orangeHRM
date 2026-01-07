import { Page } from "@playwright/test";
import { EditSkillsPage } from "./edit-skills-page";
import { SkillsPage } from "../skills-page";
import { Skills } from "../skills-type";

export class EditSkillsAction {
    constructor(private page: Page) {}

    async goto() {
        const EditskillsPage = new EditSkillsPage(this.page);
        await EditskillsPage.goto();
    }


    async editSkillsWithoutSave(skills: Skills) {
        const editPage = new EditSkillsPage(this.page);
        await this.goto();

        if (skills.name !== undefined) {
            await editPage.fillSkillName(skills.name);
        }

        if (skills.description !== undefined) {
            await editPage.fillSkillDescription(skills.description);
        }
    }

    async cancelEditSkills() {
        const editPage = new EditSkillsPage(this.page);
        await this.goto();
        await editPage.clickCancelButton();
    }

    async editAndVerifySkills(skills: Skills): Promise<boolean> {
        const editPage = new EditSkillsPage(this.page);
        await this.editSkillsWithoutSave(skills);
        await editPage.clickSaveButton();
        return (
    await editPage.isSkillsNameErrorVisible()
    || await editPage.isSkillsDescriptionErrorVisible()
);
    }

    async isNameErrorVisible(): Promise<boolean> {
        const editPage = new EditSkillsPage(this.page);
        return editPage.isSkillsNameErrorVisible();
    }

    async isDescriptionErrorVisible(): Promise<boolean> {
        const editPage = new EditSkillsPage(this.page);
        return editPage.isSkillsDescriptionErrorVisible();
    }
        async copySkill(): Promise<string> {
        const skillsPage = new SkillsPage(this.page);
        const name = await skillsPage.getThirdSkillName();

        if (!name) {
            throw new Error('No skill found to copy');
        }

        return name;
    }
    async isSkillExist(name: string): Promise<boolean> {
        const skillsPage = new SkillsPage(this.page);
        return skillsPage.isSkillExist(name);
    }


}
