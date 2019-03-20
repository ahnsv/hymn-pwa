import React, { Component } from 'react';
import './App.css';
import DailyShiftScheduler from './components/Scheduler/DailyShiftScheduler/DailyShiftScheduler'
import WeeklyShiftScheduler, { WeeklyOffDuty } from './components/Scheduler/WeeklyScheduler/WeeklyShiftScheduler';
class App extends Component {
  render() {
    const off_duty: WeeklyOffDuty = {name: '', range: ['']}
    return (
      <div className="App">
        <DailyShiftScheduler />
        {/* <WeeklyShiftScheduler off_duty={[off_duty]} /> */}
      </div>
    );
  }
}

export default App;
