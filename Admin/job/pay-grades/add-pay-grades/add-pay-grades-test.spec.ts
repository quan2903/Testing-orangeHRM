import { test, expect } from '@playwright/test';
import { AddPayGradesAction } from './add-pay-grades-action';
import { PayGradeFactory } from '../pay-grade-factory';
import { LoginPage } from "../../../login/login-page/LoginPage";
import { JobPage } from '../../job-page';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME 
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD


test.beforeEach(async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.goto();
    await loginpage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
    const jobpage = new JobPage(page);
    await jobpage.goto();
    await jobpage.navigateToPayGrades();
});

test.describe('Add Pay Grades - name validation cases', () => {
  test('Thêm bậc lương mới với tên có 5 ký tự', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith5Characters();
    await action.addPayGradeWithNameOnly(pg)
    expect (action.isPayGradeExist(pg.name)).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên có 1 ký tự', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith1Character();
    await action.addPayGradeWithNameOnly(pg)
    expect (action.isPayGradeExist(pg.name)).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên có 49 ký tự', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith49Characters();
    await action.addPayGradeWithNameOnly(pg)
    expect (action.isPayGradeExist(pg.name)).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên có 50 ký tự', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith50Characters();
    await action.addPayGradeWithNameOnly(pg)
     expect (action.isPayGradeExist(pg.name)).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên paste từ nguồn khác', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameByPastingText();
    await action.addPayGradeWithNameOnly(pg)
     expect (action.isPayGradeExist(pg.name)).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên 4 ký tự + 1 space ở đầu', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith4CharactersAnd1SpaceAtStart();
    await action.addPayGradeWithNameOnly(pg)
   expect (action.isPayGradeExist(pg.name)).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên 4 ký tự + 1 space ở cuối', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith4CharactersAnd1SpaceAtEnd();
    await action.addPayGradeWithNameOnly(pg)
   expect (action.isPayGradeExist(pg.name)).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên 4 ký tự + nhiều space ở đầu', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith4CharactersAndMultipleSpacesAtStart();
    await action.addPayGradeWithNameOnly(pg)
   expect (action.isPayGradeExist(pg.name)).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên 4 ký tự + nhiều space ở cuối', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith4CharactersAndMultipleSpacesAtEnd();
    await action.addPayGradeWithNameOnly(pg)
   expect (action.isPayGradeExist(pg.name)).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên 4 ký tự + space ở giữa', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith4CharactersAndSpaceInMiddle();
    await action.addPayGradeWithNameOnly(pg)
     expect (action.isPayGradeExist(pg.name)).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên tiếng Việt', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWithVietnameseCharacters();
    await action.addPayGradeWithNameOnly(pg)
     expect (action.isPayGradeExist(pg.name)).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên tiếng Trung', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWithChineseCharacters();
    await action.addPayGradeWithNameOnly(pg)
     expect (action.isPayGradeExist(pg.name)).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên có ký tự đặc biệt', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWithSpecialCharacters();
    await action.addPayGradeWithNameOnly(pg)
     expect (action.isPayGradeExist(pg.name)).toBeTruthy();
  });
  test('Thêm bậc lương mới với tên có ký tự số', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWithNumbers();
    await action.addPayGradeWithNameOnly(pg)
     expect (action.isPayGradeExist(pg.name)).toBeTruthy();
  });

});
test.describe('Add Pay Grades - invalid / special name cases', () => {
  test('Thêm bậc lương mới với tên để trống', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameEmpty();
    await action.addPayGrade({ name: pg.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên toàn space', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameAllSpaces();
    await action.addPayGradeWithoutSave({ name: pg.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên 51 ký tự', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith51Characters();
    await action.addPayGradeWithoutSave({ name: pg.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test('Thêm bậc lương mới với tên 255 ký tự', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith255Characters();
    await action.addPayGradeWithoutSave({ name: pg.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test('Thêm bậc lương mới trùng tên + 1 space ở đầu', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const existingName = await action.copyFirstPayGrade();
    const pg = factory.createValidNameDuplicateWith1SpaceAtStart(existingName!);
    await action.addPayGradeWithoutSave({ name: pg.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test('Thêm bậc lương mới trùng tên + 1 space ở cuối', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const existingName = await action.copyFirstPayGrade();
    const pg = factory.createValidNameDuplicateWith1SpaceAtEnd(existingName!);
    await action.addPayGradeWithoutSave({ name: pg.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test('Thêm bậc lương mới trùng tên + nhiều space ở đầu', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const existingName = await action.copyFirstPayGrade();
    const pg = factory.createValidNameDuplicateWithMultipleSpacesAtStart(existingName!);
    await action.addPayGradeWithoutSave({ name: pg.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test('Thêm bậc lương mới trùng tên + nhiều space ở cuối', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const existingName = await action.copyFirstPayGrade();
    const pg = factory.createValidNameDuplicateWithMultipleSpacesAtEnd(existingName!);
    await action.addPayGradeWithoutSave({ name: pg.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test('Thêm bậc lương mới có emoji', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWithEmoji();
    await action.addPayGradeWithoutSave({ name: pg.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test('Thêm bậc lương mới trùng với tên đã tồn tại', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const existingName = await action.copyFirstPayGrade();
    const pg = factory.createValidNameDuplicate(existingName!);
    await action.addPayGradeWithoutSave({ name: pg.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

});