import {test, expect} from '@playwright/test';
import {AddSkillsAction} from './add-skills-action'; 
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
    await qualificationsPage.navigateToSkills();
});

test.describe('Thêm mới skills thành công', () => {
    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng có 1 ký tự, toàn bộ là ký tự số', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();


        const skill = skillsFactory.createValidNameWith1CharacterAndNumberCharacters();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()

    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng có 119 ký tự, bao gồm ký tự đặc biệt', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();


        const skill = skillsFactory.createValidNameWith119CharactersAndSpecialCharacters();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });
    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng có 120 ký tự, bao gồm tất cả ký tự tiếng Việt', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createValidNameWith120CharactersAndAllVietNameseCharacters();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng là ký tự tiếng Trung', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createValidNameWithChineseCharacters();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng có thể dán từ clipboard', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createValidPastableName();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng có 1 ký tự space ở đầu', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createNameWithOneSpaceAtStart();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng có 1 ký tự space ở cuối', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createNameWithOneSpaceAtEnd();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng có nhiều ký tự space ở đầu', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createNameWithMultipleSpacesAtStart();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    }); 

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng có nhiều ký tự space ở cuối', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createNameWithMultipleSpacesAtEnd();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng trùng với tên kỹ năng có sẵn nhưng khác hoa/thường', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const baseSkill = await addSkillsAction.copySkill();
        
        const variantSkill = skillsFactory.createNameWithDifferentCase(baseSkill);
        const skillAdded = await addSkillsAction.addAndVerifySkills(variantSkill);
        const exists = addSkillsAction.isSkillExist(variantSkill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng và mô tả có 1 ký tự, toàn bộ là ký tự số', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createValidNameAndDescriptionWith1CharacterAndAllNumber();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng và mô tả có 399 ký tự, toàn bộ là ký tự đặc biệt', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createValidNameAndDescriptionWith399CharactersAndAllSpecialCharacters();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng và mô tả có 400 ký tự, toàn bộ là ký tự chữ và có tiếng Việt', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createValidNameAndDescriptionWith400CharactersAndAllVietNameseCharacters();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng và mô tả tiếng Trung', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createValidNameAndDescriptionWithChineseCharacters();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng và mô tả có 1 ký tự space ở đầu', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createValidNameAndDescriptionLeadingSpace();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng và mô tả có 1 ký tự space ở cuối', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createValidNameAndDescriptionTrailingSpace();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng và mô tả có nhiều ký tự space ở đầu', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createValidNameAndDescriptionMultipleLeadingSpaces();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });

    test('Kiểm tra thêm mới kĩ năng với tên kỹ năng và mô tả có nhiều ký tự space ở cuối', async ({ page }) => {
        const addSkillsAction = new AddSkillsAction(page);
        const skillsFactory = new SkillsFactory();

        const skill = skillsFactory.createValidNameAndDescriptionMultipleTrailingSpaces();
        const skillAdded = await addSkillsAction.addAndVerifySkills(skill);
        const exists = await addSkillsAction.isSkillExist(skill.name!);
        expect(skillAdded).toBeFalsy();
        expect(exists).toBeTruthy()
    });
})

test.describe('Thêm mới skills thất bại', () => {
    test('Tên kỹ năng để trống', async ({ page }) => {
        const action = new AddSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createEmptyName();
        const errorVisible = await action.addAndVerifySkills(skill);
        const exists = action.isSkillExist(skill.name!);
        expect(errorVisible).toBeTruthy()
        expect(exists).toBeFalsy();
    });

    test('Tên kỹ năng có 121 ký tự', async ({ page }) => {
        const action = new AddSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createNameWith121Characters();
        const errorVisible = await action.addAndVerifySkills(skill);
        const exists = action.isSkillExist(skill.name!);
        expect(errorVisible).toBeTruthy()
        expect(exists).toBeFalsy();
    });

    test('Tên kỹ năng có 300 ký tự', async ({ page }) => {
        const action = new AddSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createNameWith300Characters();
        const errorVisible = await action.addAndVerifySkills(skill);
        const exists = action.isSkillExist(skill.name!);
        expect(errorVisible).toBeTruthy()
        expect(exists).toBeFalsy();
    });

    test('Tên kỹ năng toàn space', async ({ page }) => {
        const action = new AddSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createNameWithOnlySpaces();
        const errorVisible = await action.addAndVerifySkills(skill);
        const exists = action.isSkillExist(skill.name!);
        expect(errorVisible).toBeTruthy()
        expect(exists).toBeFalsy();
    });

    test('Tên kỹ năng trùng với tên có sẵn', async ({ page }) => {
        const action = new AddSkillsAction(page);
        const factory = new SkillsFactory();

        const baseSkill = factory.createValidPastableName();
        await action.addSkill(baseSkill);

        const duplicateSkill = factory.createDuplicateName(baseSkill.name!);
        const errorVisible = await action.addAndVerifySkills(duplicateSkill);
        const exists = action.isSkillExist(duplicateSkill.name!);
        expect(errorVisible).toBeTruthy()
        expect(exists).toBeFalsy();
    });

    test('Tên kỹ năng và mô tả có 401 ký tự', async ({ page }) => {
        const action = new AddSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createNameAndDescriptionWith401Characters();
        const errorVisible = await action.addAndVerifySkills(skill);
        const exists = action.isSkillExist(skill.name!);
        expect(errorVisible).toBeTruthy()
        expect(exists).toBeFalsy();
    });

    test('Tên kỹ năng và mô tả có 600 ký tự', async ({ page }) => {
        const action = new AddSkillsAction(page);
        const factory = new SkillsFactory();

        const skill = factory.createNameAndDescriptionWith600Characters();
        const errorVisible = await action.addAndVerifySkills(skill);
        const exists = action.isSkillExist(skill.name!);
        expect(errorVisible).toBeTruthy()
        expect(exists).toBeFalsy();
    });
});