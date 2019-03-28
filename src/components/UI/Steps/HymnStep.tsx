import React from "react";
import { Next, Prev, Submit } from "./HymnStepButtons";
import "./css/HymnStep.css";

export interface StepProps {
	isActive?: boolean;
	displayPrevious?: boolean;
	displayNext?: boolean;
	displaySubmit?: boolean;
	prev?: () => {};
	next?: () => {};
	children?: React.ReactNode;
	component?: React.ComponentClass;
}

export default class Step extends React.Component<StepProps, {}> {
	constructor(props: StepProps) {
		super(props);
	}
	render() {
		if (!this.props.isActive) return null;
		const {
			isActive,
			displayPrevious,
			displayNext,
			displaySubmit,
			prev,
			next,
			children,
			component
		} = this.props;
		return (
			<>
				{component ? React.createElement(component) : children}
				<div className="step-nav">
					<Prev
						isActive={displayPrevious as boolean}
						goToPrevStep={prev as () => {}}
					/>
					<Next
						isActive={displayNext as boolean}
						goToNextStep={next as () => {}}
					/>
					<Submit isActive={displaySubmit as boolean} />
				</div>
			</>
		);
	}
}
