import React from 'react';
import {observer} from 'mobx-react';
import TodoEntry from './DailyTodoEntry';
import TodoOverview from './DailyTodoOverview';
import TodoFooter from './DailyTodoFooter';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../shared';
import './css/DailyTodo.css'

import DevTool from 'mobx-react-devtools';
import TodoStore from '../../../stores/TodoListStore';

interface Props {
	todoStore: TodoStore;
	viewStore: any;
}

@observer
export default class TodoApp extends React.Component<Props, {}> {
	render() {
		const {todoStore, viewStore} = this.props;
		return (
			<div>
				{/* <DevTool /> */}
				<header className="header">
					{/* <h1>Todo List</h1> */}
					<TodoEntry todoListStore={todoStore} />
				</header>
				<TodoOverview todoStore={todoStore} viewStore={viewStore} />
			</div>
		);
	}

	componentDidMount() {
		var viewStore = this.props.viewStore;
		// var router = Router({
		// 	'/': function() { viewStore.todoFilter = ALL_TODOS; },
		// 	'/active': function() { viewStore.todoFilter = ACTIVE_TODOS; },
		// 	'/completed': function() { viewStore.todoFilter = COMPLETED_TODOS; }
		// });
		// router.init('/');
	}
}