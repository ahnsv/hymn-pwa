import React from "react";
import { HymnCarpetChildrenProps, AvailableMoves } from "./HymnCarpet";
import { CSSTransition } from "react-transition-group";
import "./css/HymnCarpetItem.css";

interface CarpetItemProps extends HymnCarpetChildrenProps {
  changeCurrentCoord?: (x: number, y: number) => void;
  coordX?: number;
  coordY?: number;
  className?: string;
  currentItemAvailMoves?: AvailableMoves;
  children: React.ReactNode;
  currentActive?: number[];
}

const CarpetItem = ({ ...props }: CarpetItemProps) => {
  const active = (currentActive: any) => {
    if (currentActive === undefined) return "";
    return props.currentActive!.toString() ==
      [props.coordX, props.coordY].toString()
      ? "active"
      : "";
  };
  const dirs = Object.keys(props.currentItemAvailMoves!).map((k, i) => {
    if (props.currentItemAvailMoves![i]) {
      return i;
    }
    return;
  });
  const arrowByDirection = (dir: string, key: number, props: CarpetItemProps) => {
    const {coordX, coordY} = props
    switch (dir) {
      case "left":
        return (
          <div key={key} className="arrow left" onClick={() => props.changeCurrentCoord!(coordX!+1, coordY!)}>
            <i className="fas fa-angle-left" />
          </div>
        );
      case "right":
        return (
          <div key={key} className="arrow right" onClick={() => props.changeCurrentCoord!(coordX!-1, coordY!)}>
            <i className="fas fa-angle-right" />
          </div>
        );
      case "up":
        return (
          <div key={key} className="arrow up" onClick={() => props.changeCurrentCoord!(coordX!, coordY!+1)}>
            <i className="fas fa-angle-up" />
          </div>
        );
      case "down":
        return (
          <div key={key} className="arrow down" onClick={() => props.changeCurrentCoord!(coordX!, coordY!-1)}>
            <i className="fas fa-angle-down" />
          </div>
        );
      default:
        break;
    }
  };
  return (
    <CSSTransition timeout={300} classNames="hymn-carpet-item-ts">
      <div className={`hymn-carpet-item ${active(props.currentActive)}`}>
        {props.children}
        {dirs.map((d, i) => {
          switch (d) {
            case 0:
              return arrowByDirection("left", i, props);
            case 1:
              return arrowByDirection("right", i, props);
            case 2:
              return arrowByDirection("up", i, props);
            case 3:
              return arrowByDirection("down", i, props);
          }
        })}
      </div>
    </CSSTransition>
  );
};

export default CarpetItem;
