import {faker} from "@faker-js/faker";
import { License } from "./licenses-type";

export class LicenseFactory {
    constructor(private base?: Partial<License>) {}

    createValidNameWith1CharacterAndNumberCharacters(): License {
        return { name: faker.string.alphanumeric({ length: 1 }), ...this.base };
    }

    createValidNameWith99CharactersAndSpecialCharacters(): License {
        const specialChars = "!@#$%^&*()_+-=[]{}';:\"\\|,.<>/?";
        let name = '';
        for (let i = 0; i < 99; i++) {
            name += specialChars[Math.floor(Math.random() * specialChars.length)];
        }
        return { name, ...this.base };
    }
    createValidNameWith100CharactersAndAllVietNameseCharacters(): License {
        const vietnameseChars = "aáàảãạăắằẳẵặâấầẩẫậeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵAÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴ";
        let name = '';
        for (let i = 0; i < 100; i++) {
            name += vietnameseChars[Math.floor(Math.random() * vietnameseChars.length)];
        }
        return { name, ...this.base };
    }
    createValidNameWithChineseCharacters(): License {
        return { name: "教育类型", ...this.base };
    }

    createNameWithOneSpaceAtStart(): License {
        return { name: " " + faker.string.alpha({ length: 10 }), ...this.base };
    }

    createNameWithOneSpaceAtEnd(): License {
        return { name: faker.string.alpha({ length: 10 }) + " ", ...this.base };
    }

    createNameWithMultipleSpacesAtStart(): License {
        return { name: "     " + faker.string.alpha({ length: 10 }), ...this.base };
    }

    createNameWithMultipleSpacesAtEnd(): License {
        return { name: faker.string.alpha({ length: 10 }) + "     ", ...this.base };
    }

    createValidPastableName(): License {
        const words = faker.word.words({ count: faker.number.int({ min: 2, max: 4 }) });
        return { name: Array.isArray(words) ? words.join(' ') : words, ...this.base };
    }

    createNameWithDifferentCase(baseName: string): License {
        const variants = [
            baseName.toUpperCase(),
            baseName.toLowerCase(),
            baseName.charAt(0).toUpperCase() + baseName.slice(1).toLowerCase()
        ];
        return { name: variants[Math.floor(Math.random() * variants.length)], ...this.base };
    }
}

