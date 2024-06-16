import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ClickableChips from "@/components/ClickableChip";
import TextField from "@mui/material/TextField";

const listStyle = {
  py: 0,
  width: "100%",
  maxWidth: 600, // Increase the maxWidth to fit wider content
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

const boxStyle = {
  width: "100%", // Ensure the box takes full width available
  maxWidth: 450, // Set max width to match the list width
  margin: "auto", // Center horizontally
};

const workoutTextStyle = {
  marginRight: 2,
};

export default function Workout() {
  return (
    <Box sx={boxStyle}>
      <List sx={listStyle}>
        <ListItem>
          <TextField
            id="outlined-basic"
            label="Workout type"
            variant="outlined"
            sx={workoutTextStyle}
            fullWidth // Ensure TextField takes full width available
          />
          <ClickableChips />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <TextField
            id="outlined-basic"
            label="Workout type"
            variant="outlined"
            sx={workoutTextStyle}
            fullWidth // Ensure TextField takes full width available
          />
          <ClickableChips />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <TextField
            id="outlined-basic"
            label="Workout type"
            variant="outlined"
            sx={workoutTextStyle}
            fullWidth // Ensure TextField takes full width available
          />
          <ClickableChips />
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem>
          <TextField
            id="outlined-basic"
            label="Workout type"
            variant="outlined"
            sx={workoutTextStyle}
            fullWidth // Ensure TextField takes full width available
          />
          <ClickableChips />
        </ListItem>
      </List>
    </Box>
  );
}
