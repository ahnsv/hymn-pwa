import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MVActualWork from './components/MainViewActualWork'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MVActualWork/>
      </div>
    );
  }
}

export default App;
