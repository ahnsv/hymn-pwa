import * as React from "react";
import {
  CalendarDay,
  CalendarMain,
  CalendarMonths,
  CalendarYears
} from "../UI/Calendar/";
import { RouteChildrenProps, Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

const VacationCalendar = (props: RouteChildrenProps) => (
  <Switch>
    <Route path="/calendar" component={() => <CalendarMain date={new Date()}/>} />
    <Route path="/calendar/months" component={() => <CalendarMonths current={new Date()}/>} />
    <Route path="/calendar/years" component={() => <CalendarYears {...props} base_year={2019}/>} />
  </Switch>
)

export default VacationCalendar