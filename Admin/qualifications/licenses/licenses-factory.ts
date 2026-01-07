import { faker } from "@faker-js/faker";
import { License } from "./licenses-type";

export class LicenseFactory {
    constructor(private base?: Partial<License>) {}

    createNameWith1Digit(): License {
        return { name: faker.string.alphanumeric(1), ...this.base };
    }

    createNameWith99SpecialCharacters(): License {
        const chars = "!@#$%^&*()_+-=[]{}';:\"\\|,.<>/?";
        let name = "";
        for (let i = 0; i < 99; i++) {
            name += chars[Math.floor(Math.random() * chars.length)];
        }
        return { name, ...this.base };
    }

    createNameWith100VietnameseCharacters(): License {
        const chars =
            "aáàảãạăắằẳẵặâấầẩẫậeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợ" +
            "uúùủũụưứừửữựyýỳỷỹỵ" +
            "AÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢ" +
            "UÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴ";

        let name = "";
        for (let i = 0; i < 100; i++) {
            name += chars[Math.floor(Math.random() * chars.length)];
        }
        return { name, ...this.base };
    }

    createNameWithChineseCharacters(): License {
        return { name: "教育许可证", ...this.base };
    }

    createValidPastableName(): License {
        return { name: faker.word.words({ count: 3 }), ...this.base };
    }

    createNameWithOneSpaceAtStart(): License {
        return { name: " " + faker.string.alpha(10), ...this.base };
    }

    createNameWithOneSpaceAtEnd(): License {
        return { name: faker.string.alpha(10) + " ", ...this.base };
    }

    createNameWithMultipleSpacesAtStart(): License {
        return { name: "     " + faker.string.alpha(10), ...this.base };
    }

    createNameWithMultipleSpacesAtEnd(): License {
        return { name: faker.string.alpha(10) + "     ", ...this.base };
    }

    createNameDuplicateDifferentCase(existingName: string): License {
        const variants = [
            existingName.toUpperCase(),
            existingName.toLowerCase(),
            existingName.charAt(0).toUpperCase() + existingName.slice(1).toLowerCase()
        ];
        return { name: faker.helpers.arrayElement(variants), ...this.base };
    }

    // Các hàm bổ sung cho các test case mới
    createEmptyName(): License {
        return { name: "", ...this.base };
    }

    createNameWith101Characters(): License {
        return { name: faker.string.alpha(101), ...this.base };
    }

    createNameWith300Characters(): License {
        return { name: faker.string.alpha(300), ...this.base };
    }

    createNameWithOnlySpaces(): License {
        return { name: "     ", ...this.base };
    }

    createDuplicateName(existingName: string): License {
        return { name: existingName, ...this.base };
    }
}
