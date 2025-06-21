import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { getResumeOrdenes } from "../../Api/user/ordenes";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getInvoiceById } from "../../Api/user/invoice";
import { useRef } from "react";
import PrintIcon from "@mui/icons-material/Print";
import { PulseLoader } from "react-spinners";
import CloseIcon from "@mui/icons-material/Close";
import logoSRC from "../../assets/user/logo2.png";
import ProductItem from "../user/Navbar/ProductItem";

import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

export const TableOrders = () => {
  const [Orders, setOrders] = useState([]);
  const USD_TO_CORDOBAS = 36.84;
  const pdfRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [loadingFactura, setLoadingFactura] = useState(false);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true); 

  const handlePrintPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    doc.html(pdfRef.current, {
      callback: function (doc) {
        doc.save(`factura-${facturaSeleccionada?.folio || "sin-folio"}.pdf`);
      },
      margin: [20, 20, 20, 20],
      autoPaging: "text",
      x: 0,
      y: 0,
      html2canvas: {
        scale: 0.6,
      },
    });
  };
  const handleMenuOpen = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleVerFactura = async (facturaId) => {
    setLoadingFactura(true);
    try {
      const factura = await getInvoiceById(facturaId);
      setFacturaSeleccionada(factura);
      setModalAbierto(true);
      console.log(facturaSeleccionada);
    } catch (error) {
      console.error("Error al obtener la factura:", error);
    }
    setLoadingFactura(false);

    handleMenuClose();
    setSelectedOrder(null);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getResumeOrdenes();
        setOrders(data.data);
        console.log(Orders);
      } catch (error) {
        console.error("Error :", error);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Box
        sx={{
          border: "2px solid #F1EEFD",
          transition: "box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out",

          backgroundColor: "white",
          mt: 5,
          p: 3,
        }}
      >
        <Typography fontWeight="bold" fontSize={22}>
          Órdenes recientes
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>CÓDIGO</strong>
              </TableCell>
              <TableCell>
                <strong>CLIENTE</strong>
              </TableCell>
              <TableCell>
                <strong>PRODUCTOS</strong>
              </TableCell>
              <TableCell>
                <strong>CANTIDAD</strong>
              </TableCell>
              <TableCell>
                <strong>ESTADO</strong>
              </TableCell>
              <TableCell>
                <strong>MONTO TOAL</strong>
              </TableCell>
              <TableCell>
                <strong>FECHA</strong>
              </TableCell>
              <TableCell>
                <strong></strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    py={4}
                  >
                    <PulseLoader color="black" />
                    <Typography variant="body2" mt={2}>
                      Cargando órdenes...
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : Orders.length > 0 ? (
              Orders.map((orden) => (
                <TableRow key={orden.codigo}>
                  <TableCell>{orden.codigo}</TableCell>
                  <TableCell>{orden.cliente}</TableCell>
                  <TableCell>{orden.productos}</TableCell>
                  <TableCell>{orden.cantidad}</TableCell>
                  <TableCell>
                    <Chip
                      label={orden.estado}
                      color={
                        orden.estado === "COMPLETED"
                          ? "success"
                          : orden.estado === "Pendiente"
                          ? "warning"
                          : "error"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{orden.monto}</TableCell>
                  <TableCell>
                    {dayjs(orden.fecha).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuOpen(e, orden)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hay órdenes para mostrar.
                </TableCell>
              </TableRow>
            )}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleVerFactura(selectedOrder.factura)}>
                Ver factura
              </MenuItem>
            </Menu>
          </TableBody>
        </Table>

        <Dialog
          open={modalAbierto}
          onClose={() => setModalAbierto(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle fontWeight={700}>
            <Button
              onClick={handlePrintPDF}
              variant="outlined"
              startIcon={<PrintIcon />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderColor: "black",
                color: "black",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                  borderColor: "black",
                },
              }}
            >
              Imprimir factura
            </Button>
            <IconButton
              aria-label="close"
              onClick={() => setModalAbierto(false)}
              sx={{
                position: "absolute",
                right: 1,
                top: 1,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent ref={pdfRef}>
            {loadingFactura ? (
              <PulseLoader color="#2AB9B7" />
            ) : facturaSeleccionada ? (
              <Box mt={0}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start" // ahora alineamos al tope
                  sx={{ width: "100%" }}
                >
                  {/* Lado izquierdo */}
                  <Box textAlign="left">
                    <Typography variant="h6" fontWeight={700}>
                      Primal Garage
                    </Typography>
                    <Typography variant="body2">
                      ID: {facturaSeleccionada?.orden_fk?.orderId}
                    </Typography>
                  </Box>

                  {/* Centro - Logo más arriba */}
                  <Box
                    component="img"
                    src={logoSRC}
                    alt="logo"
                    sx={{
                      width: { xs: "100px", sm: "120px" },
                      height: "auto",
                      alignSelf: "flex-start", // sube el logo al tope del flex container
                      mt: -0.1, // opcional: lo sube aún más si quieres
                    }}
                  />

                  {/* Lado derecho */}
                  <Box textAlign="right">
                    <Typography variant="body1" fontWeight={500}>
                      Factura: #{facturaSeleccionada?.folio}
                    </Typography>
                    <Typography variant="body2">
                      Fecha:{" "}
                      {facturaSeleccionada?.fecha
                        ? new Date(
                            facturaSeleccionada.fecha
                          ).toLocaleDateString()
                        : ""}
                    </Typography>
                    <Box
                      sx={{
                        borderRadius: 10,
                        backgroundColor: "#DCFCE7",
                        padding: "4px 8px",
                        mt: 1,
                        ml: 9,
                        width: 100,
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: 700,
                          color: "#065F46",
                        }}
                      >
                        {facturaSeleccionada?.orden_fk?.estado}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box mt={4}>
                  <Box>
                    <Typography
                      fontWeight={400}
                      fontSize={19}
                      sx={{ letterSpacing: "normal" }}
                    >
                      Cliente:
                    </Typography>

                    <Typography>{facturaSeleccionada.nombreCliente}</Typography>
                    <Typography>
                      {facturaSeleccionada.orden_fk.payerEmail}
                    </Typography>
                  </Box>
                  <Box mt={5}>
                    <Typography fontWeight={400} fontSize={19}>
                      Envío:{" "}
                    </Typography>
                    <Typography mt={1}>
                      {facturaSeleccionada.direccion}
                    </Typography>
                    <Typography mt={1}>
                      Método de pago: {facturaSeleccionada.metodoPago}
                    </Typography>
                    <Typography mt={1}>
                      Telefono {facturaSeleccionada.telefono}
                    </Typography>
                  </Box>
                </Box>

                <Box mt={5}>
                  <Typography fontWeight={400} fontSize={19}>
                    Productos:
                  </Typography>

                  {facturaSeleccionada.facItems?.map((item, idx) => (
                    <Box
                      key={idx}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      mb={2}
                    >
                      {/* Parte izquierda: imagen + info */}
                      <Box display="flex" gap={1}>
                        {/* Imagen */}
                        <Box>
                          <ProductItem
                            item={item.orden_item_fk.producto}
                            width={70}
                            height={70}
                          />
                        </Box>

                        {/* Info del producto */}
                        <Box display="flex" flexDirection="column">
                          <Typography fontWeight={500}>
                            {item.orden_item_fk.producto.nombre}
                          </Typography>
                          <Box display="flex" gap={2}>
                            <Typography variant="body2">
                              Talla: {item.orden_item_fk.talla?.nombre}
                            </Typography>
                            <Typography variant="body2">
                              Cantidad: {item.orden_item_fk.cantidad}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Parte derecha: precios en córdobas y dólares */}
                      <Box
                        display="flex"
                        flexDirection="column"
                        textAlign="right"
                      >
                        <Typography fontWeight={500}>
                          C${" "}
                          {Math.round(
                            item.orden_item_fk.precio_unitario_usd *
                              USD_TO_CORDOBAS
                          )}
                        </Typography>
                        <Typography fontWeight={500}>
                          $ {item.orden_item_fk.precio_unitario_usd.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" align="right">
                    Total: C${" "}
                    {Math.round(facturaSeleccionada.total * USD_TO_CORDOBAS)}
                  </Typography>
                  <Typography variant="h6" align="right">
                    $ {facturaSeleccionada.total.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography>No se pudo cargar la factura.</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalAbierto(false)}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default TableOrders;
