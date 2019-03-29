import React from 'react'
import CalendarMonthly from '../UI/Calendar/HymnCalendarMain'

const VacationScheduler: React.SFC = () => (
    <CalendarMonthly date={new Date(2019, 2, 29)}>
    </CalendarMonthly>
)

export {VacationScheduler}