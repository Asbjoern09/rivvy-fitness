import React, { useState } from "react";
import Chip from "@mui/material/Chip";

export default function CountingChip() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(clickCount + 1);
    console.info("You clicked the Chip. Total clicks:", clickCount + 1);
  };

  return (
    <Chip
      label={clickCount}
      variant="outlined"
      onClick={handleClick}
      sx={{ my: 1, fontSize: "2rem" }}
    />
  );
}
