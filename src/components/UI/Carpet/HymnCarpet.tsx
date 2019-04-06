import React from "react";
import { Swiper } from "../../../utils";
import { TransitionGroup } from "react-transition-group";

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
interface AvailableMoves {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
}
interface HymnCarpetProps {
  mode?: Mode;
  width?: number;
  height?: number;
  children?: React.ReactNode
}
interface HymnCarpetState {
  currentCoord: [number, number];
  totalCoords: [number, number];
  carpetChildrenCheck: boolean[][];
}

const deepScanChildren = (children: React.ReactNode) => {
  let res = []
  while (true) {
    let sub: any[] = []
    if (typeof children !== 'object' || !Array.isArray(children)) {
      // check in different way
      if (typeof (children! as React.ReactElement).type === 'symbol') {
        continue
      }
      else {
        sub.push(true)
      }
    }
    (children! as any[]).forEach(c => {
      if (typeof c !== 'object') return;
      if (c.props.children) {
        sub.push(deepScanChildren(c.props.children))
        return
      }
      sub.push(true)
    })
    res.push(sub)
    break
  }
  return res
}

export default class HymnCarpet extends React.Component<
  HymnCarpetProps,
  HymnCarpetState
  > {
  _SWIPER: Swiper;
  constructor(props: HymnCarpetProps) {
    super(props);
    console.log(deepScanChildren(props.children))
    this.state = {
      currentCoord: [0, 0],
      totalCoords: this._getTotalCoords,
      carpetChildrenCheck: [[]]
    };
    this._SWIPER = this.bindSwiper(document.querySelector(
      "html"
    ) as HTMLElement);
    this.handleSwipe = this.handleSwipe.bind(this)
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
    if (coordX >= this.state.totalCoords[0] && coordY >= this.state.totalCoords[1]) return;
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
    mapper[dir]();
  };

  componentDidUpdate() {
    console.log(this.state.currentCoord + ' is now active')
  }

  render() {
    // TODO: make classname for active work
    const childrenWithProps = React.Children.map(
      this.props.children,
      (c, index) => {
        if (index === Math.abs(this.state.currentCoord[0])) {
          return React.cloneElement(c as React.ReactElement, {
            ...(c as React.ReactElement).props,
            // className: `active`,
            coordX: 0,
            coordY: index,
          });
        }
        return React.cloneElement(c as React.ReactElement, {
          coordX: 0,
          coordY: index
        });
      }
    );
    return (
      <div className="hymn-carpet" onTouchEnd={this.passDirection}>
        <TransitionGroup className="hymn-carpet-transition-group">{childrenWithProps}</TransitionGroup>
      </div>
    );
  }
}
