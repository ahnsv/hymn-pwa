import VacationManager from "./VacationManager";
import {
	compareAsc,
	differenceInDays,
	differenceInMonths,
	differenceInMinutes,
	differenceInMilliseconds,
	differenceInSeconds,
	differenceInHours,
	eachDay,
	differenceInWeeks
} from "date-fns";

const vm = new VacationManager([
	{ date: new Date(2019, 2, 1), content: "3.1절" },
	{ date: new Date(2019, 2, 18), content: "전투휴무" },
	{ date: new Date(2019, 2, 29), content: "전투휴무" }
]);
const vm_list = vm.getConvertedDateList();

interface Formats {
	[key: string]: number;
}

export interface TimeFormats extends Formats {
	months: number;
	weeks: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
}

interface ReturnOptions {
	months?: boolean;
	weeks?: boolean;
	days?: boolean;
	hours?: boolean;
	minutes?: boolean;
	seconds?: boolean;
	milliseconds?: boolean;
	all?: boolean;
}

type DateRange = [Date, Date];

/**
 * Convert Time to Time Formats
 * @param timeDiff
 */
function timeToFormats(timeDiff: number): TimeFormats {
	const diff = Math.abs(timeDiff);
	const milliseconds = diff;
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 12);
	return {
		months: months,
		days: days,
		weeks: weeks,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
		milliseconds: milliseconds
	};
}
/**
 * Convert Date Range to TimeFormats for actual work days
 * @param dtRg DateRange
 * @returns TimeFormats
 */
function timeRangeToFormats(dtRg: DateRange): TimeFormats {
	const rest = eachDay(dtRg[0], dtRg[1])
		.filter(d => d.getDay() <= 5)
		.filter(d => !vm_list.includes(d.getDate()))
		.sort(compareAsc);
	if (rest.length === 0) {
		throw "Cannot find available time in the range";
	}
	const last = rest.length - 1;
	return {
		months: differenceInMonths(rest[last], rest[0]),
		weeks: differenceInWeeks(rest[last], rest[0]),
		days: differenceInDays(rest[last], rest[0]),
		hours: differenceInHours(rest[last], rest[0]),
		minutes: differenceInMinutes(rest[last], rest[0]),
		seconds: differenceInSeconds(rest[last], rest[0]),
		milliseconds: differenceInMilliseconds(rest[last], rest[0])
	};
}

/**
 * Return only selected options from format
 * @param fmt
 * @param option
 */
function pullOnly(fmt: TimeFormats, option: string[]): TimeFormats {
	return Object.keys(fmt)
		.filter(k => option.includes(k))
		.reduce((prev, v) => ({ ...prev, [v]: fmt[v] }), {} as TimeFormats);
}
/**
 * Get time difference till discharge date
 * @param {Date} date input date
 * @param {Date} dischargeDate date of discharge
 * @param {ReturnOptions} option return options
 * @return {number | any[]}
 */
export function timeTillDischargeDate(
	date: Date,
	dischargeDate: Date,
	option: ReturnOptions = { days: true }
) {
	return pullOnly(
		timeToFormats(dischargeDate.getTime() - date.getTime()),
		Object.keys(option)
	);
}

/**
 * Get actual work time within a range
 * @param range DateRange
 * @param option ReturnOptions
 */
export function actualWorkTime(
	range: DateRange,
	option: ReturnOptions = { days: true }
): TimeFormats {
	return pullOnly(timeRangeToFormats(range), Object.keys(option));
}
