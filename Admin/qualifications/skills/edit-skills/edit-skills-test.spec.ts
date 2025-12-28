import {test, expect} from '@playwright/test';
import { EditSkillsAction } from './edit-skills-action';
import {QualificationsPage} from "../../qualification-page";
import { LoginPage } from '../../../login/login-page/LoginPage';
import {SkillsFactory} from '../../skills/skills-factory';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME 
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD


test.beforeEach(async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.goto();
    await loginpage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
    const qualificationsPage = new QualificationsPage(page);
    await qualificationsPage.goto();
    await qualificationsPage.navigateToSkills();
});

test.describe('chỉnh sửa skills thành công', () => {
    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng có 1 ký tự, toàn bộ là ký tự số', async ({ page }) => {
        const editSkillAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createValidNameWith1CharacterAndNumberCharacters();
        const skilledited = editSkillAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng có 119 ký tự, bao gồm ký tự đặc biệt', async ({ page }) => {
        const editSkillAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createValidNameWith119CharactersAndSpecialCharacters();
        const skilledited = editSkillAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });
    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng có 120 ký tự, bao gồm tất cả ký tự tiếng Việt', async ({ page }) => {
        const editSkillAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createValidNameWith120CharactersAndAllVietNameseCharacters();
        const skilledited = editSkillAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng là ký tự tiếng Trung', async ({ page }) => {
        const editSkillAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createValidNameWithChineseCharacters();
        const skilledited = editSkillAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng có thể dán từ clipboard', async ({ page }) => {
        const editSkillAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createValidPastableName();
        const skilledited = editSkillAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng có 1 ký tự space ở đầu', async ({ page }) => {
        const editSkillsAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createNameWithOneSpaceAtStart();
        const skilledited = editSkillsAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng có 1 ký tự space ở cuối', async ({ page }) => {
        const editSkillsAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createNameWithOneSpaceAtEnd();
        const skilledited = editSkillsAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng có nhiều ký tự space ở đầu', async ({ page }) => {
        const editSkillsAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createNameWithMultipleSpacesAtStart();
        const skilledited = editSkillsAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    }); 

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng có nhiều ký tự space ở cuối', async ({ page }) => {
        const editSkillsAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createNameWithMultipleSpacesAtEnd();
        const skilledited = editSkillsAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng trùng với tên kỹ năng có sẵn nhưng khác hoa/thường', async ({ page }) => {
        const editSkillsAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const baseSkill = skillsFactory.createValidPastableName();
        await editSkillsAction.editSkills(baseSkill);
        const variantSkill = skillsFactory.createNameWithDifferentCase(baseSkill.name!);
        const skilledited = await editSkillsAction.editAndVerifySkills(variantSkill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng và mô tả có 1 ký tự, toàn bộ là ký tự số', async ({ page }) => {
        const editSkillsAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createValidNameAndDescriptionWith1CharacterAndAllNumber();
        const skilledited = editSkillsAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng và mô tả có 399 ký tự, toàn bộ là ký tự đặc biệt', async ({ page }) => {
        const editSkillsAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createValidNameAndDescriptionWith399CharactersAndAllSpecialCharacters();
        const skilledited = editSkillsAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng và mô tả có 400 ký tự, toàn bộ là ký tự chữ và có tiếng Việt', async ({ page }) => {
        const editSkillsAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createValidNameAndDescriptionWith400CharactersAndAllVietNameseCharacters();
        const skilledited = editSkillsAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng và mô tả tiếng Trung', async ({ page }) => {
        const editSkillsAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createValidNameAndDescriptionWithChineseCharacters();
        const skilledited = editSkillsAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng và mô tả có 1 ký tự space ở đầu', async ({ page }) => {
        const editSkillsAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createValidNameAndDescriptionLeadingSpace();
        const skilledited = editSkillsAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng và mô tả có 1 ký tự space ở cuối', async ({ page }) => {
        const editSkillsAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createValidNameAndDescriptionTrailingSpace();
        const skilledited = editSkillsAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng và mô tả có nhiều ký tự space ở đầu', async ({ page }) => {
        const editSkillsAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createValidNameAndDescriptionMultipleLeadingSpaces();
        const skilledited = editSkillsAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    test('Kiểm tra chỉnh sửa kĩ năng với tên kỹ năng và mô tả có nhiều ký tự space ở cuối', async ({ page }) => {
        const editSkillsAction = new EditSkillsAction(page);
        const skillsFactory = new SkillsFactory();
        const skill = skillsFactory.createValidNameAndDescriptionMultipleTrailingSpaces();
        const skilledited = editSkillsAction.editAndVerifySkills(skill);
        expect(skilledited).toBeTruthy();
    });

    

})