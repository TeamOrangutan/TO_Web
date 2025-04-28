import { Box } from "@mui/material";
import CustomTypography from "../../Components/user/CustomTypography";
import Navbar from "../../Components/user/Navbar/Navbar";
import SelectOrdenarHistorial from "../../Components/user/Home/SelectOrdenarHistorial";
import SearchInput from "../../Components/user/SearchInput";
import CardsHistorial from "../../Components/user/Record/CardsHistorial";
import TableHistorial from "../../Components/user/Record/TableHistorial";
import ModalAddInvoice from "../../Components/user/Record/ModalAddInvoice";
import {  useState } from "react";
import useModal from "../../hooks/useModal";
import useHistorialData from "../../hooks/useHistorialData";

export const Historial = () => {
  const { open, handleClose, handleOpen } = useModal();

  const { productos, facturas, ventas, order, setOrder } = useHistorialData();

  const [factura, setFactura] = useState({ productos: [] });

  const addProductToInvoice = (productosSeleccionados) => {
    setFactura((prevFactura) => ({
      ...prevFactura,
      productos: [...prevFactura.productos, ...productosSeleccionados],
    }));
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 12,
        }}
      >
        <CustomTypography text={"HISTORIAL DE VENTAS"} />
      </Box>
      <Box sx={{ flex: 1, display: "flex", ml: 28, gap: 32 }}>
        <SelectOrdenarHistorial
          order={order}
          setorder={setOrder}
          handleOpen={handleOpen}
          open={open}
        />
        <SearchInput />
      </Box>
      <CardsHistorial ventas={ventas} />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6, ml: 5 }}>
        <TableHistorial facturas={facturas} />
      </Box>
      <ModalAddInvoice
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        productos={productos}
        addProductToInvoice={addProductToInvoice}
      />
    </>
  );
};

export default Historial;
