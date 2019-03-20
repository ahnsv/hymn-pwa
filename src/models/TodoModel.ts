import {observable} from 'mobx';
import TodoListStore from '../stores/TodoListStore';
export default class TodoModel {
	store: TodoListStore;
	id: string;
	@observable title: string;
	@observable completed: boolean;

	constructor(store: TodoListStore, id: string, title: string, completed: boolean) {
		this.store = store;
		this.id = id;
		this.title = title;
		this.completed = completed;
	}

	toggle() {
		this.completed = !this.completed;
	}

	destroy() {
		this.store.todos.remove(this);
	}

	setTitle(title: string) {
		this.title = title;
	}

	toJS() {
		return {
			id: this.id,
			title: this.title,
			completed: this.completed
		};
	}

	static fromJS(store: TodoListStore, object: TodoModel) {
		return new TodoModel(store, object.id, object.title, object.completed);
	}
}