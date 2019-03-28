import { observable, computed } from 'mobx'

export default class UserInfoStore {
    /**
     * Initialize store class member variables
     */
    @observable name: string = ''
    @observable entry_date: Date = new Date(2017, 0, 1)
    @observable military: string = ''
    @observable rank: string = ''
    @observable end_date: Date = new Date(2018, 0, 1)
    
    @computed 
    getEndDate(entry_date: Date, military: string) {
        // TODO: set end date based on entry date and military
    }
}

