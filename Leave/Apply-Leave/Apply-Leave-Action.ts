import { Page } from "playwright-core";
import { ApplyLeavePage } from "./Apply-Leave-Page";
import { ApplyLeaveType } from "./Assign-Leave-Type";

export class ApplyLeaveAction {
    private pageUI: ApplyLeavePage;

    constructor(private page: Page) {
        this.pageUI = new ApplyLeavePage(page);
    }

    async goto() {
        await this.pageUI.goto();
    }

    async chooseLeaveType(leavetype?: string) {
        await this.pageUI.chooseLeaveType(leavetype);
    }

    async fillFromDate(fromdate?: string) {
        await this.pageUI.fillFromDate(fromdate);
    }

    async fillToDate(todate?: string) {
        await this.pageUI.fillToDate(todate);
    }

    async chooseDuration(duration?: string) {
        await this.pageUI.chooseDuration(duration);
    }

    async fillFrom(from?: string) {
        await this.pageUI.fillFrom(from);
    }

    async fillTo(to?: string) {
        await this.pageUI.fillTo(to);
    }

    async fillComment(comment?: string) {
        await this.pageUI.fillComment(comment);
    }

    async saveChanges() {
        await this.pageUI.saveChanges();
    }

    async updatePersonalDetails(data: ApplyLeaveType) {
        await this.chooseLeaveType(data.leaveType);
        await this.fillFromDate(data.fromDate);
        await this.fillToDate(data.toDate);
        await this.chooseDuration(data.duration);
        await this.fillFrom(data.fromTime);
        await this.fillTo(data.toTime);
        await this.fillComment(data.comment);
        await this.saveChanges();
    }
}
