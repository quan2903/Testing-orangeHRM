import { faker } from "@faker-js/faker";
import { NationalityType } from "./nationalities-type";

export class NationalitiesFactory {
  constructor(private base?: Partial<NationalityType>) {}

  createValidNameWith1NumericCharacter(): NationalityType {
    return {
      name: faker.number.int({ min: 0, max: 9 }).toString(),
    };
  }

  createValidNameWith99VietnameseCharacters(): NationalityType {
    const vietnameseChars = "aáàảãạăắằẳẵặâấầẩẫậeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵAÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴ";
        let name = '';
        for (let i = 0; i < 99; i++) {
            name += vietnameseChars[Math.floor(Math.random() * vietnameseChars.length)];
        }
        return { name, ...this.base };
  }

  createValidNameWith100SpecialCharacters(): NationalityType {
    return {
      name: "!@#$%^&*()_+{}|:\"<>?-=[]\\;',./`~".repeat(4).slice(0, 100),
    };
  }

  createValidNameWithChineseCharacters(): NationalityType {
    return {
      name: "中华人民共和国",
    };
  }

  createValidNameWith1LeadingSpace(): NationalityType {
    return {
      name: " " + faker.location.country(),
    };
  }

  createValidNameWith1TrailingSpace(): NationalityType {
    return {
      name: faker.location.country() + " ",
    };
  }
  createValidNameWithLeadingSpaces(): NationalityType {
    return {
      name: "     " + faker.location.country(),
    };
  }

  createValidNameWithTrailingSpaces(): NationalityType {
    return {
      name: faker.location.country() + "     ",
    };
  }

  createValidNameByPastingText(): NationalityType {
    return {
      name: faker.lorem.paragraphs(2),
    };
  }

  createValidNameSameAsExistingDifferentCase(existingName: string): NationalityType {
    return {
      name: existingName.toUpperCase(),
    };
  }

  createInvalidEmptyName(): NationalityType {
    return {
      name: "",
    };
  }

  createInvalidNameWith101Characters(): NationalityType {
    return {
      name: faker.string.alpha({ length: 101 }),
    };
  }

  createInvalidNameWith300Characters(): NationalityType {
    return {
      name: faker.string.alpha({ length: 300 }),
    };
  }

  createInvalidNameWithOnlySpaces(): NationalityType {
    return {
      name: "     ",
    };
  }

  createInvalidNameExisting(existingName: string): NationalityType {
    return {
      name: existingName,
    };
  }
}
