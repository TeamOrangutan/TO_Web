import { Box, Chip, Paper, Typography } from "@mui/material";
import React from "react";

export const TallasCard = ({talla, selectedSize, setSelectedSize}) => {
  const isSelected = talla.cantidad > 0;
  const isOutOfStock = talla.stock === 0;

  return (
  <Paper
    onClick={() => {
      if (isOutOfStock) {
        return;
      } else if (selectedSize === talla.name) {
        setSelectedSize(null);
      } else {
        setSelectedSize(talla.name);
      }
    }}
    elevation={isSelected ? 4 : 1}
    sx={{
      p: 1,
      borderRadius: 2,
      cursor: 'pointer',
      backgroundColor: selectedSize === talla.name ? "#ccccccef" : "#fff",
      position: "relative",
      textAlign: "center",
      opacity: isOutOfStock ? 0.5 : 1,
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
      {isOutOfStock ? (
        <Chip
          label="Agotado"
          size="small"
          color="default"
          sx={{ fontSize: "0.7rem", maxWidth: "100%" }}
        />
      ) : (
        <Chip
          label={`${talla.stock} en stock`}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ fontSize: "0.7rem", maxWidth: "100%" }}
        />
      )}
    </Box>

    {isSelected && (
      <CheckIcon
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          color: "black",
          fontSize: 18,
        }}
      />
    )}
  </Paper>
);

};

export default TallasCard;
