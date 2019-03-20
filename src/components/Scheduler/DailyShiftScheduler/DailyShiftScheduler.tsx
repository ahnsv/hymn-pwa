import React from 'react'
import DailyShiftTimer from './DailyShiftTimer'
import DailyTodoWidget from './DailyTodoWidget'
import TodoStore from '../../../stores/TodoListStore'
import ViewStore from '../../../stores/TodoViewStore';

interface DailyShiftSchedulerProps {}
interface DailyShiftSchedulerState {}
export default class DailyShiftScheduler extends React.Component<DailyShiftSchedulerProps, DailyShiftSchedulerState> {
    constructor(props: DailyShiftSchedulerProps) {
        super(props)
    }
    render() {
        return (
            <div className="daily-shift-scheduler">
                <DailyShiftTimer start_time="08:30" num_of_hrs={8.5}/>
                <DailyTodoWidget todoStore={new TodoStore} viewStore={ViewStore}/>
            </div>
        )
    }
}