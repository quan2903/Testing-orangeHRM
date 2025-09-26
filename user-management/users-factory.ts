import { fa, faker } from "@faker-js/faker";
import { UserType } from "./users-type";

// Lấy ngẫu nhiên vai trò người dùng
const roles: Array<'Admin' | 'ESS'> = ['Admin', 'ESS'];
const randomRole = roles[Math.floor(Math.random() * roles.length)];

// Lấy ngẫu nhiên trạng thái người dùng
const statuses: Array<'Enabled' | 'Disabled'> = ['Enabled', 'Disabled'];
const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

export class UsersFactory {
    constructor(private base?: Partial<UserType>) {}

    createValidUser() {
        const password = faker.helpers.fromRegExp(/[A-Za-z]{1}[0-9]{1}[A-Za-z0-9]{8}/);
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.internet.username(),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUser_Username_5Chars() {
        const password = faker.helpers.fromRegExp(/[A-Za-z]{1}[0-9]{1}[A-Za-z0-9]{8}/);
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 5),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUser_Username_6Chars() {
        const password = faker.helpers.fromRegExp(/[A-Za-z]{1}[0-9]{1}[A-Za-z0-9]{8}/);
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 6),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUser_Username_39Chars() {
        const password = faker.helpers.fromRegExp(/[A-Za-z]{1}[0-9]{1}[A-Za-z0-9]{8}/);
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 39),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUser_Username_40Chars() {
        const password = faker.helpers.fromRegExp(/[A-Za-z]{1}[0-9]{1}[A-Za-z0-9]{8}/);
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 40),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUser_Username_VietnameseChars() {
        const password = faker.helpers.fromRegExp(/[A-Za-z]{1}[0-9]{1}[A-Za-z0-9]{8}/);
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: "NguyễnVănA" + faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 1),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUser_Username_ChineseChars() {
        const password = faker.helpers.fromRegExp(/[A-Za-z]{1}[0-9]{1}[A-Za-z0-9]{8}/);
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: "张伟张伟张伟" + faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 1),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUser_Username_1SpaceBefore() {
        const password = faker.helpers.fromRegExp(/[A-Za-z]{1}[0-9]{1}[A-Za-z0-9]{8}/);
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: " " + faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 5),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUser_Username_1SpaceAfter() {
        const password = faker.helpers.fromRegExp(/[A-Za-z]{1}[0-9]{1}[A-Za-z0-9]{8}/);
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 5) + " ",
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUser_Username_1SpaceMiddle() {
        const password = faker.helpers.fromRegExp(/[A-Za-z]{1}[0-9]{1}[A-Za-z0-9]{8}/);
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: "User " + faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 5),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUser_Password_VietnameseChars() {
        const password = "MậtKhẩu123";
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 5),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUser_Password_ChineseChars() {
        const password = "密码123";
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 5),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUser_Password_Emoji() {
        const password = "P@ssw0rd😊";
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 5),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUser_Password_LowercaseAndNumber() {
        const password = "password1";
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 5),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUser_Password_Weak() {
        const password = "passwod1";
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 5),
            Password: password,
            ConfirmPassword: password
        };
    }
    createValidUser_Password_Better() {
        const password = "Password@1";
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 5),
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_Username_Emoji() {
        const password = faker.internet.password({ length: 8 });
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: "User😊",
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_Username_4Chars() {
        const password = faker.internet.password({ length: 8 });
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 4),
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_Username_4Chars_1SpaceBefore() {
        const password = faker.internet.password({ length: 8 });
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: " " + faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 4),
            Password: password,
            ConfirmPassword: password
        };
    }
    createInvalidUser_Username_4Chars_1SpaceAfter() {
        const password = faker.internet.password({ length: 8 });
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 4) + " ",
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_Username_41Chars() {
        const password = faker.internet.password({ length: 8 });
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 41),
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_Username_255Chars() {
        const password = faker.internet.password({ length: 8 });
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 255),
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_Username_Empty() {
        const password = faker.internet.password({ length: 8 });
        return { 
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: "",
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_Username_AllSpaces() {
        const password = faker.internet.password({ length: 8 });
        return { 
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: "     ",
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_Username_Duplicate() {
        const password = faker.internet.password({ length: 8 });
        return { 
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: 'Admin',
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_UserRole_Empty() {
        const password = faker.internet.password({ length: 8 });
        return { 
            UserRole: undefined,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 10),
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_EmployeeName_Empty() {
        const password = faker.internet.password({ length: 8 });
        return { 
            UserRole: randomRole,
            EmployeeName: "",
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 10),
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_Status_Empty() {
        const password = faker.internet.password({ length: 8 });
        return { 
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: undefined,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 10),
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_Password_Empty() {
        return { 
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 10),
            Password: "",
            ConfirmPassword: ""
        };
    }

    createInvalidUser_ConfirmPassword_Empty() {
        const password = faker.internet.password({ length: 8 });
        return { 
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 10),
            Password: password,
            ConfirmPassword: ""
        };
    }

    createInvalidUser_Password_ConfirmPassword_NotMatch() {
        const password = faker.internet.password({ length: 8 });
        return { 
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 10),
            Password: password,
            ConfirmPassword: password + "1"
        };
    }

    createInvalidUser_Password_NoNumberCharacter() {
        const password = "Password";
        return { 
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 10),
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_Password_NoLowercaseCharacter() {
        const password = "PASSWORD1";
        return { 
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 10),
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_Password_Only6Characters() {
        const password = "Pass1";
        return { 
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 10),
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_Password_6CharsAnd1SpaceBefore() {
        const password = " Pass1";
        return { 
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 10),
            Password: password,
            ConfirmPassword: password
        };
    }

    createInvalidUser_Password_6CharsAnd1SpaceAfter() {
        const password = "Pass1 ";
        return { 
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 10),
            Password: password,
            ConfirmPassword: password
        };
    }   

    createInvalidUser_Password_65Characters() {
        const password = faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 65);
        return { 
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?', 10),
            Password: password,
            ConfirmPassword: password
        };
    }


}
