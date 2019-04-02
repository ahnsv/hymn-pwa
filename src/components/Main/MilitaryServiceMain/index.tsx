import React from "react";
import MilitaryShiftTimer from "./MilitaryShiftTimer";
import { RouteChildrenProps } from "react-router";

const MilitaryServiceMain = (props: RouteChildrenProps) => {
  return (
    <React.Fragment>
      <MilitaryShiftTimer
        {...props}
        mil="Airforce"
        entrance={new Date(2017, 9, 17)}
      />
    </React.Fragment>
  );
};

export { MilitaryServiceMain }