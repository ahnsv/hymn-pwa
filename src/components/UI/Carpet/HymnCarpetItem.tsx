import React from "react";

interface CarpetItemProps {
  coordX?: number;
  coordY?: number;
  swipeable?: boolean;
  showButtons?: boolean;
  children: React.ReactNode;
}

const CarpetItem = ({ ...props }: CarpetItemProps) => {
  return (
    <div className="hymn-carpet-item">
      CoordX: {props.coordX}
      CoordY: {props.coordY}
      {props.children}
    </div>
  );
};

export default CarpetItem
