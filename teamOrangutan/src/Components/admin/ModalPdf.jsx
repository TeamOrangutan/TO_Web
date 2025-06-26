import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";
import { PulseLoader } from "react-spinners";
import ProductItem from "../user/Navbar/ProductItem";
import logoSRC from "../../assets/user/logo2.png";
import dayjs from "dayjs";
import { VentasDiariasBarChart } from "./VentasDiariasBarChart";
import { PieChartProductos, PRODUCT_COLORS } from "./PieChart";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const USD_TO_CORDOBAS = 36.84;

const ModalPdf = ({
  open,
  onClose,
  reporteQuincenal,
  loading,
  pdfRef,
  onPrint,
  pieChartRef,
  barChartRef,
}) => {
  if (loading) {
    return (
      <Dialog open={open} maxWidth="md" fullWidth>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="400px"
          py={6}
        >
          <PulseLoader color="black" />
          <Typography mt={3}>Generando reporte...</Typography>
        </Box>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle fontWeight={700}>
        <Button
          onClick={onPrint}
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
          Imprimir reporte
        </Button>
        <IconButton
          aria-label="close"
          onClick={onClose}
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
          <div className="pdf-wrapper">

        {reporteQuincenal ? (
          <Box mt={0} p={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start" // ahora alineamos al tope
              sx={{ width: "100%" }}
            >
              {/* Lado izquierdo */}
              <Box textAlign="left">
                <Typography variant="h6" fontWeight={700}>
                  Reporte Quincenal
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
                  Código: #{reporteQuincenal?.codigo}
                </Typography>
                <Typography variant="body2">
                  Fecha:{" "}
                  {reporteQuincenal?.fecha_generacion
                    ? new Date(
                        reporteQuincenal.fecha_generacion
                      ).toLocaleDateString()
                    : ""}
                </Typography>
              </Box>
            </Box>
            <Box mt={6}>
              <Typography variant="h6" fontWeight={700}>
                Periodo de analisis
              </Typography>
              <Typography mt={1}>
                Desde: {new Date(reporteQuincenal.desde).toLocaleDateString()}{" "}
              </Typography>
              <Typography>
                Hasta: {new Date(reporteQuincenal.hasta).toLocaleDateString()}{" "}
              </Typography>
              <Typography>Total de dias: 15</Typography>
            </Box>

            <Typography variant="h6" fontWeight={700} mt={3} mb={2}>
              Resumen Ejecutivo:
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Ventas Totales:</Typography>
                  <Typography fontWeight="500">
                    ${reporteQuincenal.totalVentas}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Órdenes Procesadas:</Typography>
                  <Typography fontWeight="500">
                    {reporteQuincenal.ordenesProcesadas}
                  </Typography>
                </Box>
              </Grid>

              {/* Columna derecha */}
              <Grid item xs={6}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Promedio Diario:</Typography>
                  <Typography fontWeight="500">
                    ${reporteQuincenal.promedioDiario.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Productos Vendidos:</Typography>
                  <Typography fontWeight="500">
                    {reporteQuincenal.productosVendidos} unidades
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Typography variant="h6" mt={4} mb={3}>
              Ventas diarias entre{" "}
              {new Date(reporteQuincenal.desde).toLocaleDateString()} -{" "}
              {new Date(reporteQuincenal.hasta).toLocaleDateString()}{" "}
            </Typography>

            <div ref={barChartRef}>
              <VentasDiariasBarChart
                ventasDiarias={reporteQuincenal.ventasDiarias}
              />
            </div>

            <Typography variant="h6" mt={1} mb={3}>
              Análisis de Productos vendidos
            </Typography>

            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems="center"
              gap={{ xs: 3, md: 8 }}
              sx={{ width: "100%" }}
            >
              {" "}
              <Box
                sx={{
                  border: "1px solid rgba(204,204,204,0.3)",
                  p: { xs: 1, sm: 3 },
                  borderRadius: 2,
                  width: { xs: "100%", md: "auto" },
                  mb: { xs: 2, md: 0 },
                }}
                ref={pieChartRef}
              >
                <PieChartProductos
                  productosAnalisis={reporteQuincenal.productosAnalisis}
                  colors={PRODUCT_COLORS}
                />
              </Box>
              <Box sx={{ alignSelf: "flex-start" }}>
                <Typography fontWeight="bold" fontSize={18}>
                  Top Productos:
                </Typography>
                {reporteQuincenal.productosAnalisis?.map((producto, idx) => (
                  <Box key={producto.productosAnalisis_pk} mt={3}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box
                          sx={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            backgroundColor:
                              PRODUCT_COLORS[idx % PRODUCT_COLORS.length],
                            display: "inline-block",
                            mr: 1,
                          }}
                        />
                        <Typography fontWeight="700">
                          {producto.nombreProducto}
                        </Typography>
                      </Box>
                      <Typography ml={10} fontWeight="600">
                        C$ {producto.montoTotal}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography fontSize={15} color="gray">
                        {producto.cantidadVendida} unidades
                      </Typography>
                      <Typography fontSize={15} color="gray">
                        {producto.porcentaje.toFixed(2)}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box mt={3}>
              <Typography variant="h6">
                Detalle de Ventas por Producto:
              </Typography>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Producto</TableCell>
                      <TableCell align="right">Unidades</TableCell>
                      <TableCell align="right">Ingresos</TableCell>
                      <TableCell align="right">%Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reporteQuincenal.productosAnalisis?.map((row, index) => (
                      <TableRow
                        key={row.productosAnalisis_pk}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Box
                            sx={{
                              width: 14,
                              height: 14,
                              borderRadius: "50%",
                              backgroundColor:
                                PRODUCT_COLORS[index % PRODUCT_COLORS.length],
                              display: "inline-block",
                              mr: 1,
                            }}
                          />

                          {row.nombreProducto}
                        </TableCell>
                        <TableCell align="right">
                          {row.cantidadVendida}
                        </TableCell>
                        <TableCell align="right">C$ {row.montoTotal}</TableCell>
                        <TableCell align="right">
                          {row.porcentaje.toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box mt={9} />
            <Divider sx={{ mb: 0 }} />
            <Box
              component="footer"
              sx={{
                width: "100%",
                background: "#F8F8F8",
                py: 2,
                px: 0,
                mt: 0,
                borderTop: "1px solid #e0e0e0",
                textAlign: "center",
              }}
            >
              <Typography color="gray" fontSize={13}>
                Este reporte fue generado el{" "}
                {new Date(
                  reporteQuincenal.fecha_generacion
                ).toLocaleDateString()}
              </Typography>
              <Typography color="gray" fontSize={11}>
                Primal Garage - Sistema de gestión de ventas
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography>No se pudo cargar la factura.</Typography>
        )}
          </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPdf;
