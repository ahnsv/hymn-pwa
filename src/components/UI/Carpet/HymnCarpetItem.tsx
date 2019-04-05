import React from "react";
import { HymnCarpetChildrenProps } from "./HymnCarpet";
import { CSSTransition } from "react-transition-group";
import './css/HymnCarpetItem.css'

interface CarpetItemProps extends HymnCarpetChildrenProps {
  className?: string
  children: React.ReactNode;
}

const CarpetItem = ({ ...props }: CarpetItemProps) => {
  return (
    <CSSTransition timeout={300} classNames="hymn-carpet-item-ts">
      <div className="hymn-carpet-item">
        {props.children}
      </div>
    </CSSTransition>
  );
};

export default CarpetItem;
