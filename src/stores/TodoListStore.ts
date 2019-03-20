import {observable, computed, reaction, IObservableArray} from 'mobx';
import ToDoModel from '../models/TodoModel'
import * as Utils from '../utils';

export default class TodoStore {
	@observable todos = <IObservableArray<ToDoModel>><unknown>[];

	@computed get activeTodoCount() {
		return this.todos.reduce(
			(sum, todo) => sum + (todo.completed ? 0 : 1),
			0
		)
	}

	@computed get completedCount() {
		return this.todos.length - this.activeTodoCount;
	}

	subscribeServerToStore() {
		reaction(
			() => this.toJS(),
			todos => fetch('/api/todos', {
				method: 'post',
				body: JSON.stringify({ todos }),
				headers: new Headers({ 'Content-Type': 'application/json' })
			})
		);
	}

	subscribeLocalstorageToStore() {
		reaction(
			() => this.toJS(),
			todos => localStorage.setItem('mobx-react-todomvc-todos', <any>todos)
		);
	}

	addTodo (title: string) {
		this.todos.push(new ToDoModel(this, Utils.uuid(), title, false));
	}

	toggleAll (checked: boolean) {
		this.todos.forEach(
			todo => todo.completed = checked
		);
	}

	clearCompleted () {
		this.todos = this.todos.filter(
			todo => !todo.completed
		) as any;
	}

	toJS() {
		return this.todos.map(todo => todo.toJS());
	}

	static fromJS(array: any) {
		const todoStore = new TodoStore();
		todoStore.todos = array.map((item: any) => ToDoModel.fromJS(todoStore, item));
		return todoStore;
	}
}