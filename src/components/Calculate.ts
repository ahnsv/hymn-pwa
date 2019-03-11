import VacationManager from "./VacationManager";
import {
	compareAsc,
	differenceInMilliseconds,
	eachDay,
	getSeconds,
	getMinutes,
	getHours,
	getDay,
	getMilliseconds,
	getMonth,
	parse,
	compareDesc,
	setHours,
	startOfWeek,
	startOfToday
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
	return {
		months: getMonth(diff),
		weeks: Math.floor(getDay(diff) / 7),
		days: getDay(diff) - Math.floor(getDay(diff) / 7) * 7,
		hours: getHours(diff),
		minutes: getMinutes(diff),
		seconds: getSeconds(diff),
		milliseconds: getMilliseconds(diff)
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
		.filter(d => !vm_list.includes(d.getDate()));
	if (rest.length === 0) {
		throw "Cannot find available time in the range";
	}
	const dailyWorkHours = 6.5;
	// Start of Weekly Actual Work
	const weeklyIndex = setHours(
		startOfWeek(startOfToday(), { weekStartsOn: 1 }),
		9
	);
	const mil =
		rest.length * dailyWorkHours * 3600000 -
		(new Date().getMilliseconds() - getMilliseconds(weeklyIndex));
	return {
		months: getMonth(mil),
		weeks: Math.floor(getDay(mil) / 7),
		days: getDay(mil) - Math.floor(getDay(mil) / 7) * 7,
		hours: getHours(mil),
		minutes: getMinutes(mil),
		seconds: getSeconds(mil),
		milliseconds: getMilliseconds(mil)
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
