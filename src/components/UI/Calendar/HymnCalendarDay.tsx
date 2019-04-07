import React from "react";
import "./css/HymnCalendarDay.css";

interface CalendarDayProps {
  month: number;
  year: number;
  date: number;
  day: string;
  marked?: boolean;
  className?: string;
  passSelection?: (e: React.MouseEvent) => void;
  range?: number[];
}

interface CalendarDayState {
  schedules: any[];
  isClicked: boolean;
  isInrange: boolean;
}

export default class HymnCalendarDay extends React.Component<
  CalendarDayProps,
  CalendarDayState
> {
  constructor(props: CalendarDayProps) {
    super(props);
    this.state = {
      schedules: [],
      isClicked: false,
      isInrange: false
    };
  }
  handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    this.props.passSelection!(e);
    this.setState({
      isClicked: !this.state.isClicked
    });
  };
  render() {
    return (
      <div
        className={`hymn-date ${this.props.className} ${
          this.state.isClicked ? "clicked" : ""
        } ${(this.props.range!.includes(parseInt(this.props.day)))? "inrange" : ""}`}
        onClick={this.handleClick}
        style={
          this.props.day === "SUN"
            ? { color: "red" }
            : this.props.day === "SAT"
            ? { color: "blue" }
            : {}
        }
      >
        {this.props.children}
      </div>
    );
  }
}
