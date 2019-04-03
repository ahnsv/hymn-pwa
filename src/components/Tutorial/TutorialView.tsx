import React from 'react'
import { RouteChildrenProps } from 'react-router';
import { HymnForm, HymnInput } from '../UI/Forms'
import { HymnFormValidationRule } from '../UI/Forms/HymnForm';

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
        const validationRules: HymnFormValidationRule[] = [
            {colName: 'hello', apply: [(v: any) => {
                return v.length > 3
            }]},
            {colName: 'hello_1', apply: [(v: any) => {
                return v.length > 3
            }]}
        ]
        return (
            <div className="hymn-tutorial">
                <HymnForm getFormData={this.handleFormData} validationRules={validationRules}>
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