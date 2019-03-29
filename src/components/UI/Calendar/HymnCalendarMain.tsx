/**
 * Monthly Calender View (by default)
 */

import React from 'react'
import { getMonth, getYear, startOfMonth, endOfMonth, eachDay, getDate, getDay, subDays, addDays, addMonths } from 'date-fns'
import './css/HymnCalendarMain.css'

interface CalendarProps {
    min_date?: Date
    max_date?: Date
    date: Date
    onDateChanged?: () => {}
}
interface CalendarState {
    current: Date
    month: number
    year: number
    min_date: Date
    max_date: Date
}

export default class CalenderMain extends React.Component<CalendarProps, CalendarState>{
    constructor(props: CalendarProps) {
        super(props)
        this.state = {
            current: this.props.date,
            month: getMonth(this.props.date),
            year: getYear(this.props.date),
            min_date: startOfMonth(this.props.date),
            max_date: endOfMonth(this.props.date)
        }
    }

    handleStateChange() {
        this.setState({
            month: getMonth(this.state.current),
            year: getYear(this.state.current),
            min_date: startOfMonth(this.state.current),
            max_date: endOfMonth(this.state.current)
        })
    }

    handleNext(e: Event) {
        this.setState({
            current: addMonths(this.state.current, 1)
        })
        this.handleStateChange()
    }

    renderDaysAndDates() {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
        const renderedDays = days.map((d, i) => (
            <div key={i}>{d}</div>
        ))
        const [firstDayIdx, lastDayIdx] = [getDay(this.state.min_date), getDay(this.state.max_date)]
        const currentMonthDates = eachDay(this.state.min_date, this.state.max_date).map((d, i) => (
            <div key={i} className="current">
                {getDate(d)}
            </div>
        ))
        const restOfDays = {
            head: [subDays(this.state.min_date, firstDayIdx), subDays(this.state.min_date, 1)],
            tail: [addDays(this.state.max_date, 1), addDays(this.state.max_date, 6 - lastDayIdx)]
        }
        const head = eachDay(restOfDays.head[0], restOfDays.head[1]).map((d, i) =>
            <div key={i}>{getDate(d)}</div>
        )
        const tail = eachDay(restOfDays.tail[0], restOfDays.tail[1]).map((d, i) =>
            <div key={i}>{getDate(d)}</div>
        )

        return (
            <div className="hymn-monthly-dates">
                <div className="hymn-days">
                    {renderedDays}
                </div>
                <div className="hymn-dates">
                    {head}
                    {currentMonthDates}
                    {tail}
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="hymn-calendar-monthly">
                <div className="hymn-month-nav-next" onClick={() => this.handleNext}>
                    <i className="fas fa-angle-right" />
                </div>
                <div className="hymn-month">
                    {this.state.month + 1}
                </div>
                {this.renderDaysAndDates()}
            </div>
        )
    }
}
