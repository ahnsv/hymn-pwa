import React, { useState } from "react";
import { HymnForm, HymnInput } from "../UI/Forms";
import { HymnSteps, HymnStep } from "../UI/Steps";

export interface UserData {
	entrance_date?: Date;
	name?: string;
	mil_serial_num?: string;
	military?: string;
	end_date?: Date;
	phone_number?: string;
	default_loc?: string;
	nearest_vacation?: [Date, Date];
}

export interface AnonymousUserData extends UserData {
	entrance_date: Date;
	name?: string;
	military: string;
	nearest_vacation: [Date, Date];
}

/**
 * Form for basic information of user
 * Use this information to make basic features of main page work
 */
const BasicInfoSteps = () => {
	return (
		<HymnSteps>
			<HymnStep>
				<h1>Hello</h1>
			</HymnStep>
			<HymnStep>
				<h2>hi</h2>
			</HymnStep>
			<HymnStep>
				<h3>ollah</h3>
			</HymnStep>
		</HymnSteps>
	);
};

const BasicForm = () => (
	<HymnForm>
		Hi
	</HymnForm>
)

const BasicInfoSetup = () => {
	const [userData, setUserData] = useState<UserData>({});
	return <div className="info-setup">{BasicInfoSteps()}</div>;
};

export { BasicInfoSetup, BasicForm };
