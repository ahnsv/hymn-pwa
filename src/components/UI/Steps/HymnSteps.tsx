import React, { ReactElement, ReactNode } from "react";
import Swipe from "react-swipe";
import "./css/HymnSteps.css";

interface StepsProps {
  children: ReactNode;
}
interface StepsState {
  currentStep: number;
  stepsCount: number;
}
export default class Steps extends React.Component<StepsProps, StepsState> {
  constructor(props: StepsProps) {
    super(props);
    this.state = {
      currentStep: 0,
      stepsCount: (this.props.children as any[]).length - 1
    };
  }
  prev = () => {
    this.setState({
      currentStep: this.state.currentStep - 1
    });
  };

  next = () => {
    this.setState({
      currentStep: this.state.currentStep + 1
    });
  };

  render() {
    const stepChildren = React.Children.map(
      this.props.children,
      (child, index) => {
        const { currentStep, stepsCount } = this.state;
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isActive: index === currentStep,
            displayPrevious: currentStep > 0,
            displayNext: currentStep < stepsCount,
            displaySubmit: currentStep === stepsCount,
            prev: () => this.prev(),
            next: () => this.next()
          });
        }
      }
    );
    return (
      <div className="hymn-steps">
        {stepChildren}
      </div>
    );
  }
}
