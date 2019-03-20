import React from 'react';
import {observer} from 'mobx-react';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '../shared';

import TodoItem from './DailyTodoItem';

interface Props {
	viewStore: any; 
	todoStore: any;
}
@observer
export default class TodoOverview extends React.Component<Props, any> {
	render() {
		const {todoStore, viewStore} = this.props;
		if (todoStore.todos.length === 0)
			return null;
		return <section className="main">
			<input
				className="toggle-all"
				type="checkbox"
				onChange={this.toggleAll}
				checked={todoStore.activeTodoCount === 0}
			/>
			<ul className="todo-list">
				{this.getVisibleTodos().map(todo =>
					(<TodoItem
						key={todo.id}
						todo={todo}
						viewStore={viewStore}
					/>)
				)}
			</ul>
		</section>
	}

	getVisibleTodos(): any[] {
		return this.props.todoStore.todos.filter((todo: any) => {
			switch (this.props.viewStore.todoFilter) {
				case ACTIVE_TODOS:
					return !todo.completed;
				case COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
			}
		});
	}

	toggleAll = (event: any) => {
		var checked = event.target.checked;
		this.props.todoStore.toggleAll(checked);
	};
}