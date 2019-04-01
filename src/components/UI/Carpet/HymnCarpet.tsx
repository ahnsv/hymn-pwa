import React from "react";
import { Swiper } from "../../../utils";
import { TransitionGroup } from "react-transition-group";

/**
 * Hypothesis 1: four way navigation UI - DONE
 * Hypothesis 2: slot feature - DONE
 * Hypothesis 3: component import - DONE
 * TODO: implement layout, navigation, indicator
 */
type Mode = "carousel" | "default";
interface SwipeMapper {
  [key: string]: () => void;
}
export interface HymnCarpetChildrenProps {
  coordX?: number;
  coordY?: number;
  swipeable?: boolean;
  showButtons?: boolean;
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
      totalCoords: this._getTotalCoords
    };
    this._SWIPER = this.bindSwiper(document.querySelector(
      "html"
    ) as HTMLElement);
  }

  get _getTotalCoords(): [number, number] {
    let maxX = 0;
    const children = this.props.children as any[];
    // when children is one
    if (children.length === undefined) {
      return [0, 0];
    }
    children
      .filter(c => c.type.name === "HymnCarpetRow")
      .forEach(v => {
        const r = v.props.children.length;
        if (maxX < r) maxX = r;
      });
    return [maxX, children.length];
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
    this.handleSwipe(this._SWIPER.detectDirection(this._SWIPER._swiperObject));
  };

  handleSwipe = (dir: string) => {
    let [coordX, coordY] = this.state.currentCoord;
    const mapper: SwipeMapper = {
      down: () =>
        this.setState({
          currentCoord: [coordX, --coordY]
        }),
      left: () =>
        this.setState({
          currentCoord: [--coordX, coordY]
        }),
      right: () =>
        this.setState({
          currentCoord: [++coordX, coordY]
        }),
      up: () =>
        this.setState({
          currentCoord: [coordX, ++coordY]
        })
    };
    // BUG: WHEN SWIPE MULTIPLE TIMES, THERES AN ERROR
    mapper[dir]();
  };

  render() {
    // TODO: get children and parse them into arrays
    const childrenWithProps = React.Children.map(
      this.props.children,
      (c, index) => {
        return React.cloneElement(c as React.ReactElement, {
          coordX: 0,
          coordY: index
        });
      }
    );
    return (
      <div className="hymn-carpet" onTouchEnd={this.passDirection}>
        Carpet
        <TransitionGroup className="hymn-carpet-transition-group">{childrenWithProps}</TransitionGroup>
      </div>
    );
  }
}
