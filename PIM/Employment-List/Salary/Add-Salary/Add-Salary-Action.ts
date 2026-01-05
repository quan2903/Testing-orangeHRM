import {AddSalaryPage} from "./Add-Salary-Page";  
import {SalaryType} from "../Salary-Type";

export class AddSalaryAction {
    constructor(private page: AddSalaryPage) {}
    async goto() {
        await this.page.goto();
    }
    async fillSalaryComponent(name: string): Promise<void> {
        await this.page.fillSalaryComponent(name);
    }
    async selectPayGrade(label: string): Promise<void> {
        await this.page.selectPayGrade(label);
    }
    async selectPayFrequency(label: string): Promise<void> {
        await this.page.selectPayFrequency(label);
    }   
    async selectCurrency(label: string): Promise<void> {
        await this.page.selectCurrency(label);
    }
    async fillAmount(amount: string): Promise<void> {
        await this.page.fillAmount(amount);
    }
    async fillComments(comments: string): Promise<void> {
        await this.page.fillComments(comments);
    }
    async addSalary( salaryDetails: SalaryType) {
        await this.fillSalaryComponent(salaryDetails.salaryComponent);
        await this.selectPayGrade(salaryDetails.payGrade);
        await this.selectPayFrequency(salaryDetails.payFrequency);
        await this.selectCurrency(salaryDetails.currency);
        await this.fillAmount(salaryDetails.amount);
        await this.fillComments(salaryDetails.comments);
    }
    
    async clickSaveButton(): Promise<void> {
        await this.page.clickSaveButton();
    }
    async isSalaryComponentErrorVisible(): Promise<boolean> {
        return this.page.isSalaryComponentErrorVisible();
    }
    async isAmountErrorVisible(): Promise<boolean> {
        return this.page.isAmountErrorVisible();
    }
    async isCurrencyErrorVisible(): Promise<boolean> {
        return this.page.isCurrencyErrorVisible();
    }
    async isCommentsErrorVisible(): Promise<boolean> {
        return this.page.isCommentsErrorVisible();
    }

    
    

}
