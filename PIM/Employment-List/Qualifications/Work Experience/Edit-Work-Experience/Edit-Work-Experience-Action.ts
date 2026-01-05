import { EditWorkExperiencePage } from "./Edit-Work-Experience-Page"
import { WorkExperience } from "../Work-Experience-Type";

export class EditWorkExperienceAction {
    constructor(private page: EditWorkExperiencePage) {}

    async gotoEdit(index: number) {
        await this.page.gotoEdit(index);
    }

    async editWorkExperience(data: WorkExperience) {
        if (data.company) await this.page.fillCompany(data.company);
        if (data.JobTitle) await this.page.fillJobTitle(data.JobTitle);
        if (data.From) await this.page.fillFromDate(data.From);
        if (data.To) await this.page.fillToDate(data.To);
        if (data.Comment) await this.page.fillComment(data.Comment);
    }

    async save() {
        await this.page.clickSave();
    }

    async hasAnyError(): Promise<boolean> {
        return await this.page.isAnyErrorVisible();
    }
}
