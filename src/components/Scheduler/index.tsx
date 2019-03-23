import React from 'react'
import DailyShift from './DailyShiftScheduler/DailyShiftScheduler'
import MilitaryServ from './MilitaryShiftScheduler/MilitaryShiftTimer'

const Scheduler = () => (
    <div>
        <DailyShift />
        <MilitaryServ mil="Airforce" entrance={new Date(2017, 9, 16)}/>
    </div>
)

export default Scheduler