import { Page, expect} from "@playwright/test";
import { AdminPage } from "../AdminPage";

export class UserPage{
    constructor(public page: Page){

    }
    async clickAddButton(){
        await this.page.getByRole('button', {name: 'Add' }).click();
    }

    async clickEditButton(name: string) {
        const User = this.page.locator(`.oxd-table-card >> text=${name}`);
        await User.first().waitFor({ state: 'visible', timeout: 10000 });
        await User.locator('button:has(i.icon-pencil)').click();
    }
    async clickDeleteButton(name:string){
        const User = this.page.locator(`.oxd-table-card >> text=${name}`);
        await User.first().waitFor({ state: 'visible', timeout: 10000 });
        await User.locator('button:has(i.icon-trash)').click();
    }
    async isUserExist(name: string): Promise<boolean> {
    const normalized = name.trim().normalize("NFC");

    await this.page.locator('.oxd-input-group')
        .filter({ hasText: 'Username' })
        .locator('input')
        .fill(normalized);

    await this.page.getByRole('button', { name: 'Search' }).click();

    const row = this.page.locator('.oxd-table-card').filter({ hasText: normalized });
    try {
        await row.first().waitFor({ state: 'visible', timeout: 10000 }); // chờ đúng row có text
        return true;
        } catch {
        return false;
        }
    }

}