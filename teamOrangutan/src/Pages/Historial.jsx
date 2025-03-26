import { Box } from "@mui/material";
import CustomTypography from "../Components/CustomTypography";
import Navbar from "../Components/Navbar/Navbar";
import SelectOrdenar from "../Components/SelectOrdenar";
import SearchInput from "../Components/SearchInput";
import CardsHistorial from "../Components/Record/CardsHistorial";
import TableHistorial from "../Components/Record/TableHistorial";

export const Historial = () => {
 
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
      <Box sx={{ flex: 1, display: "flex", ml: 28, gap: 55 }}>
        <SelectOrdenar />
        <SearchInput />
      </Box>
      <CardsHistorial />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, ml: 5 }}>
        <TableHistorial />
      </Box>
    </>
  );
};

export default Historial;
