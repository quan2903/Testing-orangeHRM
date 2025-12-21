import { test } from '@playwright/test';
import { AddPayGradesAction } from './add-pay-grades-action';
import { PayGradeFactory } from '../pay-grade-factory';

test.describe('Add Pay Grades - name validation cases', () => {
  test('Thêm bậc lương mới với tên có 5 ký tự', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith5Characters();
    await action.addAndVerifyPayGrade({ name: pg.name });
  });

  test('Thêm bậc lương mới với tên có 1 ký tự', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith1Character();
    await action.addAndVerifyPayGrade({ name: pg.name });
  });

  test('Thêm bậc lương mới với tên có 49 ký tự', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith49Characters();
    await action.addAndVerifyPayGrade({ name: pg.name });
  });

  test('Thêm bậc lương mới với tên có 50 ký tự', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith50Characters();
    await action.addAndVerifyPayGrade({ name: pg.name });
  });

  test('Thêm bậc lương mới với tên paste từ nguồn khác', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameByPastingText();
    await action.addAndVerifyPayGrade({ name: pg.name });
  });

  test('Thêm bậc lương mới với tên 4 ký tự + 1 space ở đầu', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith4CharactersAnd1SpaceAtStart();
    await action.addAndVerifyPayGrade({ name: pg.name });
  });

  test('Thêm bậc lương mới với tên 4 ký tự + 1 space ở cuối', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith4CharactersAnd1SpaceAtEnd();
    await action.addAndVerifyPayGrade({ name: pg.name });
  });

  test('Thêm bậc lương mới với tên 4 ký tự + nhiều space ở đầu', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith4CharactersAndMultipleSpacesAtStart();
    await action.addAndVerifyPayGrade({ name: pg.name });
  });

  test('Thêm bậc lương mới với tên 4 ký tự + nhiều space ở cuối', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith4CharactersAndMultipleSpacesAtEnd();
    await action.addAndVerifyPayGrade({ name: pg.name });
  });

  test('Thêm bậc lương mới với tên 4 ký tự + space ở giữa', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWith4CharactersAndSpaceInMiddle();
    await action.addAndVerifyPayGrade({ name: pg.name });
  });

  test('Thêm bậc lương mới với tên tiếng Việt', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWithVietnameseCharacters();
    await action.addAndVerifyPayGrade({ name: pg.name });
  });

  test('Thêm bậc lương mới với tên tiếng Trung', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWithChineseCharacters();
    await action.addAndVerifyPayGrade({ name: pg.name });
  });

  test('Thêm bậc lương mới với tên có ký tự đặc biệt', async ({ page }) => {
    const factory = new PayGradeFactory();
    const action = new AddPayGradesAction(page);
    const pg = factory.createValidNameWithSpecialCharacters();
    await action.addAndVerifyPayGrade({ name: pg.name });
  });
});