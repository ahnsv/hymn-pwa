import { differenceInYears, differenceInMonths, differenceInWeeks, differenceInDays, differenceInHours, differenceInSeconds, differenceInMinutes, differenceInMilliseconds } from "date-fns";

export interface TimeLeft {
    year?: number
    months?: number,
    weeks?: number,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
}

export interface TodayInfo {
    year: number
    month: number
    day: string
    date: number
}

/**
 * Get Today Info
 */
export function getTodayInfo(): TodayInfo {
    const tday = new Date()
    return {
        year: tday.getFullYear(),
        month: tday.getMonth(),
        day: tday.getDay().toString(),
        date: tday.getDate()
    }
}

export function castToRealTime(time1: Date, time2: Date): TimeLeft {
    return {
        year: differenceInYears(time1, time2),
        months: differenceInMonths(time1, time2) % 12,
        weeks: differenceInWeeks(time1, time2) % 4,
        days: differenceInDays(time1, time2) % 30,
        hours: differenceInHours(time1, time2) % 24,
        minutes: differenceInMinutes(time1, time2) % 60,
        seconds: differenceInSeconds(time1, time2) % 60,
        milliseconds: differenceInMilliseconds(time1, time2) % 100,
    }
}


export const ALL_TODOS = 'all';
export const ACTIVE_TODOS = 'active';
export const COMPLETED_TODOS = 'completed';