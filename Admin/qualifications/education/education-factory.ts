import {faker} from "@faker-js/faker";
import {Education} from "./education-type";

export class EducationFactory {
    constructor(private base?: Partial<Education>) {}

    createValidNameWith1CharacterAndNumberCharacters(): Education {
        return { name: faker.string.alphanumeric({ length: 1 }), ...this.base };
    }

    createValidNameWith99CharactersAndSpecialCharacters(): Education {
        const specialChars = "!@#$%^&*()_+-=[]{}';:\"\\|,.<>/?";
        let name = '';
        for (let i = 0; i < 99; i++) {
            name += specialChars[Math.floor(Math.random() * specialChars.length)];
        }
        return { name, ...this.base };
    }
    createValidNameWith100CharactersAndAllVietNameseCharacters(): Education {
        const vietnameseChars = "aáàảãạăắằẳẵặâấầẩẫậeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵAÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴ";
        let name = '';
        for (let i = 0; i < 100; i++) {
            name += vietnameseChars[Math.floor(Math.random() * vietnameseChars.length)];
        }
        return { name, ...this.base };
    }
    createValidNameWithChineseCharacters(): Education {
        return { name: "教育类型", ...this.base };
    }

    createNameWithOneSpaceAtStart(): Education {
        return { name: " " + faker.string.alpha({ length: 10 }), ...this.base };
    }

    createNameWithOneSpaceAtEnd(): Education {
        return { name: faker.string.alpha({ length: 10 }) + " ", ...this.base };
    }

    createNameWithMultipleSpacesAtStart(): Education {
        return { name: "     " + faker.string.alpha({ length: 10 }), ...this.base };
    }

    createNameWithMultipleSpacesAtEnd(): Education {
        return { name: faker.string.alpha({ length: 10 }) + "     ", ...this.base };
    }

    createValidPastableName(): Education {
        const words = faker.word.words({ count: faker.number.int({ min: 2, max: 4 }) });
        return { name: Array.isArray(words) ? words.join(' ') : words, ...this.base };
    }

    createNameWithDifferentCase(baseName: string): Education {
        const variants = [
            baseName.toUpperCase(),
            baseName.toLowerCase(),
            baseName.charAt(0).toUpperCase() + baseName.slice(1).toLowerCase()
        ];
        return { name: variants[Math.floor(Math.random() * variants.length)], ...this.base };
    }
}

