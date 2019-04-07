import React from "react";
import { HymnCarpetChildrenProps, AvailableMoves } from "./HymnCarpet";
import { CSSTransition } from "react-transition-group";
import "./css/HymnCarpetItem.css";

interface CarpetItemProps extends HymnCarpetChildrenProps {
  changeCurrentCoords?: (dir: string) => void;
  coordX?: number;
  coordY?: number;
  className?: string;
  currentItemAvailMoves?: AvailableMoves;
  children: React.ReactNode;
  currentActive?: number[];
}

export default class CarpetItem extends React.Component<CarpetItemProps, {}>{
  constructor(props: CarpetItemProps) {
    super(props)
    this.arrowByDirection = this.arrowByDirection.bind(this)
  }
  active =  (currentActive: any) => {
    if (currentActive === undefined) return "";
    return this.props.currentActive!.toString() ==
      [this.props.coordX, this.props.coordY].toString()
      ? "active"
      : "";
  };
  dirs = Object.keys(this.props.currentItemAvailMoves!).map((k, i) => {
    if (this.props.currentItemAvailMoves![i]) {
      return i;
    }
    return;
  });
  handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const handleSwipe = this.props.changeCurrentCoords!
    const dir = e.currentTarget.className.split('arrow ')[1]
    switch (dir) {
      case "down":
        handleSwipe("up")
        break;
      case "up":
        handleSwipe("down")
        break;
      case "left":
        handleSwipe("right")
        break;
      case "right":
        handleSwipe("left")
        break;
      default:
        break;
    }
  }
  arrowByDirection = (dir: string, key: number) => {
    switch (dir) {
      case "left":
        return (
          <div key={key} className="arrow left" onClick={this.handleClick.bind(this)}>
            <i className="fas fa-angle-left" />
          </div>
        );
      case "right":
        return (
          <div key={key} className="arrow right" onClick={this.handleClick.bind(this)}>
            <i className="fas fa-angle-right" />
          </div>
        );
      case "up":
        return (  
          <div key={key} className="arrow up" onClick={this.handleClick.bind(this)}>
            <i className="fas fa-angle-up" />
          </div>
        );
      case "down":
        return (
          <div key={key} className="arrow down" onClick={this.handleClick.bind(this)}>
            <i className="fas fa-angle-down" />
          </div>
        );
      default:
        break;
    }
  };
  render() {
    return (
      <CSSTransition timeout={300} classNames="hymn-carpet-item-ts">
        <div className={`hymn-carpet-item ${this.active(this.props.currentActive)}`}>
          {this.props.children}
          {this.dirs.map((d, i) => {
            switch (d) {
              case 0:
                return this.arrowByDirection("left", i);
              case 1:
                return this.arrowByDirection("right", i);
              case 2:
                return this.arrowByDirection("up", i);
              case 3:
                return this.arrowByDirection("down", i);
            }
          })}
        </div>
      </CSSTransition>
    );
  }
};

