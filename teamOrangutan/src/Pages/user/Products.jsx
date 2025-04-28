import { Box, Button, Modal} from "@mui/material";
import CustomTypography from "../../Components/user/CustomTypography";
import SelectOrdenar from "../../Components/user/SelectOrdenar";
import ImageListProduct from "../../Components/user/Home/ImageListProduct";
import useModal from "../../hooks/useModal";
import ModalAgregarProducto from "../../Components/user/Products/ModalAgregarProducto";
import { useState } from "react";
import Navbar from "../../Components/user/Navbar/Navbar";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 2,
  p: 4,
  width: 850,
};

export const Products = () => {
  const { open, handleClose, handleOpen } = useModal();
  const [order, setorder] = useState("");

  return (
    <>
      <Navbar />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CustomTypography text="TODOS LOS PRODUCTOS" />
      </Box>

      <Box
        sx={{ flex: 1, display: "flex", justifyContent: "flex-start", ml: 28 }}
      >
        <SelectOrdenar order={order} setorder={setorder} />
        <Button
          variant="contained"
          sx={{ height: 40, mt: 2, ml: 4, backgroundColor: "black" }}
          onClick={handleOpen}
        >
          Agregar
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 0 ,   }}>
        <ImageListProduct order={order} />
      </Box>
        <ModalAgregarProducto style={style} open={open} handleClose={handleClose} handleOpen={handleOpen}/>
      
    </>
  );
};

export default Products;
