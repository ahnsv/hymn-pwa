import React from "react";

interface HymnFormProps {
	children: React.ReactNode;
}
interface HymnFormState {}

export default class HymnForm extends React.Component<
	HymnFormProps,
	HymnFormState
> {
	constructor(props: HymnFormProps) {
		super(props);
	}
	render() {
		return <form className="hymn-form">{this.props.children}</form>;
	}
}
