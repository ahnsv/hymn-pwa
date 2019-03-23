import React, { useState } from 'react'
import {HymnForm, HymnInput} from '../UI/Forms'

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
        <HymnForm>
            <HymnInput label="" type=""></HymnInput>
        </HymnForm>
    )
}