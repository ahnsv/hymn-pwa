import React from 'react'

const Next = (props: {isActive: boolean, goToNextStep: () => {}}) => {
    if (props.isActive === false) return null
    return (
        <div onClick={() => props.goToNextStep}>
            &rArr;
        </div>
    )
} 

const Prev = (props: {isActive: boolean, goToPrevStep: () => {}}) => {
    if (props.isActive === false) return null
    return (
        <div onClick={() => props.goToPrevStep}>
            &lArr;
        </div>
    )
}

const Submit = (props: {isActive: boolean}) => {
    if (props.isActive === false) return null
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