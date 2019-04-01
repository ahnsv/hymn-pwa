import React, { useState } from "react";
import DailyShift from "./DailyMain/index";
import MilitaryServ from "./MilitaryServiceMain/MilitaryShiftTimer";
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import { HymnCarpet, HymnCarpetItem, HymnCarpetRow } from "../UI/Carpet";
import CalenderMain from "../UI/Calendar/HymnCalendarMain";
import './index.css'

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
      {/* <CSSTransition in={inProp} timeout={200} classNames="my-node">
        <div>{"I'll receive my-node-* classes"}</div>
      </CSSTransition>
      <button type="button" onClick={() => setInProp(!inProp)}>
        Click to Enter
      </button> */}
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
