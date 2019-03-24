import React from 'react'

interface HymnFormProps {}
interface HymnFormState {}

export default class HymnForm extends React.Component<HymnFormProps, HymnFormState> {
    handleSubmit(e: Event) {
        e.preventDefault()
        console.log(e)
    }
    render() {
        return (
            <form className="hymn-form" onSubmit={() => this.handleSubmit}>
                {this.props.children}
            </form>
        )
    }    
}