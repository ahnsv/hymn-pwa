import React from "react";
import { RouteChildrenProps } from "react-router";

interface HymnCalendarYearProps extends RouteChildrenProps {
  base_year?: number;
  selected_month?: number;
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
    const { base_year } = this.props.location.state;
    this.state = {
      current: base_year
    };
  }
  render() {
    const range = (i: number) => {
      const [rangeIdx, rangeEndIdx] = [i - (i % 10), i - (i % 10) + 9];
      const result = [];
      for (let j = rangeIdx; j <= rangeEndIdx; j++) {
        result.push(j);
      }
      return result;
    };
    const rangeGrid = range(this.props.base_year as number).map((d, idx) => (
      <div className="hymn-calendar-month" key={idx}>
        {d}
      </div>
    ));
    return <div className="hymn-calendar-year">{rangeGrid}</div>;
  }
}
