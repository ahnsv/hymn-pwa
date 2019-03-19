/**
 * Daily Shift Timer
 * @input start_time {string}
 * @input num_of_hrs {number}
 */

import React from 'react'
import {getTodayInfo, TimeLeft, castToRealTime} from '../shared'

interface DailyTimeLeft extends TimeLeft {
    hours?: number
    minutes?: number
    seconds?: number
    milliseconds?: number
}

interface DailyShiftTimerProps 
{
    start_time: string
    num_of_hrs: number
    ranges_of_works?: string[][]
}
interface DailyShiftTimerState {
    timeLeft: DailyTimeLeft
    percentage: number
}

export default class DailyShiftTimer extends React.Component<DailyShiftTimerProps, DailyShiftTimerState> {
    constructor(props: DailyShiftTimerProps) {
        super(props)
        this.state = {
            timeLeft: {
                hours: 0,
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            },
            percentage: 0
        }
    }
    componentWillMount() {}
    componentDidMount() {
        setInterval(() => {
            this.calculateTimeLeft({start_time: "08:30", num_of_hrs: 8})
        }, 500)
    }
    calculateTimeLeft(props: DailyShiftTimerProps) {
        const now = new Date()
        const [start_hr, start_min] = props.start_time.split(":").map(parseInt)
        const [num_hr, num_mins] = [Math.floor(props.num_of_hrs), props.num_of_hrs % 1]
        const {year: tday_yr, month: tday_month, date: tday_date, day: tday_day} = getTodayInfo()
        const end_time = new Date(tday_yr, tday_month, tday_date, start_hr + num_hr, start_min + num_mins, 0)
        this.setState({timeLeft: castToRealTime(end_time, now), percentage: (now.getTime() - new Date(new Date(tday_yr, tday_month, tday_date, start_hr, start_min, 0, 0)).getTime()) / (end_time.getTime())})
    }
    render() {
        return (
            <div>
            {this.state.timeLeft.hours}: {this.state.timeLeft.minutes}
            {this.state.percentage}%
            </div>
        )
    } 
}
