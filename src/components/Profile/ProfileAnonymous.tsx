import React, { useState } from 'react'
import {HymnForm, HymnInput} from '../UI/Forms'
import { HymnSteps, HymnStep } from '../UI/Steps'

export interface UserData {
    entrance_date?: Date
    name?: string
    mil_serial_num?: string
    military?: string
    end_date?: Date
    phone_number?: string
    default_loc?: string
    nearest_vacation?: [Date, Date]
}

export interface AnonymousUserData extends UserData {
    entrance_date: Date
    name?: string
    military: string
    nearest_vacation: [Date, Date]
}

/**
 * Form for basic information of user
 * Use this information to make basic features of main page work
 */
const SetUpBasicInfoForm = () => {
    const [userData, setUserData] = useState<UserData>({})
    return (
        // <HymnSteps>
        //     <HymnStep isActive={true}>
        //         <h1>Hello</h1>
        //     </HymnStep>
        //     <HymnStep isActive={false}>
        //         <HymnForm>
        //             <h1>Form Hi</h1>
        //         </HymnForm>
        //     </HymnStep>
        // </HymnSteps>
        <div>Temp</div>
    )
}

export { SetUpBasicInfoForm }