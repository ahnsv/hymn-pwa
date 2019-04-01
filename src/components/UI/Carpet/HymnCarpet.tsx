import React from "react";
import { Swiper } from "../../../utils";

/**
 * Hypothesis 1: four way navigation UI - DONE
 */
type Mode = "carousel" | "default";
interface SwipeMapper {
  [key: string]: () => void;
}
interface HymnCarpetProps {
  mode?: Mode;
  width?: number;
  height?: number;
}
interface HymnCarpetState {
  currentCoord: [number, number];
  totalCoords: [number, number];
}
export default class HymnCarpet extends React.Component<
  HymnCarpetProps,
  HymnCarpetState
> {
  _SWIPER: Swiper;
  constructor(props: HymnCarpetProps) {
    super(props);
    this.state = {
      currentCoord: [0, 0],
      totalCoords: [0, 0]
    };
    this._SWIPER = this.bindSwiper(document.querySelector(
      "html"
    ) as HTMLElement);
  }

  bindSwiper(el: HTMLElement) {
    return new Swiper(el);
  }

  componentDidMount() {
    const hymnCarpet = document.querySelector(".hymn-carpet") as HTMLElement;
    this._SWIPER = this.bindSwiper(hymnCarpet);
    this._SWIPER.bindElem(hymnCarpet);
  }

  passDirection = (e: React.TouchEvent) => {
      this.handleSwipe(this._SWIPER.detectDirection(this._SWIPER._swiperObject))
  }

  handleSwipe = (dir: string) => {
    let [coordX, coordY] = this.state.currentCoord;
    const mapper: SwipeMapper = {
      down: () => this.setState({
        currentCoord: [coordX, --coordY]
      }),
      left: () => this.setState({
        currentCoord: [--coordX, coordY]
      }),
      right: () => this.setState({
        currentCoord: [++coordX, coordY]
      }),
      up: () => this.setState({
        currentCoord: [coordX, ++coordY]
      })
    };
    mapper[dir]();
  };

  render() {
    // TODO: get children and parse them into arrays
    // const childrenWithProps = React.Children.map(this.props.children, c =>
    //   React.cloneElement(c as React.ReactElement, {})
    // );
    return (
      <div className="hymn-carpet" onTouchEnd={this.passDirection}>
        Carpet
        {this.props.children}
      </div>
    );
  }
}
