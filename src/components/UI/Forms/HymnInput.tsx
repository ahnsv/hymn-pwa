import React from 'react'

interface HymnInputProps {
    label: string
    type: string
    id?: string
    name?: string
    minLength?: number
    maxLength?: number
    placeholder?: string
    changeHandler?: (k: any, v: any) => void
}
interface HymnInputState<T> {
    value: string | any | T
}

export default class HymnInput<T> extends React.Component<HymnInputProps, HymnInputState<T>> {
    state = {
        value: ''
    }
    handleSubmit(e: Event) {
        e.preventDefault()
        console.log(e)
    }
    handleChange(e: React.FormEvent<HTMLInputElement>) {
        let { changeHandler } = this.props
        // Type Assertion
        changeHandler = changeHandler as (k: any, v: any) => void
        e.preventDefault()
        this.setState({
            value: this.state.value.concat(e.currentTarget.value)
        })
        changeHandler(this.props.label, this.state.value)
    }
    render() {
        return (
            <>
                <label htmlFor={this.props.label}>{this.props.label}</label>
                <input className="hymn-input" type={this.props.type} onKeyUp={this.handleChange} />
            </>
        )
    }
}