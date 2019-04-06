import React from "react";
import { HymnCarpetChildrenProps, AvailableMoves } from "./HymnCarpet";
import { CSSTransition } from "react-transition-group";
import "./css/HymnCarpetItem.css";

interface CarpetItemProps extends HymnCarpetChildrenProps {
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
  const arrowByDirection = (dir: string, key: number) => {
    switch (dir) {
      case "left":
        return (
          <div key={key} className="arrow left">
            <i className="fas fa-angle-left" />
          </div>
        );
      case "right":
        return (
          <div key={key} className="arrow right">
            <i className="fas fa-angle-right" />
          </div>
        );
      case "up":
        return (
          <div key={key} className="arrow up">
            <i className="fas fa-angle-up" />
          </div>
        );
      case "down":
        return (
          <div key={key} className="arrow down">
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
              return arrowByDirection("left", i);
            case 1:
              return arrowByDirection("right", i);
            case 2:
              return arrowByDirection("up", i);
            case 3:
              return arrowByDirection("down", i);
          }
        })}
      </div>
    </CSSTransition>
  );
};

export default CarpetItem;
