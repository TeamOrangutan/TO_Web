import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import ImageListProduct from "./ImageListProduct";
import CustomTypography from "../../../Components/user/CustomTypography";

export const ExplorarColeccion = () => {

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          px: { xs: 2, sm: 4 },
          textAlign: "center",
        }}
      >
        <CustomTypography text={"EXPLORAR COLECCIÓN"} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
          height: { xs: "auto", md: 800 }, // altura solo en desktop
          px: { xs: 2, sm: 4 },
          flexWrap: "wrap", // en caso de que ImageList tenga múltiples columnas
        }}
      >
        <ImageListProduct />
      </Box>
    </>
  );
};

export default ExplorarColeccion;
