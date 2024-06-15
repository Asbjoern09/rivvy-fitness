import React from "react";
import Stack from "@mui/material/Stack";
import CountingChip from "./CountingChip";

export default function ClickableChips() {
  return (
    <Stack direction="row" spacing={1} sx={{ my: 0 }}>
      <CountingChip />
      <CountingChip />
      <CountingChip />
      <CountingChip />
      <CountingChip />
    </Stack>
  );
}
