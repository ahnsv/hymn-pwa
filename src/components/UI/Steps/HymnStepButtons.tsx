import React from 'react'

const Next = ({isActive, goToNextStep}) => {
    if (isActive === false) return null
    return (
        <div onClick={() => goToNextStep}>
            &rArr;
        </div>
    )
} 

const Prev = ({isActive, goToPrevStep}) => {
    if (isActive === false) return null
    return (
        <div onClick={() => goToPrevStep}>
            &lArr;
        </div>
    )
}

const Submit = ({isActive}) => {
    if (isActive === false) return null
    // TODO: Check form is all filled out
    return (
        <div>
            Submit
        </div>
    )
}

export {
    Next,
    Prev,
    Submit
}