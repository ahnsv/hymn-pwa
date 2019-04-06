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
export interface AvailableMoves {
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
    if (typeof children !== 'object' && !Array.isArray(children)) {
      sub.push(true)
    }
    (children! as any[]).forEach(c => {
      if (typeof c !== 'object') return;
      if (c.props.children) {
        if (c.type.name === 'HymnCarpetRow') {
          sub.push(deepScanChildren(c.props.children).flat(3))
          return
        }
        sub.push(deepScanChildren(c.props.children))
        return
      }
      sub.push(true)
    })
    res.push(sub)
    break
  }
  return res.flat(1)
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
      totalCoords: this._getTotalCoords,
      carpetChildrenCheck: deepScanChildren(props.children)
    };
    this._SWIPER = this.bindSwiper(document.querySelector(
      "html"
    ) as HTMLElement);
    this.handleSwipe = this.handleSwipe.bind(this)
    this.currItemAvailMoves = this.currItemAvailMoves.bind(this)
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
    switch (dir) {
      case 'up':
        if (!this.state.carpetChildrenCheck[coordY - 1][coordX]) break;
        this.setState({
          currentCoord: [coordX, coordY - 1]
        })
        break;
      case 'right':
        if (!this.state.carpetChildrenCheck[coordY][coordX - 1]) break;
        this.setState({
          currentCoord: [coordX - 1, coordY]
        })
      case 'left':
        if (!this.state.carpetChildrenCheck[coordY][coordX + 1]) break;
        this.setState({
          currentCoord: [coordX + 1, coordY]
        })
      case 'down':
        if (!this.state.carpetChildrenCheck[coordY + 1][coordX]) break;
        this.setState(
          {
            currentCoord: [coordX, coordY + 1]
          }
        )
      default:
        break;
    }
  };

  componentDidUpdate() {
    console.log(this.state.currentCoord + ' is now active')
  }

  currItemAvailMoves = (coordX: number, coordY: number) => {
    const carpetChildrenCheck = this.state.carpetChildrenCheck
    const checkAvailabilty = (coordX: number, coordY: number) => {
      if (carpetChildrenCheck[coordX] === undefined || carpetChildrenCheck[coordX][coordY] === undefined) {
        return false
      }
      return true
    }
    return [checkAvailabilty(coordY, coordX - 1), checkAvailabilty(coordY, coordX + 1), checkAvailabilty(coordY - 1, coordX), checkAvailabilty(coordY + 1, coordX)]
  }

  render() {
    const childrenWithProps = React.Children.map(
      this.props.children,
      (c, index) => {
        return React.cloneElement(c as React.ReactElement, {
          coordX: 0,
          coordY: index,
          currentActive: this.state.currentCoord,
          currItemAvailMoves: this.currItemAvailMoves,
          currentItemAvailMoves: this.currItemAvailMoves(0, index)
        });
      }
    );
    return (
      <div className="hymn-carpet" onTouchEnd={this.passDirection}>
        {childrenWithProps}
      </div>
    );
  }
}
