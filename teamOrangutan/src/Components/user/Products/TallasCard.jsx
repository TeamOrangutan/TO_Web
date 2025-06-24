import { Box, Chip, Paper, Typography } from "@mui/material";
import React from "react";

export const TallasCard = ({ talla, selectedSize, setSelectedSize, showAlwaysStock = false }) => {
  const isSelected = selectedSize === talla.name;
  const isOutOfStock = talla.stock === 0;

  return (
    <Paper
      onClick={() => {
        if (!showAlwaysStock && isOutOfStock) {
          return;
        } else if (isSelected) {
          setSelectedSize(null);
        } else {
          setSelectedSize(talla.name);
        }
      }}
      elevation={isSelected ? 4 : 1}
      sx={{
        p: 1,
        borderRadius: 2,
        cursor: "pointer",
        backgroundColor: isSelected ? "#ccccccef" : "#fff",
        position: "relative",
        textAlign: "center",
        opacity: !showAlwaysStock && isOutOfStock ? 0.5 : 1,
        width: "100%",
        maxWidth: 100,
        minWidth: 70,
        height: "auto",
        flexShrink: 0,
      }}
    >
      <Typography fontWeight="bold" fontSize={14}>
        {talla.name}
      </Typography>

      <Box mt={0.5}>
        <Chip
          label={`Stock: ${talla.stock}`}
          size="small"
          color={talla.stock > 0 ? "primary" : "default"}
          variant="outlined"
          sx={{ fontSize: "0.7rem", maxWidth: "100%" }}
        />
      </Box>
    </Paper>
  );
};

export default TallasCard;