import React from "react";
import {
	actualWorkTime,
	timeTillDischargeDate,
	TimeFormats
} from "./Calculate";
import { parse, endOfWeek, startOfToday } from "date-fns";

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
		this.state = {
			months: 0,
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0
		};
	}

	setTime() {
		// TODO: refine setting time logic for actual work
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
				현재까지 실근무 {this.state.days}일 {this.state.hours}시간{" "}
				{this.state.minutes}분 {this.state.seconds} 초 남았습니다.
			</div>
		);
	}
}
