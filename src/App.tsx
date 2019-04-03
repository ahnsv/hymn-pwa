import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { VacationScheduler } from "./components/Scheduler/VacationScheduler";
import { firebase, withAuthentication } from "./firebase";
import { MilitaryServiceMain } from "./components/Main/MilitaryServiceMain";
import { DailyShiftMain } from "./components/Main/DailyMain";
import { TutorialView } from './components/Tutorial'
import VacationCalendar from "./components/Scheduler/VacationCalendar";
import { RouteChildrenProps } from "react-router";
import { CalendarMain, CalendarMonths, CalendarYears } from "./components/UI/Calendar";

interface AppProps extends RouteChildrenProps {

}
class AppComponent extends Component<AppProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      authUser: null
    };
  }
  public componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact={true} path="/" component={MilitaryServiceMain} />
          <Route path="/daily" component={DailyShiftMain} />
          <Route path="/calendar" component={() => <CalendarMain date={new Date()} />} />
          <Route path="/calendar/months" component={() => <CalendarMonths current={new Date()} />} />
          <Route path="/calendar/years" component={() => <CalendarYears {...this.props} base_year={2019} />} />
          <Route path="/tutorial" component={TutorialView} />
        </Switch>
      </div>
    );
  }
}

export const App = withAuthentication(AppComponent);
