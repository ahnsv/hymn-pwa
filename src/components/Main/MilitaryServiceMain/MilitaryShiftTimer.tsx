import React, { useState } from 'react'
import { addMonths, differenceInWeeks, subDays, differenceInMilliseconds } from 'date-fns';

interface MilitaryServiceTimerProps {
    entrance: Date
    mil: string
}
interface MilitaryServiceTimerState {
    isNotEnlistedYet?: boolean
    percentage: number
    imprisoned?: number
}
export default class MilitaryServiceTimer extends React.Component<MilitaryServiceTimerProps, MilitaryServiceTimerState> {
    /**
     * 단축 복무 대상 인원 원래 복무 기간 (단위: 달)
     */
    _militaryServMonthCount: { [key: string]: number } = {
        'Army': 21,
        'Airforce': 24,
        "Marine": 21,
        "Navy": 23,
        "Police": 21,
        "Social": 24,
        "Fire": 23,
        "Industry_sup": 26
    }

    /**
     * 계급별 복무기간
     */
    _timePerRank: { [key: string]: number[] } = {
        'Army': [3, 7, 7, 4],
        'Airforce': [3, 7, 7, 7],
        "Marine": [6, 6, 7, 4],
    } 

    constructor(props: MilitaryServiceTimerProps) {
        super(props)
        this.state = {
            percentage: 0
        }
    }

    /**
     * 단축일수 
     * @reference http://www.mma.go.kr/board/boardView.do?gesipan_id=2&gsgeul_no=1499320&mc=usr0000379
     * @param end 전역일자
     * @param mil 군종
     */
    _getServShortenedCount(end: Date, mil: string) {
        if (mil === 'Airforce') {
            return (differenceInWeeks(end, new Date(2018, 9, 1)) / 2 + 1 > 60) ? 60 : differenceInWeeks(end, new Date(2018, 9, 1)) / 2 + 1
        }
        return (differenceInWeeks(end, new Date(2018, 9, 1)) / 2 + 1 > 90) ? 90 : differenceInWeeks(end, new Date(2018, 9, 1)) / 2 + 1
    }

    /**
     * 전역일자 계산
     * @param entrance 입대일자
     * @param mil 군종
     */
    _getServiceEndDate(entrance: Date, mil: string) {
        const org_end_date = addMonths(entrance, this._militaryServMonthCount[mil])
        return subDays(org_end_date, this._getServShortenedCount(org_end_date, mil))
    }

    /**
     * 복무 퍼센트 계산
     * @param entrance 입대일자
     * @param end_date 전역일자
     */
    _getServicePercentage(entrance: Date, end_date: Date) {
        return Math.abs(differenceInMilliseconds(entrance, new Date())) / Math.abs(differenceInMilliseconds(entrance, end_date)) * 100
    }

    static getTimeRange(dest: Date, src: Date) {
        return Math.abs(differenceInMilliseconds(src, new Date())) / Math.abs(differenceInMilliseconds(src, dest)) * 100
    }

    handleTimeChange() {
        this.setState({
            percentage: this._getServicePercentage(this.props.entrance, this._getServiceEndDate(this.props.entrance, this.props.mil))
        })
    }

    componentDidMount() {
        setInterval(() => {
            this.handleTimeChange()
        }, 100)
    }

    componentWillUnmount() {
        clearInterval()
    }

    render() {
        // TODO: get from cached percentage with React Hooks
        return (
            <div>
                <h1>군생활 {this.state.percentage.toFixed(3)}% 했네여</h1>
            </div>
        )
    }
}
