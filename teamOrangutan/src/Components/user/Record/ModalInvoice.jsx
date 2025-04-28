import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomTypography from "../CustomTypography";
import logo2 from "../../../assets/user/logo2.png";
import { Divider } from "@mui/material";

export default function ModalInvoice({ open, handleClose, invoice }) {
  if (!invoice) {
    return null; 
  }

  console.log("invoice.facProductos");
  console.log(invoice);


  // Convertir la fecha a un formato legible
  const fechaObj = new Date(invoice.fecha);
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          maxHeight: "80vh",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={logo2}
            alt="Primal Garage Logo"
            style={{ width: 110, height: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h6" fontWeight='bold' sx={{mt: 2}} > FACTURA</Typography>
        
        </Box>

        <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2 }} >
          <Typography fontWeight='bold'>Factura #:
            </Typography>
           <Typography>
            {invoice.factura_pk}
            
            </Typography> 
          <Typography fontWeight='bold'>Cliente :
            </Typography>
            <Typography>
            {invoice.nombreCliente}
            </Typography>
        </Box>
            <Typography fontWeight="bold" sx={{mt:2}} >
            Fecha: 
          </Typography>
            <Typography>
            {fechaFormateada} a las {horaFormateada}

            </Typography>



        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CustomTypography text={"TODOS LOS PRODUCTOS"} />
        </Box>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Nombre del producto</strong>
                </TableCell>
                <TableCell>
                  <strong>Precio unitario</strong>
                </TableCell>
                <TableCell>
                  <strong>Cantidad</strong>
                </TableCell>
                <TableCell>
                  <strong>Total</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice.facProductos && invoice.facProductos.length > 0 ? (
                invoice.facProductos.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.producto.nombre}</TableCell>
                    <TableCell>{row.producto.precioVenta}</TableCell>
                    <TableCell>{row.cantidad}</TableCell>
                    <TableCell>
                      {(
                        parseFloat(row.producto.precioVenta) * row.cantidad
                      ).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No hay productos en esta factura.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt:8 }}>
         
          <Typography sx={{ fontWeight: "bold" }}>
            Total: C$ {invoice.total}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
