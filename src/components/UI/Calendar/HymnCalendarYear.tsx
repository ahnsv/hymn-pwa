import React from "react";

interface HymnCalendarYearProps {
  base_year: number;
  selected_month: number;
}
interface HymnCalendarYearState {
  current: number;
}
export default class HymnCalendarYear extends React.Component<
  HymnCalendarYearProps,
  HymnCalendarYearState
> {
  constructor(props: HymnCalendarYearProps) {
    super(props);
    this.state = {
      current: this.props.base_year
    };
  }
  render() {
    const range = (i: number) => {
      const a = [];
      for (let num = 1; num < i + 1; num++) {
        a.push(num);
      }
      return a;
    };
    const rangeGrid = range(12).map((d, idx) => <div className="hymn-calendar-month" key={idx}>{d}</div>);
    return <div className="hymn-calendar-year">{rangeGrid}</div>;
  }
}
