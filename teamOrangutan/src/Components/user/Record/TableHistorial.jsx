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

export default function TableHistorial({ facturas }) {
  const [open, setOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleClose = () => setOpen(false);

  const handleOpen = (invoice) => {
    setSelectedInvoice(invoice);
    setOpen(true);
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 0, mb: 10 }}>
        <Table sx={{ width: 942 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="right">METODO DE PAGO</StyledTableCell>
              <StyledTableCell align="right">FECHA</StyledTableCell>
              <StyledTableCell align="right">TOTAL</StyledTableCell>
              <StyledTableCell align="right">FACTURA</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facturas.map((row) => {
              const fechaObj = new Date(row.fecha);
              const fechaFormateada = fechaObj.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              const horaFormateada = fechaObj.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <StyledTableRow key={row.factura_pk}>
                  <StyledTableCell component="th" scope="row">
                    {row.factura_pk}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.formaPago_fk || "Ninguna"}</StyledTableCell>
                  <StyledTableCell align="right">
                    {fechaFormateada} {horaFormateada}
                  </StyledTableCell>
                  <StyledTableCell align="right">C$ {row.total}</StyledTableCell>
                  <StyledTableCell align="right" onClick={() => handleOpen(row)}>
                    Ver aquí
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalInvoice open={open} handleClose={handleClose} invoice={selectedInvoice} />
    </Box>
  );
}
