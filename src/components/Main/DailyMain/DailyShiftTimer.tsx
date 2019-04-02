/**
 * Daily Shift Timer
 * @props start_time {string}
 * @props num_of_hrs {number}
 */

import React from "react";
import { getTodayInfo, TimeLeft, castToRealTime } from "../shared";
import { differenceInMilliseconds } from "date-fns";
import { Circle, Line } from "rc-progress";
import "./css/DailyShiftTimer.css";
import { RouteChildrenProps } from "react-router";

interface DailyTimeLeft extends TimeLeft {
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

interface DailyShiftTimerProps extends RouteChildrenProps {
  start_time: string;
  num_of_hrs: number;
  ranges_of_works?: string[][];
}
interface DailyShiftTimerState {
  timeLeft: DailyTimeLeft;
  percentage: number;
}

export default class DailyShiftTimer extends React.Component<
  DailyShiftTimerProps,
  DailyShiftTimerState
> {
  constructor(props: DailyShiftTimerProps) {
    super(props);
    this.state = {
      timeLeft: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
      },
      percentage: 0
    };
  }
  componentWillMount() {
    this.calculateTimeLeft(this.props);
  }
  componentDidMount() {
    setInterval(() => {
      if (this.state.percentage > 1) {
        clearInterval();
        return;
      }
      this.calculateTimeLeft(this.props);
    }, 500);
  }
  componentWillUpdate() {
    clearInterval();
  }
  calculateTimeLeft(props: DailyShiftTimerProps) {
    const now = new Date();
    const [start_hr, start_min] = props.start_time
      .split(":")
      .map(d => parseInt(d));
    const [num_hr, num_mins] = [
      Math.floor(props.num_of_hrs),
      props.num_of_hrs % 1
    ];
    const {
      year: tday_yr,
      month: tday_month,
      date: tday_date,
      day: tday_day
    } = getTodayInfo();
    const start_time = new Date(
      tday_yr,
      tday_month,
      tday_date,
      start_hr,
      start_min,
      0
    );
    const end_time = new Date(
      tday_yr,
      tday_month,
      tday_date,
      start_hr + num_hr,
      start_min + num_mins,
      0
    );
    const offset = differenceInMilliseconds(
      new Date().getTime(),
      start_time.getTime()
    );
    const total = differenceInMilliseconds(
      end_time.getTime(),
      start_time.getTime()
    );
    this.setState({
      timeLeft: castToRealTime(end_time, now),
      percentage: offset / total
    });
  }
  render() {
    // TODO: Implement Carousel for this part
    const beforeStart = <h1 />;
    const todayOver = <p className="shift-done">실근무 끝!</p>;
    const content = (
      <p className="shift-timer">
        남은 근무 <br />
        {this.state.timeLeft.hours}시간 {this.state.timeLeft.minutes}분<br />
      </p>
    );
    return (
      <>
        <div className="timer-block">
          {this.state.percentage > 1 ? todayOver : content}
          <Line
            className="timer-progress"
            percent={this.state.percentage * 100}
            strokeWidth="2"
            strokeColor="#2cae00"
          />
        </div>
      </>
    );
  }
}
