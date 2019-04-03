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
    constructor(props: HymnInputProps) {
        super(props)
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(e: Event) {
        e.preventDefault()
        console.log(e)
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { changeHandler } = this.props
        // Type Assertion
        changeHandler = changeHandler as (k: any, v: any) => void
        this.setState({
            value: e.currentTarget.value
        })
        changeHandler(this.props.label, e.currentTarget.value)
    }

    render() {
        return (
            <>
                <label htmlFor={this.props.label}>{this.props.label}</label>
                <input className="hymn-input" type={this.props.type} onChange={this.handleChange} />
            </>
        )
    }
}