import { Page } from "playwright-core";
import { AssignLeavePage } from "./Assign-Leave-Page";
import { AssignLeaveType } from "./Assign-Leave-Type";

export class AssignLeaveAction {
    private pageUI: AssignLeavePage;

    constructor(private page: Page) {
        this.pageUI = new AssignLeavePage(page);
    }

    async goto(): Promise<void> {
        await this.pageUI.goto();
    }

    async fillname(name?: string): Promise<void> {
        await this.pageUI.fillEmployeeName(name);
    }

    async chooseLeaveType(leaveType?: string): Promise<void> {
        await this.pageUI.chooseLeaveType(leaveType);
    }

    async fillFromDate(fromDate?: string): Promise<void> {
        await this.pageUI.fillFromDate(fromDate);
    }

    async fillToDate(toDate?: string): Promise<void> {
        await this.pageUI.fillToDate(toDate);
    }

    async chooseDuration(duration?: string): Promise<void> {
        await this.pageUI.chooseDuration(duration);
    }

    async fillFromTime(fromTime?: string): Promise<void> {
        await this.pageUI.fillFromTime(fromTime);
    }

    async fillToTime(toTime?: string): Promise<void> {
        await this.pageUI.fillToTime(toTime);
    }

    async fillComment(comment?: string): Promise<void> {
        await this.pageUI.fillComment(comment);
    }

    async saveChanges(): Promise<void> {
        await this.pageUI.saveChanges();
    }

    async assignLeave(data: AssignLeaveType): Promise<void> {
        await this.fillname(data.name);
        await this.chooseLeaveType(data.leaveType);
        await this.fillFromDate(data.fromDate);
        await this.fillToDate(data.toDate);
        await this.chooseDuration(data.duration);
        await this.fillFromTime(data.fromTime);
        await this.fillToTime(data.toTime);
        await this.fillComment(data.comment);
        await this.saveChanges();
    }
}
