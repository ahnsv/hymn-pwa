import React from "react";
import {
	actualWorkTime,
	timeTillDischargeDate,
	TimeFormats
} from "./Calculate";
import { parse, endOfWeek } from "date-fns";

interface MVActualWorkProps {}

interface MVActualWorldState extends TimeFormats {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
}

export default class MVActualWork extends React.Component<
	MVActualWorkProps,
	MVActualWorldState
> {
	constructor(props: MVActualWorkProps) {
		super(props);
	}

	setTime() {
		const time = actualWorkTime(
			[parse(Date.now()), endOfWeek(parse(Date.now()))],
			{
				days: true,
				hours: true,
				seconds: true
			}
		);
		this.setState(time);
	}

	componentWillMount() {
		this.setTime();
	}

	componentDidMount() {
		setInterval(() => {
			this.setTime();
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval();
	}

	render() {
		return (
			<div>
				현재까지 실근무 {this.state.days} 일 {this.state.hours} 시간
				{this.state.seconds} 초 남았습니다.
			</div>
		);
	}
}
