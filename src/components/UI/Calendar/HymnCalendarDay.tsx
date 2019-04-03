import React from "react";

interface CalendarDayProps {
  month: number;
  year: number;
  date: number;
  day: string
  marked?: boolean;
  className?: string;
}

interface CalendarDayState {
  schedules: any[];
}

export default class HymnCalendarDay extends React.Component<
  CalendarDayProps,
  CalendarDayState
  > {
  constructor(props: CalendarDayProps) {
    super(props);
    this.state = {
      schedules: []
    };
  }
  handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    console.log(this.props.month, this.props.year);
  };
  render() {
    return (
      <div
        className={`hymn-date ${this.props.className}`}
        onClick={this.handleClick}
        style={(this.props.day === "SUN") ? { color: 'red' } : (this.props.day === 'SAT') ? { color: 'blue' } : {}}
      >
        {this.props.children}
      </div>
    );
  }
}
