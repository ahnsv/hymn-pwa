import React, { Component } from "react";
import "./App.css";
import { Carpets } from "./components/Main/index";
import { Route, Switch } from "react-router-dom";
import { VacationScheduler } from "./components/Scheduler/VacationScheduler";
import { firebase, withAuthentication } from "./firebase";
import { Months, Years } from "./components/Scheduler/VacationCalendar";
import { MilitaryServiceMain } from "./components/Main/MilitaryServiceMain";
import { DailyShiftMain } from "./components/Main/DailyMain";
import { TutorialView } from './components/Tutorial'

class AppComponent extends Component {
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
          <Route path="/calendar" render={() => <VacationScheduler />} />
          <Route path="/calendarMonths" component={Months} />
          <Route path="/calendarYears" component={Years} />
          <Route path="/carpet" component={Carpets} />
          <Route path="/tutorial" component={TutorialView} />
        </Switch>
      </div>
    );
  }
}

export const App = withAuthentication(AppComponent);
