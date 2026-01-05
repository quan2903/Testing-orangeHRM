import { fa, faker } from "@faker-js/faker";
import JobTitle from "./job-titles-type";

export class JobTitleFactory {
  constructor(private base?: Partial<JobTitle>) {}

  createValidNameWith1Characters(): JobTitle {
    return {
      name: faker.string.alpha({ length: 1 }),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }
  
  createValidWithMinimalFields(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: "",
      note: "",
      file: null,
    };
  }

  createNameAndDescriptionWith1Characters(): JobTitle {
    return {
      name: faker.string.alpha({ length: 1 }),
      description: faker.string.alpha({ length: 1 }),
      note: "",
      file: null,
    };
  }

  createNameAndDescriptionWith399Characters(): JobTitle {
    return {
      name: faker.string.alpha({ length: 399 }),
      description: faker.string.alpha({ length: 399 }),
      note: "",
      file: null,
    };
  }

  createNameAndDescriptionWith400Characters(): JobTitle {
    return {
      name: faker.string.alpha({ length: 400 }),
      description: faker.string.alpha({ length: 400 }),
      note: "",
      file: null,
    };
  }
  createFakeFile(name: string, mimeType: string, sizeInMB: number) {
  const sizeInBytes = sizeInMB * 1024 * 1024; // MB → Bytes
  const buffer = Buffer.alloc(sizeInBytes, "a"); // tạo buffer với ký tự 'a'
  return { name, mimeType, buffer };
}
  createValidNameWith99Characters(): JobTitle {
    return {
      name: faker.string.alpha({ length: 99 }),
      description: "",
      note: "",
      file: null,
    };
  }

  createValidNameWith100Characters(): JobTitle {
    return {
      name: faker.string.alpha({ length: 100 }),
      description:"",
      note: "",
      file: null,
    };
  }

  createValidNameWithSpecialCharacters(): JobTitle {
    return {
      name: "!@#$%^&*()_+{}|:\"<>?-=[]\\;',./`~",
      description: "",
      note: "",
      file: null,
    };
  }

  createValidNameWithNumberCharacters(): JobTitle {
    return {
      name: "123456" + faker.person.jobTitle() + "7890",
      description: "",
      note: "",
      file: null,
    };
  }

  createValidNameWithVietnameseCharacters(): JobTitle {
    return {
      name: "Công việc phát triển phần mềm" + faker.person.jobTitle(),
      description:"",
      note: "",
      file: null,
    };
  }

  createValidNameWithChineseCharacters(): JobTitle {
    return {
      name: "软件开发职位" + faker.person.jobTitle(),
      description: "",
      note: "",
      file: null,
    };
  }

  createValidNameSameWithExistingJobDifferentUppercase(existingJob: string): JobTitle {
    return {
      name: existingJob.toUpperCase(),
      description: "",
      note: "",
      file: null,
    };
  }

  createValidDescriptionWith1Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.string.alpha({ length: 1 }),
      note: "",
      file: null,
    };
  }

  createValidDescriptionWith399Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.string.alpha({ length: 399 }),
      note: "",
      file: null,
    };
  }

  createValidDescriptionWith400Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.string.alpha({ length: 400 }),
      note: "",
      file: null,
    };
  }

  createValidDescriptionWithSpecialCharacters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: "!@#$%^&*()_+{}|:\"<>?-=[]\\;',./`~",
      note: "",
      file: null,
    };
  }

  createFileUnder1MB(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: "",
      note: "",
      file: this.createFakeFile("largefile.txt", "text/plain", 0.99),
    };
  }

  createValidNameByPastingText(): JobTitle {
    return {
      name: faker.lorem.paragraphs(2),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createValidNameWith1SpaceCharacterAtTheBeginning(): JobTitle{
    return {
      name: " " + faker.person.jobTitle() ,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createValidNameWith1SpaceCharacterAtTheEnd(): JobTitle{
    return {
      name: faker.person.jobTitle() + " ",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createValidNameWithLeadingSpaces(): JobTitle{
    return {
      name: "     " + faker.person.jobTitle() ,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createValidNameWithTrailingSpaces(): JobTitle{
    return {
      name: faker.person.jobTitle() + "     ",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createValidNameWithMiddleSpaces(): JobTitle{
    return {
      name: "Senior     Developer",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createNameAndNoteWith399Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: "",
      note: faker.string.alpha({ length: 399 }),
      file: null,
    };
  }

  createNameAndNoteWith400Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: "",
      note: faker.string.alpha({ length: 400 }),
      file: null,
    };
  }

  createNameAndNoteWithSpecialCharacters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: "",
      note: "!@#$%^&*()_+{}|:\\\"<>?-=[]\\\\;',./`~",
      file: null,
    };
  }

  createAllFieldsFilled(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.paragraph(),
      note: faker.lorem.sentences(2),
      file: this.createFakeFile('sample.txt', 'text/plain', 0.1),
    };
  }

  createValidNoteByPastingText(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: faker.lorem.paragraphs(2),
      file: null,
    };
  }

  createValidDescriptionByPastingText(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.paragraphs(2),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidEmptyAllFields(): JobTitle {
    return {
      name: "",
      description: "",
      note: "",
      file: null,
    };
  }

  createInvalidEmptyName(): JobTitle {
    return {
      name: "",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidNameExisting(existingJob: string): JobTitle {
    return {
      name: existingJob,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidNameWithOnlySpaces(): JobTitle {
    return {
      name: "     ",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidNameWith101Characters(): JobTitle {
    return {
      name: faker.string.alpha({ length: 101 }),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidNameWith255Characters(): JobTitle {
    return {
      name: faker.string.alpha({ length: 255 }),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidNameWithEmoji(): JobTitle {
    return {
      name: "Senior Developer 😊🚀💼",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidDescriptionWith401Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(401),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidDescriptionWith600Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(600),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidFile1_01MB(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: this.createFakeFile("largefile.txt", "text/plain", 1.01),
    };
  }

  createInvalidFile10MB(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: this.createFakeFile("largefile.txt", "text/plain", 10),
    };
  }

  createInvalidFileExecutable(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: this.createFakeFile("malware.exe", "application/x-msdownload", 1),
    };
  }

  createInvalidNoteWithEmoji(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: "This is a note with emojis 😊🚀💼",
      file: null,
    };
  }

  createInvalidNoteWith401Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(401),
      file: null,
    };
  }

  createInvalidNoteWith600Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(600),
      file: null,
    };
  }

  createInvalidNameExistingWith1SpaceCharacterAtTheBeginning(existingJob: string): JobTitle {
    return {
      name:  " " + existingJob,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }
  createInvalidNameExistingWith1SpaceCharacterAtTheEnd(existingJob: string): JobTitle {
    return {
      name: existingJob + " ",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }
  createInvalidNameExistingWithLeadingSpaces(existingJob: string): JobTitle {
    return {
      name: "     " + existingJob,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }
    createInvalidNameExistingWithTrailingSpaces(existingJob: string): JobTitle {
      return {
        name: existingJob + "     ",
        description: faker.lorem.sentence(),
        note: faker.lorem.words(5),
        file: null,
      };
    }
}