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
type MoveObject = {
  [key: string]: boolean
}
export interface AvailableMoves extends MoveObject {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
}
interface HymnCarpetProps {
  mode?: Mode;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}
interface HymnCarpetState {
  currentCoord: [number, number];
  totalCoords: [number, number];
  carpetChildrenCheck: boolean[][][];
}
function flattenDeep(arr1: any[]): any[] {
  return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}
const deepScanChildren = (children: React.ReactNode) => {
  const res = [];
  while (true) {
    const sub: any[] = [];
    if (typeof children !== "object" && !Array.isArray(children)) {
      sub.push(true);
    }
    (children! as any[]).forEach(c => {
      if (typeof c !== "object") return;
      if (c.props.children) {
        if (c.type.name === "HymnCarpetRow") {
          sub.push(flattenDeep(deepScanChildren(c.props.children)));
          return;
        }
        sub.push(flattenDeep(deepScanChildren(c.props.children)));
        return;
      }
      sub.push(true);
    });
    res.push(sub);
    break;
  }
  return res;
};

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
    this.handleSwipe = this.handleSwipe.bind(this);
    this.currItemAvailMoves = this.currItemAvailMoves.bind(this);
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
        const r = v.length;
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
    this.handleSwipe(this._SWIPER.calc());
  };

  handleSwipe = (dir: string) => {
    let [coordX, coordY] = this.state.currentCoord;
    if (
      coordX >= this.state.totalCoords[0] ||
      coordY >= this.state.totalCoords[1]
    )
      return;
    switch (dir) {
      /**
       * Visually going up, swipe down
       */
      case "down":
        if (coordY - 1 < 0 || !this.state.carpetChildrenCheck[0][coordY-1][coordX]) break;
        this.setState({
          currentCoord: [coordX, coordY - 1]
        });
        break;
      /**
       * Visually going right, swipe left
       */
      case "left":
        if (coordX + 1 >= this.state.totalCoords[0] || coordX + 1 < 0 || !this.state.carpetChildrenCheck[0][coordY][coordX+1]) break;
        this.setState({
          currentCoord: [coordX + 1, coordY]
        });
        break;
      case "right":
        if (coordX - 1 >= this.state.totalCoords[0] || coordX - 1 < 0 || !this.state.carpetChildrenCheck[0][coordY][coordX-1]) break;
        this.setState({
          currentCoord: [coordX - 1, coordY]
        });
        break;
      /**
       * Visually going down, swipe up
       */
      case "up":
        if (coordY + 1 >= this.state.totalCoords[1] || !this.state.carpetChildrenCheck[0][coordY+1][coordX]) break;
        this.setState({
          currentCoord: [coordX, coordY + 1]  
        });
        break;
      default:
        break;
    }
  };

  componentDidUpdate() {
    console.log(this.state.currentCoord + " is now active");
  }

  changeCurrentCoord = (coordX: number, coordY: number) => {
    this.setState({
      currentCoord: [coordX, coordY]
    })
  }

  currItemAvailMoves = (coordX: number, coordY: number) => {
    const carpetChildrenCheck = this.state.carpetChildrenCheck;
    const checkAvailabilty = (coordX: number, coordY: number) => {
      if (
        carpetChildrenCheck[0][coordX] === undefined ||
        carpetChildrenCheck[0][coordX][coordY] === undefined
      ) {
        return false;
      }
      return true;
    };
    return [
      checkAvailabilty(coordY, coordX - 1),
      checkAvailabilty(coordY, coordX + 1),
      checkAvailabilty(coordY - 1, coordX),
      checkAvailabilty(coordY + 1, coordX)
    ];
  };

  render() {
    const childrenWithProps = React.Children.map(
      this.props.children,
      (c, index) => {
        return React.cloneElement(c as React.ReactElement, {
          changeCurrentCoords: this.handleSwipe,
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
        <TransitionGroup>{childrenWithProps}</TransitionGroup>
      </div>
    );
  }
}
