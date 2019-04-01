import React from "react";
import { HymnCarpetChildrenProps } from "./HymnCarpet";
import { CSSTransition } from "react-transition-group";

interface CarpetItemProps extends HymnCarpetChildrenProps {
  children: React.ReactNode;
}

const CarpetItem = ({ ...props }: CarpetItemProps) => {
  return (
    <CSSTransition timeout={300} classNames="hymn-carpet-item-ts">
      <div className="hymn-carpet-item">
        CoordX: {props.coordX}
        CoordY: {props.coordY}
        {props.children}
      </div>
    </CSSTransition>
  );
};

export default CarpetItem;
