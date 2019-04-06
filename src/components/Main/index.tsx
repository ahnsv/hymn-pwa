import React from 'react'
import { RouteChildrenProps } from 'react-router';
import { HymnCarpet, HymnCarpetItem, HymnCarpetRow } from '../UI/Carpet';
import { DailyShiftMain } from './DailyMain';
import { MilitaryServiceMain } from './MilitaryServiceMain';
import { CalendarMain } from '../UI/Calendar';

const MainView = (props: RouteChildrenProps) => {
    return (
        <HymnCarpet mode="carousel">
            <HymnCarpetItem> <DailyShiftMain {...props} /> </HymnCarpetItem>
            <HymnCarpetRow>
                    <HymnCarpetItem> <MilitaryServiceMain {...props} /> </HymnCarpetItem>
                    <HymnCarpetItem> <MilitaryServiceMain {...props} /> </HymnCarpetItem>
                    <HymnCarpetItem> <MilitaryServiceMain {...props} /> </HymnCarpetItem>
                    <HymnCarpetItem> <MilitaryServiceMain {...props} /> </HymnCarpetItem>
            </HymnCarpetRow>
            <HymnCarpetItem> <CalendarMain date={new Date()}/> </HymnCarpetItem>
        </HymnCarpet>)
}

export { MainView }