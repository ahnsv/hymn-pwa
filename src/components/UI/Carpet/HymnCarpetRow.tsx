import React, { ReactNode } from "react";

interface HymnCarpetRowProps {
  swipeable?: boolean;
  showButtons?: boolean;
}
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
    return <div className="hymn-carpet-row">{this.props.children}</div>;
  }
}
