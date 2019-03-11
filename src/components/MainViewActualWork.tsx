import React from "react";
import { actualWorkTime, timeTillDischargeDate } from "./Calculate";
import { parse } from "date-fns";

interface MVActualWorkProps {}

interface MVActualWorldState {}

export default class MVActualWork extends React.Component<
	MVActualWorkProps,
	MVActualWorldState
> {
	constructor(props: MVActualWorkProps) {
		super(props);
	}
	render() {
		const timer = <h1>현재까지</h1>;
		{
			actualWorkTime([parse(Date.now()), new Date(2019, 2, 15)], {
				days: true,
				seconds: true
			}).seconds;
		}
		<h1>남았습니다</h1>;

		return <div>{timer}</div>;
	}
}
