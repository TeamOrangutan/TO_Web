import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import ModalInvoice from "./ModalInvoice";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(nombre, correo, metodoPago, fecha, total, factura) {
  return { nombre, correo, metodoPago, fecha, total, factura };
}

const rows = [
  createData(
    "Yasser Jose Darce Mairena",
    "yasserdarce@gmail.com",
    "MASTERCARD",
    "03/23/24",
    399,
    "VER AQUI"
  ),
  createData(
    "Yasser Jose Darce Mairena",
    "yasserdarce@gmail.com",
    "MASTERCARD",
    "03/23/24",
    399,
    "VER AQUI"
  ),
  createData(
    "Yasser Jose Darce Mairena",
    "yasserdarce@gmail.com",
    "MASTERCARD",
    "03/23/24",
    399,
    "VER AQUI"
  ),
  createData(
    "Yasser Jose Darce Mairena",
    "yasserdarce@gmail.com",
    "MASTERCARD",
    "03/23/24",
    399,
    "VER AQUI"
  ),
  createData(
    "Yasser Jose Darce Mairena",
    "yasserdarce@gmail.com",
    "MASTERCARD",
    "03/23/24",
    399,
    "VER AQUI"
  ),
  createData(
    "Yasser Jose Darce Mairena",
    "yasserdarce@gmail.com",
    "MASTERCARD",
    "03/23/24",
    399,
    "VER AQUI"
  ),
  createData(
    "Yasser Jose Darce Mairena",
    "yasserdarce@gmail.com",
    "MASTERCARD",
    "03/23/24",
    399,
    "VER AQUI"
  ),
  createData(
    "Yasser Jose Darce Mairena",
    "yasserdarce@gmail.com",
    "MASTERCARD",
    "03/23/24",
    399,
    "VER AQUI"
  ),
  createData(
    "Yasser Jose Darce Mairena",
    "yasserdarce@gmail.com",
    "MASTERCARD",
    "03/23/24",
    399,
    "VER AQUI"
  ),
];

export default function TableHistorial() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 0, mb: 10 }}>
        <Table sx={{ width: 942 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>NOMBRE</StyledTableCell>
              <StyledTableCell align="left">CORREO</StyledTableCell>
              <StyledTableCell align="right">METODO DE PAGO</StyledTableCell>
              <StyledTableCell align="right">FECHA</StyledTableCell>
              <StyledTableCell align="right">TOTAL</StyledTableCell>
              <StyledTableCell align="right">FACTURA</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.nombre}>
                <StyledTableCell component="th" scope="row">
                  {row.nombre}
                </StyledTableCell>
                <StyledTableCell align="right">{row.correo}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.metodoPago}
                </StyledTableCell>
                <StyledTableCell align="right">{row.fecha}</StyledTableCell>
                <StyledTableCell align="right">$ {row.total}</StyledTableCell>
                <StyledTableCell align="right" onClick={handleOpen} >{row.factura}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalInvoice open={open} handleClose={handleClose} handleOpen={handleOpen} />
    </Box>
  );
}
