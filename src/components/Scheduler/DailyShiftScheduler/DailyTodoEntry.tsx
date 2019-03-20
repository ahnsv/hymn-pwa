import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import TodoStore from '../stores/TodoListStore';

const ENTER_KEY = 13;
interface Props {
	todoStore: TodoStore
}

@observer
export default class TodoEntry extends React.Component<Props, {}> {
	render() {
		return (<input
			ref="newField"
			className="new-todo"
			placeholder="What needs to be done?"
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
			this.props.todoStore.addTodo(val);
			input.value = '';
		}
	};
}