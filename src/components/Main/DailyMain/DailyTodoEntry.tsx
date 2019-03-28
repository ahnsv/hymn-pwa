import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import TodoListStore from '../../../stores/TodoListStore';

const ENTER_KEY = 13;
interface TodoEntryProps {
	todoListStore: TodoListStore
}

@observer
export default class TodoEntry extends React.Component<TodoEntryProps, {}> {
	render() {
		return (<input
			ref="newField"
			className="new-todo"
			placeholder="오늘 할일?"
			onKeyDown={this.handleNewTodoKeyDown}
			autoFocus={true}
		/>);
	}

	handleNewTodoKeyDown = (event: any) => {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		const input = (ReactDOM.findDOMNode(this.refs['newField']) as HTMLInputElement);
		var val = input.value.trim();

		if (val) {
			this.props.todoListStore.addTodo(val);
			input.value = '';
		}
	};
}