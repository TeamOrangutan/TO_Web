import { Box } from "@mui/material";
import CustomTypography from "../Components/CustomTypography";
import { useState } from "react";
import FormActualizarProduct from "../Components/Products/FormActualizarProduct";
import Navbar from "../Components/Navbar/Navbar";

export const ActualizarProduct = () => {


  return (
    <>
      <Navbar />

      <Box
        sx={{
          flexGrow: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 15,
          padding: 0,
          height: 0,
        }}
      >
        <CustomTypography text="ACTUALIZAR PRODUCTO" />
      </Box>
      <FormActualizarProduct/>
    </>
  );
};

export default ActualizarProduct;
