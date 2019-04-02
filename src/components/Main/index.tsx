import React, { useState } from "react";
import { HymnCarpet, HymnCarpetItem } from "../UI/Carpet";
import "./index.css";

export const Carpets = () => {
  const [] = useState(false);
  return (
    <div>
      <HymnCarpet>
        <HymnCarpetItem>Hi</HymnCarpetItem>
        <HymnCarpetItem>Hi</HymnCarpetItem>
        <HymnCarpetItem>Hi</HymnCarpetItem>
      </HymnCarpet>
    </div>
  );
};
