import { fa, faker } from "@faker-js/faker";
import { UserType } from "./users-type";

//Lấy ngẫu nhiên vai trò người dùng
const roles: Array<'Admin' | 'ESS'> = ['Admin', 'ESS'];
const randomRole = roles[Math.floor(Math.random() * roles.length)];

//Lấy ngẫu nhiên trạng thái người dùng
const statuses: Array<'Enabled' | 'Disabled'> = ['Enabled', 'Disabled'];
const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

export class UsersFactory {
    constructor(private base?: Partial<UserType>) {}
    
    createValidUser():UserType   {
        const password = faker.internet.password(8);
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.internet.username(),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUserWith5CharacterUsername() {
        const password = faker.internet.password({ length: 8 });
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?',5),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUserWith6CharacterUsername() {
    const password = faker.internet.password({ length: 8 });
    return {
        UserRole: randomRole,
        EmployeeName: faker.string.alpha({ length: 1 }),
        Status: randomStatus,
        Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?',6),
        Password: password,
        ConfirmPassword: password
        };
    }
    createValidUserWith39CharacterUsername() {
        const password = faker.internet.password({ length: 8 });
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?',39),
            Password: password,
            ConfirmPassword: password
        };
    }
    createValidUserWith40CharacterUsername() {
        const password = faker.internet.password({ length: 8 });
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?',40),

            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUserWithVietnameseCharacterUsername() {
        const password = faker.internet.password({ length: 8 });
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: "Nguyễn Văn A",
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUserWithChineseCharacterUsername() {
        const password = faker.internet.password({ length: 8 });
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: "张伟",
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUserWith1SpaceCharacterBeforeUsername() {
        const password = faker.internet.password({ length: 8 });
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: " " + faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?',5),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUserWith1SpaceCharacterAfterUsername() {
        const password = faker.internet.password({ length: 8 });
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?',5) + " ",
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUserWith1SpaceCharacterInMiddleOfUsername() {
        const password = faker.internet.password({ length: 8 });
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: "User " + faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?',5),
            Password: password,
            ConfirmPassword: password
        };
    }
    
    createValidUserWithVietnamesePassword() {
        const password = "MậtKhẩu123";
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?',5),
            Password: password,
            ConfirmPassword: password
        };
    }

    createValidUserWithChinesePassword() {
        const password = "密码123";
        return {
            UserRole: randomRole,
            EmployeeName: faker.string.alpha({ length: 1 }),
            Status: randomStatus,
            Username: faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?',5),
            Password: password,
            ConfirmPassword: password
        };
    }

}