import React, { ReactElement } from 'react'

interface StepsState {
    currentStep: number
    stepsCount: number
}
export default class Steps extends React.Component<{ children: React.ReactNode }, StepsState> {
    constructor(props: { children: React.ReactNode }) {
        super(props)
        this.state = {
            currentStep: 0,
            stepsCount: (this.props.children as any[]).length - 1
        }
    }
    prev = () => {
        this.setState({
            currentStep: this.state.currentStep - 1
        })
    }

    next = () => {
        this.setState({
            currentStep: this.state.currentStep + 1
        })
    }

    render() {
        const children = React.Children.map(this.props.children, (child, index) => {
            const { currentStep, stepsCount } = this.state
            return React.cloneElement(child as ReactElement, {
                isActive: index === currentStep,
                displayPrevious: currentStep > 0,
                displayNext: currentStep < stepsCount,
                displaySubmit: currentStep === stepsCount,
                prev: () => this.prev(),
                next: () => this.next(),
            })
        })
        return children
    }
}