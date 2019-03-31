import React, { ReactElement, ReactNode } from "react";
import Slider from "react-slick";
import "./css/HymnSteps.css";

interface StepsProps {
  children: ReactNode;
  swipeable?: boolean;
}
interface StepsState {
  currentStep: number;
  stepsCount: number;
}
interface ArrowProps {
  className?: string | undefined;
  isActive?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}
function ArrowWithValidation(props: ArrowProps) {
  if (props.isActive === false) {
    return (
      <div
        className={props.className}
        style={{ ...props.style, display: "none" }}
        onClick={props.onClick}
      />
    );
  }
  return (
    <div
      className={props.className}
      style={{ ...props.style, display: "block", background: "black" }}
      onClick={props.onClick}
    />
  );
}

export default class Steps extends React.Component<StepsProps, StepsState> {
  constructor(props: StepsProps) {
    super(props);
    this.state = {
      currentStep: 1,
      stepsCount: (this.props.children as any[]).length
    };
  }
  prev = () => {
    if (this.state.currentStep === 1) {
      return;
    }
    this.setState({
      currentStep: this.state.currentStep - 1
    });
  };

  next = () => {
    if (this.state.currentStep === this.state.stepsCount) {
      return;
    }
    this.setState({
      currentStep: this.state.currentStep + 1
    });
  };

  swipeHandler = (e: string) => {
    switch (e) {
      case "left":
        this.next();
        break;
      case "right":
        this.prev();
    }
  };

  render() {
    const sliderSettings = {
      dots: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      speed: 500,
      onSwipe: this.swipeHandler,
      infinite: false,
      swipe: this.props.swipeable === undefined ? true : this.props.swipeable,
      prevArrow: <ArrowWithValidation isActive={false} />,
      nextArrow: <ArrowWithValidation isActive={true} />,
      beforeChange: (current: number, next: number) => this.setState({ currentStep: next + 1 })
    };
    return (
      <div className="hymn-steps">
        <Slider {...sliderSettings}>{this.props.children}</Slider>
      </div>
    );
  }
}
