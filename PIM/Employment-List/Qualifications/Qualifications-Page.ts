import { Page } from '@playwright/test';
import { EmploymentListPage } from '../Employment-List-Page';

export class QualificationsPage {
    constructor(private page: Page) {}

    async goto() {
        const employmentListPage = new EmploymentListPage(this.page);
        await employmentListPage.clickEditFirstRow();
        await this.page.getByRole('tab', { name: 'Qualifications' }).click();
    }

    async clickAddWorkExperience() {
        await this.page.locator('.oxd-button').first().click();
    }
    async clickAddEducation(){
        await this.page.locator('div').filter({ hasText: /^Education Add No Records FoundLevelYearGPA\/ScoreActions$/ }).locator('div').filter({ hasText: /^Education Add No Records FoundLevelYearGPA\/ScoreActions$/ }).getByRole('button').click();
    }
    async clickAddSkills(){
        await this.page.locator('div').filter({ hasText: /^Skills Add No Records FoundSkillYears of ExperienceActions$/ }).getByRole('button').click();
    }
    async clickAddLanguages(){
        await this.page.locator('div').filter({ hasText: /^Languages Add No Records FoundLanguageFluencyCompetencyCommentsActions$/ }).getByRole('button').click();
    }
    async clickAddLicense(){
        await this.page.locator('div:nth-child(6) > div:nth-child(2) > .orangehrm-action-header > .oxd-button').click();
    }
    
}