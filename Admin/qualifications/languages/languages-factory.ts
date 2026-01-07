import { faker } from "@faker-js/faker";
import { Language } from "./languages-type";

export class LanguageFactory {
    constructor(private base?: Partial<Language>) {}

    createValidNameWith1CharacterAndNumber(): Language {
        return { name: faker.string.numeric(1), ...this.base };
    }

    createValidNameWith119SpecialCharacters(): Language {
        const specialChars = "!@#$%^&*()_+-=[]{}';:\"\\|,.<>/?";
        let name = '';
        for (let i = 0; i < 119; i++) {
            name += specialChars[Math.floor(Math.random() * specialChars.length)];
        }
        return { name, ...this.base };
    }

    createValidNameWith120VietnameseCharacters(): Language {
        const vietnameseChars =
            "aáàảãạăắằẳẵặâấầẩẫậeéèẻẽẹêếềểễệ" +
            "iíìỉĩịoóòỏõọôốồổỗộơớờởỡợ" +
            "uúùủũụưứừửữựyýỳỷỹỵ" +
            "AÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬEÉÈẺẼẸÊẾỀỂỄỆ" +
            "IÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢ" +
            "UÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴ";
        let name = '';
        for (let i = 0; i < 120; i++) {
            name += vietnameseChars[Math.floor(Math.random() * vietnameseChars.length)];
        }
        return { name, ...this.base };
    }

    createValidNameWithChineseCharacters(): Language {
        return { name: "语言类型", ...this.base };
    }

    createNameWithOneSpaceAtStart(): Language {
        return { name: " " + faker.string.alpha({ length: 10 }), ...this.base };
    }

    createNameWithOneSpaceAtEnd(): Language {
        return { name: faker.string.alpha({ length: 10 }) + " ", ...this.base };
    }

    createNameWithMultipleSpacesAtStart(): Language {
        return { name: "     " + faker.string.alpha({ length: 10 }), ...this.base };
    }

    createNameWithMultipleSpacesAtEnd(): Language {
        return { name: faker.string.alpha({ length: 10 }) + "     ", ...this.base };
    }

    createValidPastableName(): Language {
        const words = faker.word.words({ count: faker.number.int({ min: 2, max: 4 }) });
        return {
            name: Array.isArray(words) ? words.join(' ') : words,
            ...this.base
        };
    }

    createNameWithDifferentCase(baseName?: string): Language {
        const variants = [
            baseName!.toUpperCase(),
            baseName!.toLowerCase(),
            baseName!.charAt(0).toUpperCase() + baseName!.slice(1).toLowerCase()
        ];
        return { name: variants[Math.floor(Math.random() * variants.length)], ...this.base };
    }

    createEmptyName(): Language {
        return { name: "", ...this.base };
    }

    createNameWith121Characters(): Language {
        return { name: faker.string.alpha({ length: 121 }), ...this.base };
    }

    createNameWith300Characters(): Language {
        return { name: faker.string.alpha({ length: 300 }), ...this.base };
    }

    createNameWithOnlySpaces(): Language {
        return { name: "          ", ...this.base };
    }
}
