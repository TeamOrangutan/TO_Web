import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import ImageListProduct from "./ImageListProduct";
import CustomTypography from "../CustomTypography";

export const ExplorarColeccion = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <CustomTypography text={"EXPLORAR COLECCION"} />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", height: 900, mt: 3 }}
      >
        <ImageListProduct />
      </Box>
    </>
  );
};

export default ExplorarColeccion;
