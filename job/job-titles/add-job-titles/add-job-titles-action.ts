import { JobTitlesPage } from "../job-title-page";
import JobTitle from "../job-titles-type";
import { AddJobTitlesPage } from "./add-job-titles-page";
import { Page, expect} from "@playwright/test";
export class AddJobTitlesAction {
    constructor (private page: Page){

    }

    async goto() {
      await this.page.getByRole('button', { name: 'Add' }).click();
    } 

    
    async addandverifyJobTitles(name: string, description: string, note: string,file: { name: string; mimeType: string; buffer: Buffer } | null){
        const addjobtitlespage = new AddJobTitlesPage(this.page);
        await addjobtitlespage.fillJobTitleDetails(name,description,note,file); 
        const jobtitlespage = new JobTitlesPage(this.page)
        const exists = await jobtitlespage.isJobTitlesexist(name!);
        expect(exists).toBe(true);
    }
   
}