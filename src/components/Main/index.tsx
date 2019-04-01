import React, { useState } from "react";
import DailyShift from "./DailyMain/index";
import MilitaryServ from "./MilitaryServiceMain/MilitaryShiftTimer";
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import { HymnCarpet, HymnCarpetItem, HymnCarpetRow } from "../UI/Carpet";
import CalenderMain from "../UI/Calendar/HymnCalendarMain";
import './index.css'
import HymnCalendarMonths from "../UI/Calendar/HymnCalendarMonths";

const Scheduler = () => (
  <div>
    <DailyShift />
    <MilitaryServ mil="Airforce" entrance={new Date(2017, 9, 16)} />
  </div>
);
export const Carpets = () => {
  const [inProp, setInProp] = useState(false);
  return (
    <div>
      <HymnCarpet>
          <HymnCarpetItem>
              Hi
          </HymnCarpetItem>
          <HymnCarpetItem>
              Hi
          </HymnCarpetItem>
          <HymnCarpetItem>
              Hi
          </HymnCarpetItem>
      </HymnCarpet>
    </div>
  );
};

export default Scheduler;
