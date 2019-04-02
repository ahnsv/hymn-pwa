import * as React from "react";
import {
  CalendarDay,
  CalendarMain,
  CalendarMonths,
  CalendarYears
} from "../UI/Calendar/";

export const Months = () => <CalendarMonths current={new Date()} />;
export const Years = () => <CalendarMonths current={new Date()} />;
