import {observable} from 'mobx';
import ToDoListStore from '../stores/TodoListStore';
export default class TodoModel {
	store: ToDoListStore;
	id: string;
	@observable title: string;
	@observable completed: boolean;

	constructor(store: ToDoListStore, id: string, title: string, completed: boolean) {
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

	static fromJS(store: ToDoListStore, object: TodoModel) {
		return new TodoModel(store, object.id, object.title, object.completed);
	}
}