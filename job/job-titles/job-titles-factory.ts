import { fa, faker } from "@faker-js/faker";
import JobTitle from "./job-titles-type";

export class JobTitleFactory {
  constructor(private base?: Partial<JobTitle>) {}

  createValidNameWith1Characters(): JobTitle {
    return {
      name: faker.string.alpha({ length: 5 }),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
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
      ...this.base,
    };
  }

  createValidNameWith100Characters(): JobTitle {
    return {
      name: faker.string.alpha({ length: 100 }),
      description:"",
      note: "",
      file: null,
      ...this.base,
    };
  }

  createValidNameWithSpecialCharacters(): JobTitle {
    return {
      name: "!@#$%^&*()_+{}|:\"<>?-=[]\\;',./`~",
      description: "",
      note: "",
      file: null,
      ...this.base,
    };
  }

  createValidNameWithNumberCharacters(): JobTitle {
    return {
      name: "123456" + faker.person.jobTitle() + "7890",
      description: "",
      note: "",
      file: null,
      ...this.base,
    };
  }

  createValidNameWithVietnameseCharacters(): JobTitle {
    return {
      name: "Công việc phát triển phần mềm" + faker.person.jobTitle(),
      description:"",
      note: "",
      file: null,
      ...this.base,
    };
  }

  createValidNameWithChineseCharacters(): JobTitle {
    return {
      name: "软件开发职位" + faker.person.jobTitle(),
      description: "",
      note: "",
      file: null,
      ...this.base,
    };
  }

  createValidNameSameWithExistingJobDifferentUppercase(existingJob: string): JobTitle {
    return {
      name: existingJob.toUpperCase(),
      description: "",
      note: "",
      file: null,
      ...this.base,
    };
  }

  createValidDescriptionWith1Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.string.alpha({ length: 1 }),
      note: "",
      file: null,
      ...this.base,
    };
  }

  createValidDescriptionWith399Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.string.alpha({ length: 399 }),
      note: "",
      file: null,
      ...this.base,
    };
  }

  createValidDescriptionWith400Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.string.alpha({ length: 400 }),
      note: "",
      file: null,
      ...this.base,
    };
  }

  createValidDescriptionWithSpecialCharacters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: "!@#$%^&*()_+{}|:\"<>?-=[]\\;',./`~",
      note: "",
      file: null,
      ...this.base,
    };
  }

  createFileUnder1MB(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: "",
      note: "",
      file: this.createFakeFile("largefile.txt", "text/plain", 0.99),

      ...this.base,
    };
  }

  createValidNameByPastingText(): JobTitle {
    return {
      name: faker.lorem.paragraphs(2),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
    };
  }

  createValidNameWith1SpaceCharacterAtTheBeginning(): JobTitle{
    return {
      name: " " + faker.person.jobTitle() ,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
    };
  }

  createValidNameWith1SpaceCharacterAtTheEnd(): JobTitle{
    return {
      name: faker.person.jobTitle() + " ",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
    };
  }

  createValidNameWithLeadingSpaces(): JobTitle{
    return {
      name: "     " + faker.person.jobTitle() ,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
    };
  }

  createValidNameWithTrailingSpaces(): JobTitle{
    return {
      name: faker.person.jobTitle() + "     ",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
    };
  }

  createValidNameWithMiddleSpaces(): JobTitle{
    return {
      name: "Senior     Developer",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
    };
  }

  createInvalidEmptyAllFields(): JobTitle {
    return {
      name: "",
      description: "",
      note: "",
      file: null,
      ...this.base,
    };
  }

  createInvalidEmptyName(): JobTitle {
    return {
      name: "",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
    };
  }

  createInvalidNameExisting(existingJob: string): JobTitle {
    return {
      name: existingJob,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
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
      ...this.base,
    };
  }

  createInvalidNameWith255Characters(): JobTitle {
    return {
      name: faker.string.alpha({ length: 255 }),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
    };
  }

  createInvalidNameWithEmoji(): JobTitle {
    return {
      name: "Senior Developer 😊🚀💼",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
    };
  }

  createInvalidDescriptionWith401Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(401),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
    };
  }

  createInvalidDescriptionWith600Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(600),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
    };
  }

  createInvalidFile1_01MB(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: this.createFakeFile("largefile.txt", "text/plain", 1.01),
      ...this.base,
    };
  }

  createInvalidFile10MB(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: this.createFakeFile("largefile.txt", "text/plain", 10),
      ...this.base,
    };
  }

  createInvalidFileExecutable(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: this.createFakeFile("malware.exe", "application/x-msdownload", 1),
      ...this.base,
    };
  }

  createInvalidNoteWithEmoji(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: "This is a note with emojis 😊🚀💼",
      file: null,
      ...this.base,
    };
  }

  createInvalidNoteWith401Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(401),
      file: null,
      ...this.base,
    };
  }

  createInvalidNoteWith600Characters(): JobTitle {
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(600),
      file: null,
      ...this.base,
    };
  }

  createInvalidNameExistingWith1SpaceCharacterAtTheBeginning(existingJob: string): JobTitle {
    return {
      name:  " " + existingJob,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
    };
  }
  createInvalidNameExistingWith1SpaceCharacterAtTheEnd(existingJob: string): JobTitle {
    return {
      name: existingJob + " ",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
    };
  }
  createInvalidNameExistingWithLeadingSpaces(existingJob: string): JobTitle {
    return {
      name: "     " + existingJob,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
      ...this.base,
    };
  }
    createInvalidNameExistingWithTrailingSpaces(existingJob: string): JobTitle {
      return {
        name: existingJob + "     ",
        description: faker.lorem.sentence(),
        note: faker.lorem.words(5),
        file: null,
        ...this.base,
      };
    }
}
