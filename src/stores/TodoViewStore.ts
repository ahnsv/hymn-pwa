
import {observable} from 'mobx';
import { ALL_TODOS } from '../components/Scheduler/shared';

export default class ViewStore {
	@observable todoBeingEdited: any = null;
	@observable todoFilter= ALL_TODOS;
}