import React, { useState } from "react";
import { Box } from "@mui/material";

const ProductItem = ({ item, width = 64, height = 64 }) => {
const originalPath = item.path;
const hoverPath = item.hoverPath || item.path;


  const [src, setSrc] = useState(originalPath);

  return (
    <Box
      component="img"
      src={src}
      alt={item.name}
      onMouseEnter={() => setSrc(hoverPath)}
      onMouseLeave={() => setSrc(originalPath)}
      sx={{
        width,
        height,
        borderRadius: 2,
        objectFit: "cover",
        mr: 2,
        transition: "0.3s ease-in-out",
        border: "1px solid rgb(221, 219, 219) "
      }}
    />
  );
};

export default ProductItem;
