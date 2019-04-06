import React from 'react'
import { RouteChildrenProps } from 'react-router';
import { HymnCarpet, HymnCarpetItem, HymnCarpetRow } from '../UI/Carpet';
import { DailyShiftMain } from './DailyMain';
import { MilitaryServiceMain } from './MilitaryServiceMain';

const MainView = (props: RouteChildrenProps) => {
    return (
        <HymnCarpet>
            <HymnCarpetItem> <DailyShiftMain {...props} /> </HymnCarpetItem>
            <HymnCarpetRow>
                <>
                    <HymnCarpetItem> <MilitaryServiceMain {...props} /> </HymnCarpetItem>
                    <HymnCarpetItem> <MilitaryServiceMain {...props} /> </HymnCarpetItem>
                    <HymnCarpetItem> <MilitaryServiceMain {...props} /> </HymnCarpetItem>
                    <HymnCarpetItem> <MilitaryServiceMain {...props} /> </HymnCarpetItem>
                </>
            </HymnCarpetRow>
            <HymnCarpetItem> <MilitaryServiceMain {...props} /> </HymnCarpetItem>
            <HymnCarpetItem> <DailyShiftMain {...props} /> </HymnCarpetItem>
            <HymnCarpetItem> <MilitaryServiceMain {...props} /> </HymnCarpetItem>
            <HymnCarpetItem> <DailyShiftMain {...props} /> </HymnCarpetItem>
            <HymnCarpetItem> <MilitaryServiceMain {...props} /> </HymnCarpetItem>
        </HymnCarpet>)
}

export { MainView }