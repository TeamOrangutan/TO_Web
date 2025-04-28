import { Box } from "@mui/material";
import CustomTypography from "../../Components/user/CustomTypography";
import FormActualizarProduct from "../../Components/user/Products/FormActualizarProduct";
import Navbar from "../../Components/user/Navbar/Navbar";
import useProductById from "../../hooks/useProductById";

export const ActualizarProduct = () => {
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
          mt: 15,
          padding: 0,
          height: 0,
        }}
      >
        <CustomTypography text="ACTUALIZAR PRODUCTO" />
      </Box>
      <FormActualizarProduct product={product} />
    </>
  );
};

export default ActualizarProduct;
