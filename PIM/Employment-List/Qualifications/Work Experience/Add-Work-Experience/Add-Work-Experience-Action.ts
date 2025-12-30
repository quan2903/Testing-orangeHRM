import { AddWorkExperiencePage } from "./Add-Work-Experience-Page";
import { WorkExperience} from "../Work-Experience-Type"

export class AddWorkExperienceAction {
    constructor(private page: AddWorkExperiencePage) {}

    async goto() {
        await this.page.goto();
    }
    async fillCompany(name: string){
        return this.page.fillCompany();
    }

    async fillJobTitle(jobTitle: string){
        return this.page.fillJobTitle();
    }
    async fillFromDate (date:string) {
        return this.page.fillFromDate(date)
    }
    async fillToDate (date:string){
        return this.page.fillToDate(date)
    }
    async fillCommnent(Commment: string){
        return this.page.fillComment(Commment)
    }
    async addWorkExperience(data: WorkExperience) {
        await this.page.fillCompany(data.company);
        
        await this.page.fillJobTitle(data.JobTitle);
        await this.page.fillFromDate(data.From);
        await this.page.fillToDate(data.To);
        await this.page.fillComment(data.Comment);
    }

    async save() {
        await this.page.clickSave();
    }

    async isCompanyErrorVisible(): Promise<boolean> {
        return this.page.isCompanyErrorVisible();
    }

    async isJobTitleErrorVisible(): Promise<boolean>{
        return this.page.isJobTitleErrorVisible();
    }

    async isFromDateErrorVisible(): Promise<boolean>{
        return this.page.isFromDateErrorVisible();
    }

    async isToDateErrorVisible(): Promise<boolean>{
        return this.page.isToDateErrorVisible();
    }

    async isCommentErrorVisible(): Promise<boolean>{
        return this.page.isCommentErrorVisible();
    }    
    async areAllFieldsValid(): Promise<boolean> {
        const results = await Promise.all([
            this.isCompanyErrorVisible(),
            this.isJobTitleErrorVisible(),
            this.isFromDateErrorVisible(),
            this.isToDateErrorVisible(),
            this.isCommentErrorVisible(),
        ]);

        // Nếu bất kỳ field nào có error (true) → return false
        return results.every(r => r === false);
    }

}
