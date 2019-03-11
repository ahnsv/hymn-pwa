import { TimeFormats } from "./Calculate";

export interface Vacation {
	date: Date;
	content: string;
}

export default class VacationManager {
	list: Vacation[];
	constructor(list: Vacation[]) {
		this.list = list;
	}
	getConvertedDateList(): number[] {
		return this.getDateList().map(l => l.getDate());
	}
	getDateList(): Date[] {
		return this.list.map(l => l.date);
	}
	getContents(): string[] {
		return this.list.map(l => l.content);
	}
	queryVacationsByDate(option: TimeFormats) {
		// TODO: handle option by property name
	}
	addVacation(dt: Date, content: string) {
		return [...this.list, { date: dt, content: content }];
	}
	addVacations(vacations: Vacation[]) {
		return [...this.list, ...vacations];
	}
	removeVacation(dt: Date) {
		return this.list.filter(l => l.date !== dt);
	}
	removeVacations(dts: Date[]) {
		return this.list.filter(l => !dts.includes(l.date));
	}
}
