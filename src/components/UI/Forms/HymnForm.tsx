import React from "react";
import { values } from "mobx";

interface HymnFormProps {
	action?: string
	render?: () => React.ReactNode
	getFormData: (f: string, values: any | any[]) => void
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
		this.handleValues = this.handleValues.bind(this)
		this.handleFormDataChange = this.handleFormDataChange.bind(this)
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
		// handle duplicate keys
		const dupKeyNums = (n: any) => Object.keys(this.state.values).map(v => v.split('_')[0]).reduce((count, curr) => {return curr !== n ? count : count + 1}, 0)
		const keyNum = `${k}${(dupKeyNums(k) === 0) ? '' : `_${dupKeyNums(k)}`}`
		this.setState({
			values: {...this.state.values, [keyNum]: v}
		})
	}

	handleFormDataChange() {
		this.props.getFormData('form', this.state.values)
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
				<form action={this.props.action} onChange={this.handleFormDataChange}>
					{children}
				</form>
		);
	}
}
