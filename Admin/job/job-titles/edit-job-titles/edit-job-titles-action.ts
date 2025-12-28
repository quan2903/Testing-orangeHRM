import { JobTitlesPage } from "../job-title-page";
import JobTitle from "../job-titles-type";
import { EditJobTitle } from "./edit-job-titles-page";
import { Page, expect} from "@playwright/test";

export class EditJobTitleAction {
    constructor (private page: Page){

    }
    async goto(){
        const editjobtitle = new EditJobTitle(this.page);
        await editjobtitle.goto();
    }
    async editandverify(name: string, description: string, note: string, file: { name: string; mimeType: string; buffer: Buffer } | null){
       const editjobtitle = new EditJobTitle(this.page);
       editjobtitle.fillJobTitleDetails(name, description, note, file); 
       const jobtitle = new JobTitlesPage(this.page);
       const exist = jobtitle.isJobTitlesexist(name);
       expect (exist).toBe(true);   
    }
        
}