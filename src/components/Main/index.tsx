import React from "react";
import DailyShift from "./DailyMain/index";
import MilitaryServ from "./MilitaryServiceMain/MilitaryShiftTimer";
import { HymnCarpet, HymnCarpetItem, HymnCarpetRow } from "../UI/Carpet";

const Scheduler = () => (
  <div>
    <DailyShift />
    <MilitaryServ mil="Airforce" entrance={new Date(2017, 9, 16)} />
  </div>
);
export const Carpets = () => (
  <div>
    <HymnCarpet>
      <HymnCarpetItem>
        <h1>H1</h1>
      </HymnCarpetItem>
      <HymnCarpetItem>
        <h1>H2</h1>
      </HymnCarpetItem>
      <HymnCarpetItem>
        <h1>H3</h1>
      </HymnCarpetItem>
      <HymnCarpetRow>
        <HymnCarpetItem>
          <h1>H4</h1>
        </HymnCarpetItem>
        <HymnCarpetItem>
          <h1>H5</h1>
        </HymnCarpetItem>
        <HymnCarpetItem>
          <h1>H5</h1>
        </HymnCarpetItem>
        <HymnCarpetItem>
          <h1>H5</h1>
        </HymnCarpetItem>
        <HymnCarpetItem>
          <h1>H5</h1>
        </HymnCarpetItem>
        <HymnCarpetItem>
          <h1>H5</h1>
        </HymnCarpetItem>
        <HymnCarpetItem>
          <h1>H5</h1>
        </HymnCarpetItem>
        <HymnCarpetItem>
          <h1>H5</h1>
        </HymnCarpetItem>
        <HymnCarpetItem>
          <h1>H5</h1>
        </HymnCarpetItem>
      </HymnCarpetRow>
    </HymnCarpet>
  </div>
);

export default Scheduler;
