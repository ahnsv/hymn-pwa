import {observable, action} from 'mobx'

type VacationCategory = '외박' | '연가' | '포상' | '위로' | '특별' | '청원' | '기타'
interface Vacation {
    name: string
    range: Date[]
    category: VacationCategory
}
export default class VacationStore {
    @observable vacations: Vacation[] = []

    @action 
    putVacationSchedule(schedule: Vacation) {
        this.vacations.push(schedule)
    }
}