import { fa, faker } from "@faker-js/faker";
import {JobTitleType} from "./job-titles-type";

export class JobTitleFactory {
  constructor(private base?: Partial<JobTitleType>) {}

  createValidNameWith1Characters(): JobTitleType {
    return {
      name: faker.string.alpha({ length: 1 }),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }
  
  createValidWithMinimalFields(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: "",
      note: "",
      file: null,
    };
  }

  createNameAndDescriptionWith1Characters(): JobTitleType{
    return {
      name: faker.string.alpha({ length: 1 }),
      description: faker.string.alpha({ length: 1 }),
      note: "",
      file: null,
    };
  }

  createNameAndDescriptionWith399Characters(): JobTitleType{
    return {
      name: faker.string.alpha({ length: 399 }),
      description: faker.string.alpha({ length: 399 }),
      note: "",
      file: null,
    };
  }

  createNameAndDescriptionWith400Characters(): JobTitleType{
    return {
      name: faker.string.alpha({ length: 400 }),
      description: faker.string.alpha({ length: 400 }),
      note: "",
      file: null,
    };
  }

  createValidNameWith99Characters(): JobTitleType{
    return {
      name: faker.string.alpha({ length: 99 }),
      description: "",
      note: "",
      file: null,
    };
  }

  createValidNameWith100Characters(): JobTitleType{
    return {
      name: faker.string.alpha({ length: 100 }),
      description:"",
      note: "",
      file: null,
    };
  }

  createValidNameWithSpecialCharacters(): JobTitleType{
    return {
      name: "!@#$%^&*()_+{}|:\"<>?-=[]\\;',./`~",
      description: "",
      note: "",
      file: null,
    };
  }

  createValidNameWithNumberCharacters(): JobTitleType{
    return {
      name: "123456" + faker.person.jobTitle() + "7890",
      description: "",
      note: "",
      file: null,
    };
  }

  createValidNameWithVietnameseCharacters(): JobTitleType{
    return {
      name: "Công việc phát triển phần mềm" + faker.person.jobTitle(),
      description:"",
      note: "",
      file: null,
    };
  }

  createValidNameWithChineseCharacters(): JobTitleType{
    return {
      name: "软件开发职位" + faker.person.jobTitle(),
      description: "",
      note: "",
      file: null,
    };
  }

  createValidNameSameWithExistingJobDifferentUppercase(existingJob: string): JobTitleType{
    return {
      name: existingJob.toUpperCase(),
      description: "",
      note: "",
      file: null,
    };
  }

  createValidDescriptionWith1Characters(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: faker.string.alpha({ length: 1 }),
      note: "",
      file: null,
    };
  }

  createValidDescriptionWith399Characters(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: faker.string.alpha({ length: 399 }),
      note: "",
      file: null,
    };
  }

  createValidDescriptionWith400Characters(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: faker.string.alpha({ length: 400 }),
      note: "",
      file: null,
    };
  }

  createValidDescriptionWithSpecialCharacters(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: "!@#$%^&*()_+{}|:\"<>?-=[]\\;',./`~",
      note: "",
      file: null,
    };
  }



  createValidNameByPastingText(): JobTitleType{
    return {
      name: faker.lorem.paragraphs(2),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createValidNameWith1SpaceCharacterAtTheBeginning(): JobTitleType{
    return {
      name: " " + faker.person.jobTitle() ,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createValidNameWith1SpaceCharacterAtTheEnd(): JobTitleType{
    return {
      name: faker.person.jobTitle() + " ",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createValidNameWithLeadingSpaces(): JobTitleType{
    return {
      name: "     " + faker.person.jobTitle() ,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createValidNameWithTrailingSpaces(): JobTitleType{
    return {
      name: faker.person.jobTitle() + "     ",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createValidNameWithMiddleSpaces(): JobTitleType{
    return {
      name: "Senior     Developer",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createNameAndNoteWith399Characters(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: "",
      note: faker.string.alpha({ length: 399 }),
      file: null,
    };
  }

  createNameAndNoteWith400Characters(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: "",
      note: faker.string.alpha({ length: 400 }),
      file: null,
    };
  }

  createNameAndNoteWithSpecialCharacters(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: "",
      note: "!@#$%^&*()_+{}|:\\\"<>?-=[]\\\\;',./`~",
      file: null,
    };
  }


  createValidNoteByPastingText(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: faker.lorem.paragraphs(2),
      file: null,
    };
  }

  createValidDescriptionByPastingText(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.paragraphs(2),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidEmptyAllFields(): JobTitleType{
    return {
      name: "",
      description: "",
      note: "",
      file: null,
    };
  }

  createInvalidEmptyName(): JobTitleType{
    return {
      name: "",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidNameExisting(existingJob: string): JobTitleType{
    return {
      name: existingJob,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidNameWithOnlySpaces(): JobTitleType{
    return {
      name: "     ",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidNameWith101Characters(): JobTitleType{
    return {
      name: faker.string.alpha({ length: 101 }),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidNameWith255Characters(): JobTitleType{
    return {
      name: faker.string.alpha({ length: 255 }),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidNameWithEmoji(): JobTitleType{
    return {
      name: "Senior Developer 😊🚀💼",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidDescriptionWith401Characters(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(401),
      note: faker.lorem.words(5),
      file: null,
    };
  }

  createInvalidDescriptionWith600Characters(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(600),
      note: faker.lorem.words(5),
      file: null,
    };
  }




  createInvalidNoteWithEmoji(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: "This is a note with emojis 😊🚀💼",
      file: null,
    };
  }

  createInvalidNoteWith401Characters(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(401),
      file: null,
    };
  }

  createInvalidNoteWith600Characters(): JobTitleType{
    return {
      name: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      note: faker.lorem.words(600),
      file: null,
    };
  }

  createInvalidNameExistingWith1SpaceCharacterAtTheBeginning(existingJob: string): JobTitleType{
    return {
      name:  " " + existingJob,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }
  createInvalidNameExistingWith1SpaceCharacterAtTheEnd(existingJob: string): JobTitleType{
    return {
      name: existingJob + " ",
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }
  createInvalidNameExistingWithLeadingSpaces(existingJob: string): JobTitleType{
    return {
      name: "     " + existingJob,
      description: faker.lorem.sentence(),
      note: faker.lorem.words(5),
      file: null,
    };
  }
    createInvalidNameExistingWithTrailingSpaces(existingJob: string): JobTitleType{
      return {
        name: existingJob + "     ",
        description: faker.lorem.sentence(),
        note: faker.lorem.words(5),
        file: null,
      };
    }
}