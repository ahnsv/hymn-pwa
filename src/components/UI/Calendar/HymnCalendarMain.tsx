/**
 * Monthly Calender View (by default)
 */

import React from "react";
import {
  getMonth,
  getYear,
  startOfMonth,
  endOfMonth,
  eachDay,
  getDate,
  subDays,
  addDays,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  getDay
} from "date-fns";
import HymnCalendarDay from "./HymnCalendarDay";
import { CSSTransition } from "react-transition-group";
import "./css/HymnCalendarMain.css";
import { Link } from "react-router-dom";

interface CalendarProps {
  min_date?: Date;
  max_date?: Date;
  date: Date;
  onDateChanged?: () => {};
  showArrows?: boolean;
}
interface CalendarState {
  current: Date;
  month: number;
  year: number;
  min_date: Date;
  max_date: Date;
  selection: number | number[];
}

export default class CalenderMain extends React.Component<
  CalendarProps,
  CalendarState
> {
  constructor(props: CalendarProps) {
    super(props);
    this.state = {
      current: this.props.date,
      month: getMonth(this.props.date),
      year: getYear(this.props.date),
      min_date: startOfMonth(this.props.date),
      max_date: endOfMonth(this.props.date),
      selection: 0
    };
  }

  handleStateChange() {
    this.setState({
      month: getMonth(this.state.current),
      year: getYear(this.state.current),
      min_date: startOfMonth(this.state.current),
      max_date: endOfMonth(this.state.current)
    });
  }

  handleSelection = (e: React.MouseEvent) => {
    const elm = e.currentTarget;
    // initial
    if (this.state.selection === 0) {
      this.setState({
        selection: parseInt(elm.innerHTML)
      });
    }
    else {
      // make it an array
      if (typeof this.state.selection === 'number') {
        this.setState({
          selection: [this.state.selection, parseInt(elm.innerHTML)]
        })
      }
      // append to the array
      else {
        this.setState({
          selection: [...this.state.selection, parseInt(elm.innerHTML)]
        })
      }
    }
  };

  handleNext = () => {
    this.setState({
      current: addMonths(this.state.current, 1)
    });
    this.handleStateChange();
  };

  handlePrev = () => {
    this.setState({
      current: subMonths(this.state.current, 1)
    });
    this.handleStateChange();
  };

  renderDaysAndDates() {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const renderedDays = days.map((d, i) => (
      <div id={d} key={i}>
        {d}
      </div>
    ));
    const currentMonthDates = eachDay(
      this.state.min_date,
      this.state.max_date
    ).map((d, i) => (
      <HymnCalendarDay
        className="current"
        date={getDate(d)}
        month={this.state.month}
        year={this.state.year}
        day={days[getDay(d)]}
        key={i}
        passSelection={this.handleSelection}
        range={(typeof this.state.selection === 'object') ? this.state.selection : []}
      >
        {getDate(d)}
      </HymnCalendarDay>
    ));
    const restOfDays = {
      head: [
        startOfWeek(subDays(this.state.min_date, 1)),
        subDays(this.state.min_date, 1)
      ],
      tail: [
        addDays(this.state.max_date, 1),
        endOfWeek(addDays(this.state.max_date, 1))
      ]
    };
    const head = eachDay(restOfDays.head[0], restOfDays.head[1]).map((d, i) => (
      <HymnCalendarDay
        className="prev-month-days"
        date={getDate(d)}
        day={days[getDay(d)]}
        month={this.state.month}
        year={this.state.year}
        key={i}
        passSelection={this.handleSelection}
        range={(typeof this.state.selection === 'object') ? this.state.selection : []}
      >
        {getDate(d)}
      </HymnCalendarDay>
    ));
    const tail = eachDay(restOfDays.tail[0], restOfDays.tail[1]).map((d, i) => (
      <HymnCalendarDay
        className="next-month-days"
        date={getDate(d)}
        day={days[getDay(d)]}
        month={this.state.month}
        year={this.state.year}
        key={i}
        passSelection={this.handleSelection}
        range={(typeof this.state.selection === 'object') ? this.state.selection : []}
      >
        {getDate(d)}
      </HymnCalendarDay>
    ));

    return (
      <div className="hymn-monthly-dates">
        <div className="hymn-days">{renderedDays}</div>
        <div className="hymn-dates">
          {head}
          {currentMonthDates}
          {tail}
        </div>
      </div>
    );
  }
  render() {
    const arrowRight = (
      <div className="hymn-month-nav-next" onClick={this.handleNext}>
        <i className="fas fa-angle-right" />
      </div>
    );
    const arrowLeft = (
      <div className="hymn-month-nav-prev" onClick={this.handlePrev}>
        <i className="fas fa-angle-left" />
      </div>
    );
    const monthText = [
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
    return (
      <div className="hymn-calendar-monthly">
        {this.props.showArrows === undefined || this.props.showArrows
          ? arrowLeft
          : ""}
        <CSSTransition
          in={true}
          timeout={200}
          classNames="hymn-calendar-transition"
        >
          <div className="monthly-dates">
            <Link
              to={{
                pathname: "/calendar/years",
                state: {
                  base_year: this.state.year
                }
              }}
            >
              <div className="hymn-year">{this.state.year}</div>
            </Link>
            <Link
              to={{
                pathname: "/calendar/months",
                state: {
                  base_month: this.state.month
                }
              }}
            >
              <div className="hymn-month">
                {this.state.month + 1}
                <span style={{ fontSize: "0.5em" }}>
                  {monthText[this.state.month]}
                </span>
              </div>
            </Link>
            {this.renderDaysAndDates()}
          </div>
        </CSSTransition>
        {this.props.showArrows === undefined || this.props.showArrows
          ? arrowRight
          : ""}
      </div>
    );
  }
}
