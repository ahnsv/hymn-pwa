import React from 'react'

interface HymnFormProps {}
interface HymnFormState<T> {
    formData: T
}

export default class HymnForm<T> extends React.Component<HymnFormProps, HymnFormState<T>> {
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