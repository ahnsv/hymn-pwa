import React from 'react'
import DailyShiftTimer from './DailyShiftTimer'
import DailyTodoWidget from './DailyTodoWidget'

interface DailyShiftSchedulerProps {}
interface DailyShiftSchedulerState {}
export default class DailyShiftScheduler extends React.Component<DailyShiftSchedulerProps, DailyShiftSchedulerState> {
    constructor(props: DailyShiftSchedulerProps) {
        super(props)
    }
    render() {
        return (
            <div>
                <DailyShiftTimer start_time="08:30" num_of_hrs={8.5}/>
                <DailyTodoWidget />
            </div>
        )
    }
}