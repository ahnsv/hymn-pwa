import React, { Component } from 'react';
import './App.css';
import DailyShiftScheduler from './components/Scheduler/DailyShiftScheduler/DailyShiftScheduler'
import WeeklyShiftScheduler, { WeeklyOffDuty } from './components/Scheduler/WeeklyScheduler/WeeklyShiftScheduler';
import { Route, Switch } from 'react-router-dom';
import SignInMain from './components/SignIn/SignInMain';
import { firebase, withAuthentication } from "./firebase";

class AppComponent extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      authUser: null
    }
  }
  public componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }
  render() {
    const off_duty: WeeklyOffDuty = { name: '', range: [''] }
    return (
      <div className="App">
        <Switch>
          <Route exact={true} path="/" component={DailyShiftScheduler} />
          <Route path="/signin" component={SignInMain} />
        </Switch>
      </div>
    );
  }
}

export const App = withAuthentication(AppComponent);
