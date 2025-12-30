import {faker} from '@faker-js/faker';
import { PersonalDetailsType } from './Personal-Details-Type'; 

export class PersonalDetailsFactory {
     constructor(private base?: Partial<PersonalDetailsType>){}
    createFirstName1CharacterAndAllSpecialCharacter() {
        const specialChars = "!@#$%^&*()_+-=[]{}';:\"\\|,.<>/?";
        let name = '';
        for (let i = 0; i < 1; i++) {
            name += specialChars[Math.floor(Math.random() * specialChars.length)];
        }
        return {
            firstName: name,
            middleName: this.base?.middleName,
            lastName: this.base?.lastName,
            employeeId: this.base?.employeeId,
            otherId: this.base?.otherId,
            licenseNumber: this.base?.licenseNumber,
            licenseExpiryDate: this.base?.licenseExpiryDate,
            maritalStatus: this.base?.maritalStatus ,
            nationality: this.base?.nationality,
            dateOfBirth: this.base?.dateOfBirth,
            Gender: this.base?.Gender
        }
    }

    createFirstName29CharactersAndAllNumberCharacters() {
        return {
            firstName: faker.string.numeric({ length: 29 }),
            middleName: this.base?.middleName,
            lastName: this.base?.lastName,
            employeeId: this.base?.employeeId,
            otherId: this.base?.otherId,
            licenseNumber: this.base?.licenseNumber,
            licenseExpiryDate: this.base?.licenseExpiryDate,
            maritalStatus: this.base?.maritalStatus ,
            nationality: this.base?.nationality,
            dateOfBirth: this.base?.dateOfBirth,
            Gender: this.base?.Gender
        }
    }

    createFirstName30CharactersAndAllVietNameseCharacter() {

        let firstname = '';
        const vietnameseChars = "aáàảãạăắằẳẵặâấầẩẫậeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵAÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴ";
        for (let i = 0; i < 30; i++) {
            firstname += vietnameseChars[Math.floor(Math.random() * vietnameseChars.length)];
        }

        return {
            firstName: firstname,
            middleName: this.base?.middleName,
            lastName: this.base?.lastName,
            employeeId: this.base?.employeeId,
            otherId: this.base?.otherId,
            licenseNumber: this.base?.licenseNumber,
            licenseExpiryDate: this.base?.licenseExpiryDate,
            maritalStatus: this.base?.maritalStatus ,
            nationality: this.base?.nationality,
            dateOfBirth: this.base?.dateOfBirth,
            Gender: this.base?.Gender
        }
    }
    createFirstNameWithChineseCharacters() {
        return {
            firstName: "张伟",
            middleName: this.base?.middleName,
            lastName: this.base?.lastName,
            employeeId: this.base?.employeeId,
            otherId: this.base?.otherId,
            licenseNumber: this.base?.licenseNumber,
            licenseExpiryDate: this.base?.licenseExpiryDate,
            maritalStatus: this.base?.maritalStatus ,
            nationality: this.base?.nationality,
            dateOfBirth: this.base?.dateOfBirth,
            Gender: this.base?.Gender
        }
    }

    createFirstNameWithLeadingAndTrailingSpaces() {
        return {
            firstName: "   " + faker.string.alpha({ length: 10 }) + "   ",
            middleName: this.base?.middleName,
            lastName: this.base?.lastName,
            employeeId: this.base?.employeeId,
            otherId: this.base?.otherId,
            licenseNumber: this.base?.licenseNumber,
            licenseExpiryDate: this.base?.licenseExpiryDate,
            maritalStatus: this.base?.maritalStatus ,
            nationality: this.base?.nationality,
            dateOfBirth: this.base?.dateOfBirth,
            Gender: this.base?.Gender
        }
    }

    createFirstNameWithTrailingSpaces() {
        const expiryDate = faker.date.future();
        return {
            firstName: faker.string.alpha({ length: 10 }) + "     ",
            middleName: this.base?.middleName,
            lastName: this.base?.lastName,
            employeeId: this.base?.employeeId,
            otherId: this.base?.otherId,
            licenseNumber: this.base?.licenseNumber,
            licenseExpiryDate: this.base?.licenseExpiryDate,
            maritalStatus: this.base?.maritalStatus ,
            nationality: this.base?.nationality,
            dateOfBirth: this.base?.dateOfBirth,
            Gender: this.base?.Gender
        }
    }

    createMiddleName1CharacterAndAllSpecialCharacter() {

        return {
            firstName: this.base?.firstName,
            middleName: "!@#$%^&*()_+-=[]{}';:\"\\|,.<>/?".charAt(0),
            lastName: this.base?.lastName,
            employeeId: this.base?.employeeId,
            otherId: this.base?.otherId,
            licenseNumber: this.base?.licenseNumber,
            licenseExpiryDate: this.base?.licenseExpiryDate,
            maritalStatus: this.base?.maritalStatus,
            nationality: this.base?.nationality,
            dateOfBirth: this.base?.dateOfBirth,
            Gender: this.base?.Gender
        }
    }

    createMiddleName29CharactersAndAllNumberCharacters() {

        return {
            firstName: this.base?.firstName,
            middleName: faker.string.numeric({ length: 29 }),
            lastName: this.base?.lastName,
            employeeId: this.base?.employeeId,
            otherId: this.base?.otherId,
            licenseNumber: this.base?.licenseNumber,
            licenseExpiryDate: this.base?.licenseExpiryDate,
            maritalStatus: this.base?.maritalStatus,
            nationality: this.base?.nationality,
            dateOfBirth: this.base?.dateOfBirth,
            Gender: this.base?.Gender
        }
    }

    createMiddleName30CharactersAndAllVietnamese() {

        let middleName = '';
        const vietnameseChars = "aáàảãạăắằẳẵặâấầẩẫậeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵAÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬEÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢUÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴ";
        for (let i = 0; i < 30; i++) {
            middleName += vietnameseChars[Math.floor(Math.random() * vietnameseChars.length)];
        }
        return {
            firstName: this.base?.firstName,
            middleName: middleName,
            lastName: this.base?.lastName,
            employeeId: this.base?.employeeId,
            otherId: this.base?.otherId,
            licenseNumber: this.base?.licenseNumber,
            licenseExpiryDate: this.base?.licenseExpiryDate,
            maritalStatus: this.base?.maritalStatus,
            nationality: this.base?.nationality,
            dateOfBirth: this.base?.dateOfBirth,
        }
    }
    createMiddleNameWithChineseCharacters() {
        return {
            firstName: this.base?.firstName,
            middleName: "王芳",
            lastName: this.base?.lastName,
            employeeId: this.base?.employeeId,
            otherId: this.base?.otherId,
            licenseNumber: this.base?.licenseNumber,
            licenseExpiryDate: this.base?.licenseExpiryDate,
            maritalStatus: this.base?.maritalStatus,
            nationality: this.base?.nationality,
            dateOfBirth: this.base?.dateOfBirth,
        }
    }


}