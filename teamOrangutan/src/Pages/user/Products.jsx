import { Box, Button, Modal } from "@mui/material";
import CustomTypography from "../../Components/user/CustomTypography";
import SelectOrdenar from "../../Components/user/SelectOrdenar";
import ImageListProduct from "../../Components/user/Home/ImageListProduct";
import useModal from "../../hooks/useModal";
import ModalAgregarProducto from "../../Components/user/Products/ModalAgregarProducto";
import { useState } from "react";
import Navbar from "../../Components/user/Navbar/Navbar";
import Footer from "../../Components/user/Footer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
  width: { xs: "90%", sm: 600, md: 750, lg: 850 },
};

export const Products = () => {
  const { open, handleClose, handleOpen } = useModal();
  const [order, setorder] = useState("");
  const [filtroNombre, setFiltroNombre] = useState(""); // <--- nuevo estado

  return (
    <>
      <Navbar />

      {/* Título */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: { xs: 8, sm: 10 },
          px: 2,
        }}
      >
        <CustomTypography text="TODOS LOS PRODUCTOS" />
      </Box>

      {/* Filtros (ordenar, etc.) */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "flex-start" },
          alignItems: { xs: "center", sm: "flex-start" },
          mt: 2,
          px: { xs: 2, sm: 10, md: 12 },
          gap: 2,
        }}
      >
        <SelectOrdenar
          order={order}
          setorder={setorder}
          filtroNombre={filtroNombre}
          setFiltroNombre={setFiltroNombre}
        />
        {/* Botón para agregar productos si lo activas */}
        {/* <Button
          variant="contained"
          sx={{ height: 40, mt: { xs: 0, sm: 2 }, backgroundColor: "black" }}
          onClick={handleOpen}
        >
          Agregar
        </Button> */}
      </Box>

      {/* Lista de productos */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, px: 2 }}>
        <ImageListProduct order={order} filtroNombre={filtroNombre} />
      </Box>

      {/* Modal */}
      <ModalAgregarProducto
        style={style}
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />

      <Footer />
    </>
  );
};

export default Products;
