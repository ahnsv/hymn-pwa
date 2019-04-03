import React from "react";
import { values } from "mobx";

interface HymnFormProps {
	action?: string
	render?: () => React.ReactNode
}
interface HymnFormValue {
	[key: string]: any
}
interface HymnFormError {
	[key: string]: any
}
interface HymnFormState {
	values: HymnFormValue
	errors?: HymnFormError
	submitable?: boolean
}
export default class HymnForm extends React.Component<HymnFormProps, HymnFormState> {
	constructor(props: any) {
		super(props);
		const values: HymnFormValue = {}
		const errors: HymnFormError = {}
		this.state = {
			values: values,
			errors: errors
		}
	}
	private handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();

		if (this.validateForm()) {
			const submitSuccess: boolean = await this.submitForm();
			this.setState({ submitable: submitSuccess });
		}
	};

	private validateForm(): boolean {
		// TODO - validate form
		return true;
	}

	/**
	 * Submits the form to the http api
	 * @returns {boolean} - Whether the form submission was successful or not
	 */
	private async submitForm(): Promise<boolean> {
		// TODO - submit the form
		return true;
	}

	handleValues(k: any, v: any) {
		this.setState({
			values: {...values, k: v}
		})
	}

	render() {
		const children = React.Children.map(
			this.props.children,
			(c, index) => {
			  return React.cloneElement(c as React.ReactElement, {
				changeHandler: this.handleValues
			  });
			}
		  );
		return (
				<form action={this.props.action}>
					{children}
				</form>
		);
	}
}
