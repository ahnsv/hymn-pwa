import React from 'react'
import { TimeLeft } from '../shared';

/**
 * 휴일 정보 인터페이스
 */
interface OffDuty {
    name: string
    range: string[]
}
export interface WeeklyOffDuty extends OffDuty{}

interface WeeklyShiftSchedulerProps {
    off_duty: WeeklyOffDuty[]
}
interface WeeklyShiftSchedulerState {
    today: Date
    timeLeft: TimeLeft
}

export default class WeeklyShiftScheduler extends React.Component<WeeklyShiftSchedulerProps, WeeklyShiftSchedulerState> {
    constructor(props: WeeklyShiftSchedulerProps) {
        super(props)
    }
    render() {
        return (
            <div></div>
        )
    }
}