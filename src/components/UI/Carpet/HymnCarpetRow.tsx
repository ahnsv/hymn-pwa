import React, { ReactNode } from "react";
import { HymnCarpetChildrenProps } from "./HymnCarpet";
import { CSSTransition } from "react-transition-group";

type HymnCarpetRowProps = HymnCarpetChildrenProps;
interface HymnCarpetRowState {
  currentIndex: number;
  length: number;
}
export default class HymnCarpetRow extends React.Component<
  HymnCarpetRowProps,
  HymnCarpetRowState
> {
  constructor(props: HymnCarpetRowProps) {
    super(props);
    this.state = {
      currentIndex: 0,
      length: (this.props.children as any[]).length
    };
  }
  render() {
    const childrenWithProps = React.Children.map(
      this.props.children,
      (c, index) => {
        return React.cloneElement(c as React.ReactElement, {
          coordX: index,
          coordY: this.props.coordY
        });
      }
    );
    return (
      <CSSTransition timeout={300} classNames="hymn-carpet-row-ts">
        <div className="hymn-carpet-row">{childrenWithProps}</div>;
      </CSSTransition>
    );
  }
}
