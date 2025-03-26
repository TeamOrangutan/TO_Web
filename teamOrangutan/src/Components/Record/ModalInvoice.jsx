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
import logo2 from "../../assets/logo2.png";
import { Divider } from "@mui/material";

export default function ModalInvoice({ open, handleClose }) {
  const rows = Array(7).fill({
    name: "NO QUIERE PRENDER",
    price: "$10",
    quantity: 2,
    total: "$20",
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

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <CustomTypography text={"TODOS LOS PRODUCTOS"} />
        </Box>

        <TableContainer component={Paper} sx={{mb: 20}} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nombre del producto</strong></TableCell>
                <TableCell><strong>Precio unitario</strong></TableCell>
                <TableCell><strong>Cantidad</strong></TableCell>
                <TableCell><strong>Total</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <Box sx={{display: 'flex', justifyContent: 'space-between'}} >
            <Typography sx={{fontWeight: 'bold'}} >Total de ganancias: C$ 120</Typography>
            <Typography sx={{fontWeight: 'bold'}} >Total de ventas: C$ 600</Typography>
        </Box>
      </Box>
    </Modal>
  );
}
