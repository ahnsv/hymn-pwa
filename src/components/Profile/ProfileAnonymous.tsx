import React, { useState } from 'react'


export interface UserData {
    entrance_date?: Date
    name?: string
    mil_serial_num?: string
    military?: string
    end_date?: Date
    phone_number?: string
    default_loc?: string
}

export interface AnonymousUserData extends UserData {
    entrance_date: Date
    name?: string
    military: string
}

/**
 * Form for basic information of user
 * Use this information to make basic features of main page work
 */
const SetUpBasicInfoForm = () => {
    const [userData, setUserData] = useState<UserData>(undefined)
    return (
        <form>
            {/* TODO: Set basic form */}
        </form>
    )
}