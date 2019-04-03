import React from 'react'
import { RouteChildrenProps } from 'react-router';
import { HymnForm, HymnInput } from '../UI/Forms'

interface TutorialViewState {
    formData: {
        formName: string
        formValues: any | any[]
    }
}
class TutorialView extends React.Component<{}, TutorialViewState> {
    constructor(props: any) {
        super(props)
        this.handleFormData = this.handleFormData.bind(this)
    }
    handleFormData = (f: string, values: any | any[]) => {
        // assume that form should be one
        this.setState({
            formData: {
                formName: f,
                formValues: values
            }
        })
    }
    
    render() {
        return (
            <div className="hymn-tutorial">
                <HymnForm getFormData={this.handleFormData}>
                    <HymnInput<String> label="hello" type="text"></HymnInput>
                    <HymnInput<String> label="hello" type="text"></HymnInput>
                    <HymnInput<String> label="hello" type="text"></HymnInput>
                    <HymnInput<String> label="hello" type="text"></HymnInput>
                    <HymnInput<String> label="hello" type="text"></HymnInput>
                    <HymnInput<String> label="hello" type="text"></HymnInput>
                    <HymnInput<String> label="hello" type="text"></HymnInput>
                    <HymnInput<String> label="hello" type="text"></HymnInput>
                    <HymnInput<String> label="hello" type="text"></HymnInput>
                </HymnForm>
            </div>
        )
    }
}

export { TutorialView }