import {faker} from '@faker-js/faker';
import {Skills} from './skills-type';

export class SkillsFactory {
    createValidNameWith1CharacterAndNumberCharacters(): Skills {
        return { name: faker.string.alphanumeric({ length: 1 }) };
    }
    
    createValidNameWith119CharactersAndSpecialCharacters(): Skills {
        const specialChars = "!@#$%^&*()_+-=[]{}';:\"\\|,.<>/?";
        let name = '';
        for (let i = 0; i < 119; i++) {
            name += specialChars[Math.floor(Math.random() * specialChars.length)];
        }
        return { name };
    }

    createValidNameWith120CharactersAndAllVietNameseCharacters(): Skills {
        const vietnameseChars = "aáàảãạăắằẳẵặâấầẩẫậeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵAÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴ";
        let name = '';
        for (let i = 0; i < 120; i++) {
            name += vietnameseChars[Math.floor(Math.random() * vietnameseChars.length)];
        }
        return { name };
    }

    createValidNameWithChineseCharacters(): Skills {
        return { name: "技能类型" };
    }

    createNameWithOneSpaceAtStart(): Skills {
        return { name: " " + faker.string.alpha({ length: 10 }) };
    }

    createNameWithOneSpaceAtEnd(): Skills {
        return { name: faker.string.alpha({ length: 10 }) + " " };
    }

    createNameWithMultipleSpacesAtStart(): Skills {
        return { name: "     " + faker.string.alpha({ length: 10 }) };
    }

    createNameWithMultipleSpacesAtEnd(): Skills {
        return { name: faker.string.alpha({ length: 10 }) + "     " };
    }

    createValidPastableName(): Skills {
        const words = faker.word.words({ count: faker.number.int({ min: 2, max: 4 }) });
        return { name: Array.isArray(words) ? words.join(' ') : words };
    }

    createNameWithDifferentCase(baseName: string): Skills {
        const variants = [
            baseName.toUpperCase(),
            baseName.toLowerCase(),
            baseName.charAt(0).toUpperCase() + baseName.slice(1).toLowerCase()
        ];
        return { name: variants[Math.floor(Math.random() * variants.length)] };
    }

    createValidNameAndDescriptionWith1CharacterAndAllNumber(): Skills {
        return {
            name: faker.string.alphanumeric({ length: 1 }),
            description: faker.string.numeric({ length: 1 })
        };
    }

    createValidNameAndDescriptionWith399CharactersAndAllSpecialCharacters(): Skills {
        const specialChars = "!@#$%^&*()_+-=[]{}';:\"\\|,.<>/?";
        let description = '';
        for (let i = 0; i < 399; i++) {
            description += specialChars[Math.floor(Math.random() * specialChars.length)];
        }
        return {
            name: faker.string.alphanumeric({ length: 10 }),
            description
        };
    }

    createValidNameAndDescriptionWith400CharactersAndAllVietNameseCharacters(): Skills {
        const vietnameseChars = "aáàảãạăắằẳẵặâấầẩẫậeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵAÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴ";
        let description = '';
        for (let i = 0; i < 400; i++) {
            description += vietnameseChars[Math.floor(Math.random() * vietnameseChars.length)];

        }
        return {
            name: faker.string.alphanumeric({ length: 10 }),
            description
        };
    }
    createValidNameAndDescriptionWithChineseCharacters(): Skills {
        return {
            name: "技能类型",
            description: "这是一个技能描述。"
        };
        
    }

    createValidNameAndDescriptionLeadingSpace(): Skills {
        return {
            name: " " + faker.string.alpha({ length: 10 }),
            description: " " + faker.string.alpha({ length: 20 })
        };
    }

    createValidNameAndDescriptionTrailingSpace(): Skills {
        return {
            name: faker.string.alpha({ length: 10 }) + " ",
            description: faker.string.alpha({ length: 20 }) + " "
        };
    }

    createValidNameAndDescriptionMultipleLeadingSpaces(): Skills {
        return {
            name: "     " + faker.string.alpha({ length: 10 }),
            description: "     " + faker.string.alpha({ length: 20 })
        };
    }

    createValidNameAndDescriptionMultipleTrailingSpaces(): Skills {
        return {
            name: faker.string.alpha({ length: 10 }) + "     ",
            description: faker.string.alpha({ length: 20 }) + "     "
        };
    }
    createEmptyName(): Skills {
    return { name: "" };
}

createNameWith121Characters(): Skills {
    return { name: faker.string.alpha({ length: 121 }) };
}

createNameWith300Characters(): Skills {
    return { name: faker.string.alpha({ length: 300 }) };
}

createNameWithOnlySpaces(): Skills {
    return { name: "          " };
}

createDuplicateName(baseName: string): Skills {
    return { name: baseName };
}

createNameAndDescriptionWith401Characters(): Skills {
    return {
        name: faker.string.alpha({ length: 10 }),
        description: faker.string.alpha({ length: 401 })
    };
}

createNameAndDescriptionWith600Characters(): Skills {
    return {
        name: faker.string.alpha({ length: 10 }),
        description: faker.string.alpha({ length: 600 })
    };
}
}