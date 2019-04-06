import React from "react";
import { HymnCarpetChildrenProps, AvailableMoves } from "./HymnCarpet";
import { CSSTransition } from "react-transition-group";
import './css/HymnCarpetItem.css'

interface CarpetItemProps extends HymnCarpetChildrenProps {
  coordX?: number;
  coordY?: number
  className?: string
  currentItemAvailMoves?: AvailableMoves
  children: React.ReactNode;
  currentActive?: number[]
}

const CarpetItem = ({ ...props }: CarpetItemProps) => {
  const active = (currentActive: any) => {
    if (currentActive === undefined) return ''
    return (props.currentActive!.toString() == [props.coordX, props.coordY].toString()) ? 'active' : ''
  }
  return (
    <CSSTransition timeout={300} classNames="hymn-carpet-item-ts">
      <div className={`hymn-carpet-item ${active(props.currentActive)}`}>
        {props.children}
      </div>
    </CSSTransition>
  );
};

export default CarpetItem;
