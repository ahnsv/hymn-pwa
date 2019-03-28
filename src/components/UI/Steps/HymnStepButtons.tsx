import React from "react";
import "./css/HymnStepButtons.css";

const Next = (props: { isActive: boolean; goToNextStep: () => {} }) => {
	if (props.isActive === false) return null;
	return (
		<div onClick={props.goToNextStep}>
			<i className="fas fa-angle-right" />
		</div>
	);
};

const Prev = (props: { isActive: boolean; goToPrevStep: () => {} }) => {
	if (props.isActive === false) return null;
	return (
		<div onClick={props.goToPrevStep}>
			<i className="fas fa-angle-left" />
		</div>
	);
};

const Submit = (props: { isActive: boolean }) => {
	if (props.isActive === false) return null;
	// TODO: Check form is all filled out
	return <div className="submit-btn">확인</div>;
};

export { Next, Prev, Submit };
