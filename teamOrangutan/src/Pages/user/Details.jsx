import { Box } from "@mui/material";
import CustomTypography from "../../Components/user/CustomTypography";
import FormActualizarProduct from "../../Components/user/Products/FormActualizarProduct";
import Navbar from "../../Components/user/Navbar/Navbar";
import useProductById from "../../hooks/useProductById";

import DetailsProduct from "../../Components/user/Products/DetailsProduct";
export const Details = () => {
  const { product, loading, error } = useProductById();

  return (
    <>
      <Navbar />

      <Box
        sx={{
          flexGrow: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 8,
          padding: 0,
          height: 0,
        }}
      ></Box>
      <DetailsProduct product={product} />
    </>
  );
};

export default Details;
