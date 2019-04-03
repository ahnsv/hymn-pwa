import React, { useState } from "react";
import { HymnForm, HymnInput } from "../UI/Forms";
import { HymnSteps, HymnStep } from "../UI/Steps";
import { Transition } from "react-transition-group";
// import {Scheduler} from "./../Main/index";

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
      <h1>Love</h1>
      <h1>Love</h1>
      <h1>Love</h1>
      <h1>Love</h1>
      <h1>Love</h1>
      <h1>Love</h1>
    </HymnSteps>
  );
};


const BasicInfoSetup = () => {
  const [userData, setUserData] = useState<UserData>({});
  return <div className="info-setup">{BasicInfoSteps()}</div>;
};

export { BasicInfoSetup };
