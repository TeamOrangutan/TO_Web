import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const QuantitySelect = ({ quantity, increase, decrease }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "4px",
        overflow: "hidden",
        width: "fit-content",
        mt: 1,
      }}
    >
      <IconButton
        onClick={decrease}
        sx={{ borderRight: "1px solid #ccc", borderRadius: 0 }}
      >
        <RemoveIcon />
      </IconButton>

      <Typography
        sx={{
          px: 2,
          minWidth: "30px",
          textAlign: "center",
        }}
      >
        {quantity}
      </Typography>

      <IconButton
        onClick={increase}
        sx={{ borderLeft: "1px solid #ccc", borderRadius: 0 }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default QuantitySelect;
