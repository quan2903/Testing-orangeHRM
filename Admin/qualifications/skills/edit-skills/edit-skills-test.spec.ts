import { test, expect } from '@playwright/test';
import { EditSkillsAction } from '../edit-skills/edit-skills-action';
import { QualificationsPage } from "../../qualification-page";
import { LoginPage } from '../../../login/login-page/LoginPage';
import { SkillsFactory } from '../../skills/skills-factory';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

test.beforeEach(async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.goto();
    await loginpage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);

    const qualificationsPage = new QualificationsPage(page);
    await qualificationsPage.navigateToSkills();
});

test.describe('Chỉnh sửa skills thành công', () => {
    test('Tên kỹ năng có 1 ký tự, toàn bộ là ký tự số', async ({ page }) => {
        const action = new EditSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createValidNameWith1CharacterAndNumberCharacters();
        const errorVisible = await action.editAndVerifySkills(skill);
        const exists = await action.isSkillExist(skill.name!);
        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();    
    });

    test('Tên kỹ năng có 119 ký tự, bao gồm ký tự đặc biệt', async ({ page }) => {
        const action = new EditSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createValidNameWith119CharactersAndSpecialCharacters();
        const errorVisible = await action.editAndVerifySkills(skill);
        const exists = await action.isSkillExist(skill.name!);
        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();        
    });

    test('Tên kỹ năng có 120 ký tự, toàn bộ tiếng Việt', async ({ page }) => {
        const action = new EditSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createValidNameWith120CharactersAndAllVietNameseCharacters();
        const errorVisible = await action.editAndVerifySkills(skill);
        const exists = await action.isSkillExist(skill.name!);
        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();    
    });

    test('Tên kỹ năng tiếng Trung', async ({ page }) => {
        const action = new EditSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createValidNameWithChineseCharacters();
        const errorVisible = await action.editAndVerifySkills(skill);
        const exists = await action.isSkillExist(skill.name!);
        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();    
    });

    test('Tên kỹ năng có space ở đầu', async ({ page }) => {
        const action = new EditSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createNameWithOneSpaceAtStart();
        const errorVisible = await action.editAndVerifySkills(skill);
        const exists = await action.isSkillExist(skill.name!);
        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();    
    });

    test('Tên kỹ năng có space ở cuối', async ({ page }) => {
        const action = new EditSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createNameWithOneSpaceAtEnd();
        const errorVisible = await action.editAndVerifySkills(skill);
        const exists = await action.isSkillExist(skill.name!);
        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();    
    });

    test('Tên kỹ năng + mô tả hợp lệ', async ({ page }) => {
        const action = new EditSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createValidNameAndDescriptionWith400CharactersAndAllVietNameseCharacters();
        const errorVisible = await action.editAndVerifySkills(skill);
        const exists = await action.isSkillExist(skill.name!);
        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();    
    });
});

test.describe('Chỉnh sửa skills thất bại', () => {
    test('Tên kỹ năng để trống', async ({ page }) => {
        const action = new EditSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createEmptyName();
        const errorVisible = await action.editAndVerifySkills(skill);
        const exists = await action.isSkillExist(skill.name!);
        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });
    test('Tên kỹ năng có 121 ký tự', async ({ page }) => {
        const action = new EditSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createNameWith121Characters();
        const errorVisible = await action.editAndVerifySkills(skill);
        const exists = await action.isSkillExist(skill.name!);
        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });

    test('Tên kỹ năng toàn space', async ({ page }) => {
        const action = new EditSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createNameWithOnlySpaces();
        const errorVisible = await action.editAndVerifySkills(skill);
        const exists = await action.isSkillExist(skill.name!);
        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });

    test('Tên kỹ năng trùng với kỹ năng có sẵn', async ({ page }) => {
        const action = new EditSkillsAction(page);
        const factory = new SkillsFactory();

        const baseName = await action.copySkill();
        const duplicateSkill = factory.createDuplicateName(baseName);
        const errorVisible = await action.editAndVerifySkills(duplicateSkill);
        const exists = await action.isSkillExist(duplicateSkill.name!);
        expect(errorVisible).toBeTruthy();
        expect(exists).toBeTruthy();    
    });

    test('Mô tả có 401 ký tự', async ({ page }) => {
        const action = new EditSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createNameAndDescriptionWith401Characters();
        const errorVisible = await action.editAndVerifySkills(skill);
        const exists = await action.isSkillExist(skill.name!);
        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });

    test('Mô tả có 600 ký tự', async ({ page }) => {
        const action = new EditSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createNameAndDescriptionWith600Characters();
        const errorVisible = await action.editAndVerifySkills(skill);
        const exists = await action.isSkillExist(skill.name!);
        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });

});