import React, { useState } from "react";
import { Box } from "@mui/material";

const ProductItem = ({ item, width = 64, height = 64 }) => {
  const originalPath = `http://localhost:3000/api/products/file/${item.path.replace(
    "\\",
    "/"
  )}`;
  const hoverPath = item.hoverPath
    ? `http://localhost:3000/api/products/file/${item.hoverPath.replace(
        "\\",
        "/"
      )}`
    : originalPath;

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
