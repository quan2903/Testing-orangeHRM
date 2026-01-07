import { Page } from '@playwright/test';
import { AddLocationPage } from './add-locations-page';
import { Location } from '../locations-type';

export class AddLocationAction {
    private page: AddLocationPage;

    constructor(page: Page) {
        this.page = new AddLocationPage(page);
    }
    async addLocation(location: Location) {
        if (location.Name !== undefined) {
            await this.page.fillName(location.Name);
        }

        if (location.City !== undefined) {
            await this.page.fillCity(location.City);
        }

        if (location.StateProvince !== undefined) {
            await this.page.fillState(location.StateProvince);
        }

        if (location.ZipPostalCode !== undefined) {
            await this.page.fillZip(location.ZipPostalCode);
        }

        if (location.Country !== undefined) {
            await this.page.selectCountry(location.Country);
        }

        if (location.Phone !== undefined) {
            await this.page.fillPhone(location.Phone);
        }

        if (location.Fax !== undefined) {
            await this.page.fillFax(location.Fax);
        }

        if (location.Address !== undefined) {
            await this.page.fillAddress(location.Address);
        }

        if (location.Notes !== undefined) {
            await this.page.fillNotes(location.Notes);
        }

        await this.page.clickSave();
    }


    async hasRequiredErrors(): Promise<boolean> {
        const nameError = await this.page.isNameErrorVisible();
        const countryError = await this.page.isCountryErrorVisible();
        return nameError || countryError;
    }
}
