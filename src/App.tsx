import React, { Component } from 'react';
import './App.css';
import Scheduler from './components/Scheduler/index'
import WeeklyShiftScheduler, { WeeklyOffDuty } from './components/Scheduler/WeeklyScheduler/WeeklyShiftScheduler';
import { Route, Switch } from 'react-router-dom';
import {SignIn} from './components/SignIn/index';
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
          <Route exact={true} path="/" component={Scheduler} />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </div>
    );
  }
}

export const App = withAuthentication(AppComponent);
