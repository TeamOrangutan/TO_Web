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
        p: 2,
        borderRadius: 2,

        backgroundColor: selectedSize == talla.name ? "#ccccccef" : "#fff",
        position: "relative",
        textAlign: "center",
        opacity: isOutOfStock ? 0.5 : 1,
        width: 90,
        height: 40,
      }}
    >
      <Typography fontWeight="bold">{talla.name}</Typography>

      <Box>
        {isOutOfStock ? (
          <Chip label="Agotado" size="small" color="default" />
        ) : (
          <Chip
            label={`${talla.stock} en stock`}
            size="small"
            color="primary"
            variant="outlined"
          />
        )}
      </Box>

      {isSelected && (
        <CheckIcon
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "black",
          }}
        />
      )}
    </Paper>
  );
};

export default TallasCard;
