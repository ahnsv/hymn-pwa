import React from 'react'

interface HymnInputProps { 
    label: string
    type: string
    id?: string
    name?: string
    minLength?: number
    maxLength?: number
    placeholder?: string
}
interface HymnInputState<T> {
    inputData: T
}

export default class HymnInput<T> extends React.Component<HymnInputProps, HymnInputState<T>> {
    constructor(props: HymnInputProps) {
        super(props)
    }
    handleSubmit(e: Event) {
        e.preventDefault()
        console.log(e)
    }
    render() {
        return (
            <>
                <label htmlFor={this.props.label}>{this.props.label}</label>
                <input className="hymn-input" type={this.props.type}/>
            </>
        )
    }
}