import { test, expect } from '@playwright/test';
import { JobTitleFactory } from "../job-titles-factory";
import { LoginPage } from "../../../login/login-page/LoginPage";
import { JobPage } from '../../job-page';
import { EditJobTitleAction } from './edit-job-titles-action';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    test.beforeEach(async ({ page }) => {
        const loginpage = new LoginPage(page);
        await loginpage.goto();
        await loginpage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);

        const jobpage = new JobPage(page);
        await jobpage.goto();
        await jobpage.navigateToJobTitles();
    });
    test.describe("Kiểm tra Chỉnh sửa chức danh công việc mới hợp lệ", () => {
        const factory = new JobTitleFactory();

        test("Chỉnh sửa chức danh công việc với dữ liệu tối thiểu", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidWithMinimalFields();
            await action.editAndVerify(data.name);
            expect (await action.isEditSuccessful()).toBeTruthy()
        });

        test("Chỉnh sửa chức danh với tên 1 ký tự", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidNameWith1Characters();
            await action.editAndVerify(data.name);
        });

        test("Chỉnh sửa chức danh với tên và mô tả 1 ký tự", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createNameAndDescriptionWith1Characters();
            await action.editAndVerify(data.name, data.description);
        });

        test("Chỉnh sửa chức danh với tên và mô tả 399 ký tự", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createNameAndDescriptionWith399Characters();
            await action.editAndVerify(data.name, data.description);
        });

        test("Chỉnh sửa chức danh với tên và mô tả 400 ký tự", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createNameAndDescriptionWith400Characters();
            await action.editAndVerify(data.name, data.description);
        });

        test("Chỉnh sửa chức danh với tên có ký tự đặc biệt", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidNameWithSpecialCharacters();
            await action.editAndVerify( data.name);
        });

        test("Chỉnh sửa chức danh với tên và ghi chú 399 ký tự", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createNameAndNoteWith399Characters();
            await action.editAndVerify(data.name, data.note );
        });

        test("Chỉnh sửa chức danh với tên và ghi chú 400 ký tự", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createNameAndNoteWith400Characters();
            await action.editAndVerify(data.name, data.note );
        });

        test("Chỉnh sửa chức danh với tên và ghi chú có ký tự đặc biệt", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createNameAndNoteWithSpecialCharacters();
            await action.editAndVerify(data.name, data.note);
        });

        test("Chỉnh sửa chức danh với mọi thông tin đều được điền", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            const data = factory.createAllFieldsFilled();
            await action.editAndVerify(data.name, data.description,data.note, data.file );
            expect (await action.isJobTitleErrorVisible() && await action.isJobNoteErrorVisible() && action.isJobDescriptionErrorVisible()).toBeFalsy()
        });

        test("Chỉnh sửa chức danh với tên paste từ nơi khác", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidNameByPastingText();
            await action.editAndVerify(data.name);
            expect (await action.isJobTitleErrorVisible()).toBeFalsy()
        });

        test("Chỉnh sửa chức danh với ghi chú paste từ nơi khác", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidNoteByPastingText();
            await action.editAndVerify(data.name, data.note);
            expect (await action.isJobNoteErrorVisible()).toBeFalsy()
        });

        test("Chỉnh sửa chức danh với mô tả paste từ nơi khác", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidDescriptionByPastingText();
            await action.editAndVerify(data.name, data.description );
            expect (await action.isJobDescriptionErrorVisible()).toBeFalsy()
        });

        test("Chỉnh sửa chức danh với 1 space ở đầu tên", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidNameWith1SpaceCharacterAtTheBeginning();
            await action.editAndVerify(data.name);
            expect (await action.isJobTitleErrorVisible()).toBeFalsy()
        });

        test("Chỉnh sửa chức danh với 1 space ở cuối tên", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidNameWith1SpaceCharacterAtTheEnd();
            await action.editAndVerify(data.name);
            expect (await action.isJobTitleErrorVisible()).toBeFalsy()
        });

        test("Chỉnh sửa chức danh với nhiều space ở đầu tên", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidNameWithLeadingSpaces();
            await action.editAndVerify(data.name);
            expect (await action.isJobTitleErrorVisible()).toBeFalsy()
        });

        test("Chỉnh sửa chức danh với nhiều space ở cuối tên", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidNameWithTrailingSpaces();
            await action.editAndVerify(data.name);
            expect (await action.isJobTitleErrorVisible()).toBeFalsy()
        });

        test("Chỉnh sửa chức danh với space ở giữa tên", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidNameWithMiddleSpaces();
            await action.editAndVerify(data.name);
            expect (await action.isJobTitleErrorVisible()).toBeFalsy()
        });

        test("Chỉnh sửa chức danh với tên 99 ký tự", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidNameWith99Characters();
            await action.editAndVerify(data.name);
            expect (await action.isJobTitleErrorVisible()).toBeFalsy()
        });

        test("Chỉnh sửa chức danh với tên 100 ký tự", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidNameWith100Characters();
            
            await action.editAndVerify(data.name);
            expect (await action.isJobTitleErrorVisible()).toBeFalsy()
        });

        test("Chỉnh sửa chức danh với tên có ký tự số", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidNameWithNumberCharacters();
            await action.editAndVerify (data.name);
            expect (await action.isJobTitleErrorVisible()).toBeFalsy()
        });

        test("Chỉnh sửa chức danh với tên tiếng Trung", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidNameWithChineseCharacters();
            await action.editAndVerify(data.name);
            expect (await action.isJobTitleErrorVisible()).toBeFalsy()
        });

        test("Chỉnh sửa chức danh với tên tiếng Việt", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const data = factory.createValidNameWithVietnameseCharacters();
            await action.editAndVerify(data.name);
            expect (await action.isJobTitleErrorVisible()).toBeFalsy()
        });

        test("Chỉnh sửa chức danh trùng tên nhưng khác hoa/thường", async ({ page }) => {
            const action = new EditJobTitleAction(page);
            await action.goto();
            const base = factory.createValidWithMinimalFields();
            await action.editAndVerify(base.name);
            const dup = factory.createValidNameSameWithExistingJobDifferentUppercase(base.name);
            await action.editAndVerify(dup.name);
            expect (await action.isJobTitleErrorVisible() || action.isGlobalErrorNotificationVisible()).toBeFalsy()
        });
    });

test.describe("Kiểm tra chỉnh sửa chức danh công việc thất bại", () => {
  const factory = new JobTitleFactory();

  test("Chỉnh sửa với mọi thông tin để trống", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);
    await editAction.goto();

    const data = factory.createInvalidEmptyAllFields();
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isJobTitleErrorVisible()).toBeTruthy();

    expect(await editAction.isJobNoteErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa với chỉ tên công việc để trống", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);
    await editAction.goto();

    const data = factory.createInvalidEmptyName();
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isJobTitleErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa với tên công việc trùng tên cũ", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);

    await editAction.goto();

    const data = factory.createInvalidNameExisting('Chief Security Specialist');
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isJobTitleErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa với tên toàn ký tự space", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);
    await editAction.goto();

    const data = factory.createInvalidNameWithOnlySpaces();
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isJobTitleErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa với tên 101 ký tự", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);
    await editAction.goto();

    const data = factory.createInvalidNameWith101Characters();
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isJobTitleErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa với tên 255 ký tự", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);
    await editAction.goto();

    const data = factory.createInvalidNameWith255Characters();
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isJobTitleErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa với tên có emoji", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);
    await editAction.goto();

    const data = factory.createInvalidNameWithEmoji();
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isJobTitleErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa với mô tả 401 ký tự", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);
    await editAction.goto();

    const data = factory.createInvalidDescriptionWith401Characters();
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isJobDescriptionErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa với mô tả 600 ký tự", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);
    await editAction.goto();

    const data = factory.createInvalidDescriptionWith600Characters();
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isJobDescriptionErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa với ghi chú có emoji", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);
    await editAction.goto();

    const data = factory.createInvalidNoteWithEmoji();
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isJobNoteErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa với ghi chú 401 ký tự", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);
    await editAction.goto();

    const data = factory.createInvalidNoteWith401Characters();
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isJobNoteErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa với ghi chú 600 ký tự", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);
    await editAction.goto();

    const data = factory.createInvalidNoteWith600Characters();
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isJobNoteErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa tên trùng có 1 space ở đầu", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);

    await editAction.goto();

    const data = factory.createInvalidNameExistingWith1SpaceCharacterAtTheBeginning('Chief Security Specialist');
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isGlobalErrorNotificationVisible() || editAction.isJobTitleErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa tên trùng có 1 space ở cuối", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);

    await editAction.goto();

    const data = factory.createInvalidNameExistingWith1SpaceCharacterAtTheEnd('Chief Security Specialist');
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isGlobalErrorNotificationVisible() || editAction.isJobTitleErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa tên trùng có nhiều space ở đầu", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);
    await editAction.goto();

    const data = factory.createInvalidNameExistingWithLeadingSpaces('Chief Security Specialist');
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(editAction.isGlobalErrorNotificationVisible() || editAction.isJobTitleErrorVisible()).toBeTruthy();
  });

  test("Chỉnh sửa tên trùng có nhiều space ở cuối", async ({ page }) => {
    const editAction = new EditJobTitleAction(page);

    await editAction.goto();

    const data = factory.createInvalidNameExistingWithTrailingSpaces('Chief Security Specialist');
    await editAction.editAndVerify(data.name, data.description, data.note, data.file);

    expect(await editAction.isGlobalErrorNotificationVisible() || await editAction.isJobTitleErrorVisible()).toBeTruthy();
  });
});
