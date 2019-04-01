import * as React from "react";
import MonthlyCalendar from "./HymnCalendarMain";
import { getYear, getMonth } from "date-fns";
import "./css/HymnCalendarMonths.css";
import { Link } from "react-router-dom";
export interface HymnCalendarMonthsProps {
  current: Date;
}

const HymnCalendarMonths = (props: HymnCalendarMonthsProps) => {
  const currentYear = getYear(props.current);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];
  const monthsIdx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
    (v, i) => new Date(currentYear, i, 1)
  );
  return (
    <div className="hymn-calendar-months">
      {monthsIdx.map((m, idx) => (
        // <MonthlyCalendar date={m} key={idx} showArrows={false}/>
        <div key={idx} className="calendar-months--month">
          <Link to='/calendar' key={idx} className="month-link">{months[getMonth(m)]}</Link>
        </div>
      ))}
    </div>
  );
};

export default HymnCalendarMonths;
