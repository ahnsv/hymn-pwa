/**
 * Daily Shift Timer
 * @props start_time {string}
 * @props num_of_hrs {number}
 */

import React from 'react'
import { getTodayInfo, TimeLeft, castToRealTime } from '../shared'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './css/DailyShiftTimer.css'

interface DailyTimeLeft extends TimeLeft {
    hours?: number
    minutes?: number
    seconds?: number
    milliseconds?: number
}

interface DailyShiftTimerProps {
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
    componentWillMount() {
        this.calculateTimeLeft(this.props)
    }
    componentDidMount() {
        setInterval(() => {
            this.calculateTimeLeft(this.props)
        }, 500)
    }
    calculateTimeLeft(props: DailyShiftTimerProps) {
        const now = new Date()
        const [start_hr, start_min] = props.start_time.split(":").map(d => parseInt(d))
        const [num_hr, num_mins] = [Math.floor(props.num_of_hrs), props.num_of_hrs % 1]
        const { year: tday_yr, month: tday_month, date: tday_date, day: tday_day } = getTodayInfo()
        const start_time = new Date(2019, 2, 20, start_hr, start_min, 0)
        const end_time = new Date(tday_yr, tday_month, tday_date, start_hr + num_hr, start_min + num_mins, 0)
        const offset = new Date().getTime() - start_time.getTime()
        const total = end_time.getTime() - start_time.getTime()
        this.setState({ timeLeft: castToRealTime(end_time, now), percentage: (offset / total) })
    }
    render() {
        if (this.state.percentage >= 1) return (
            <p className="shift-done">실근무 끝!</p>
        )
        return (
            <div>
                <p className="shift-timer">
                    {/* <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={700} transitionLeaveTimeout={700}> */}
                        {this.state.timeLeft.hours}: {this.state.timeLeft.minutes} <br />
                        {(this.state.percentage * 100).toFixed(2)}%
                    {/* </ReactCSSTransitionGroup> */}
                </p>
            </div>
        )
    }
}
