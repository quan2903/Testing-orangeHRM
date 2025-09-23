import { Page } from "@playwright/test";
import { UserPage } from "../users-page";
export class DeleteUserPage{
    constructor (private page: Page){

    }
    async goto(){
        const deleteuserpage = new UserPage(this.page)
        await deleteuserpage.clickDeleteButton; 
        
    }
}