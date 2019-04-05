import React from 'react'
import { RouteChildrenProps } from 'react-router';
import { HymnCarpet, HymnCarpetItem } from '../UI/Carpet';
import { DailyShiftMain } from './DailyMain';
import { MilitaryServiceMain } from './MilitaryServiceMain';

const MainView = (props: RouteChildrenProps) => {
    return (
        <HymnCarpet>
            <HymnCarpetItem> <DailyShiftMain {...props}/> </HymnCarpetItem>
            <HymnCarpetItem> <MilitaryServiceMain {...props} /> </HymnCarpetItem>
            <HymnCarpetItem> Hi </HymnCarpetItem>
            <HymnCarpetItem> Hi </HymnCarpetItem>
            <HymnCarpetItem> Hi </HymnCarpetItem>
        </HymnCarpet>)
}

export { MainView }