import { Box, Button, Divider, Typography } from "@mui/material";
import { PulseLoader } from "react-spinners";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { getInvoiceById } from "../../../Api/user/invoice";
import { useState } from "react";
import logoSRC from "../../../assets/user/logo2.png";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useRef } from "react";
import PrintIcon from "@mui/icons-material/Print";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductItem from "../Navbar/ProductItem";

export const Orders = ({ ordenes, ordenesLoaded }) => {
  const USD_TO_CORDOBAS = 36.84;
  const pdfRefDesktop = useRef();
  const pdfRefMobile = useRef();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [loadingFactura, setLoadingFactura] = useState(false);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);

  const handlePrintPDF = async () => {
    const isMobile = window.innerWidth < 768;
    const sourceRef = isMobile ? pdfRefMobile.current : pdfRefDesktop.current;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    await new Promise((r) => setTimeout(r, 300));

    doc.html(sourceRef, {
      callback: function (doc) {
        doc.save(`factura-${facturaSeleccionada?.folio || "sin-folio"}.pdf`);
      },
      margin: [20, 20, 20, 20],
      autoPaging: "text",
      x: 0,
      y: 0,
      html2canvas: {
        scale: isMobile ? 0.9 : 0.64, // Aumenta la calidad del render
        useCORS: true,
      },
    });
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
  };

  return (
    <>
      <LoadingOverlayWrapper
        active={ordenesLoaded}
        spinner={<PulseLoader color="#fff" size={20} />}
        styles={{
          overlay: (base) => ({
            ...base,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }),
          content: (base) => ({
            ...base,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }),
        }}
      >
        {ordenes.length === 0 ? (
          <Typography>No hay órdenes registradas.</Typography>
        ) : (
          ordenes.map((orden) => (
            <Box
              key={orden.orden_pk}
              mb={3}
              p={2}
              border="1px solid #ccc"
              borderRadius={2}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle1" fontWeight={410}>
                  ID: {orden.orderId}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, fontSize: 20 }}
                >
                  C$ {Math.round(orden.total * USD_TO_CORDOBAS)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" color="gray">
                  Fecha: {new Date(orden.createdAt).toLocaleDateString()}
                </Typography>
                <Box
                  sx={{
                    borderRadius: 10,
                    backgroundColor: "#DCFCE7",
                    p: 0.5,
                    color: "#065F46",
                  }}
                >
                  <Typography variant="body2">{orden.estado}</Typography>
                </Box>
              </Box>

              <Box mt={1}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Productos:
                </Typography>
                <Box mt={2}>
                  {orden.ordenItem.map((item) => (
                    <Box
                      key={item.orden_item_pk}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.5,
                      }}
                    >
                      <Typography>
                        {item.producto.nombre} x{item.cantidad}
                      </Typography>
                      <Typography>
                        C$ {Math.round(item.subtotal_usd * USD_TO_CORDOBAS)}
                      </Typography>
                    </Box>
                  ))}
                  <Divider />
                  <Box
                    sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      onClick={() =>
                        handleVerFactura(orden.factura?.factura_pk)
                      }
                      disabled={!orden.factura?.factura_pk}
                      sx={{
                        backgroundColor: "white",
                        border: "1px solid rgb(184, 184, 184)",
                        color: "black",
                      }}
                    >
                      Ver factura
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        )}

        <LoadingOverlayWrapper
          active={loadingFactura}
          spinner={<PulseLoader color="#fff" size={20} />}
          styles={{
            overlay: (base) => ({
              ...base,
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
            }),
            content: (base) => ({
              ...base,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }),
          }}
        >
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
            <DialogContent>
              <div className="pdf-wrapper" ref={pdfRefDesktop}>
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

                        <Typography>
                          {facturaSeleccionada.nombreCliente}
                        </Typography>
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
                                  Talla: {item.orden_item_fk?.talla.nombre}
                                </Typography>
                                <Typography variant="body2">
                                  Cantidad: {item.orden_item_fk?.cantidad}
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
                              ${" "}
                              {item.orden_item_fk.precio_unitario_usd.toFixed(
                                2
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="h6" align="right">
                        Total: C${" "}
                        {Math.round(
                          facturaSeleccionada.total * USD_TO_CORDOBAS
                        )}
                      </Typography>
                      <Typography variant="h6" align="right">
                        $ {facturaSeleccionada.total.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box mt={13} />
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
                        Esta factura fue generada el{" "}
                        {new Date(
                          facturaSeleccionada?.fecha
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
              <Button onClick={() => setModalAbierto(false)}>Cerrar</Button>
            </DialogActions>
          </Dialog>

          <div
            style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
          >
            <div
              ref={pdfRefMobile}
              className="pdf-wrapper"
              style={{
                width: "750px",
                padding: "32px",
                backgroundColor: "white",
              }}
            >
              {facturaSeleccionada && (
                <>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    {/* Lado izquierdo */}
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        Primal Garage
                      </Typography>
                      <Typography>
                        ID: {facturaSeleccionada?.orden_fk?.orderId}
                      </Typography>
                    </Box>

                    {/* Logo */}
                    <Box
                      component="img"
                      src={logoSRC}
                      alt="logo"
                      sx={{ width: "120px", height: "auto" }}
                    />

                    {/* Lado derecho */}
                    <Box textAlign="right">
                      <Typography>
                        Factura: #{facturaSeleccionada?.folio}
                      </Typography>
                      <Typography>
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
                        }}
                      >
                        <Typography fontWeight={700} color="#065F46">
                          {facturaSeleccionada?.orden_fk?.estado}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box mt={4}>
                    <Typography variant="subtitle1" fontWeight={500}>
                      Cliente:
                    </Typography>
                    <Typography>{facturaSeleccionada.nombreCliente}</Typography>
                    <Typography>
                      {facturaSeleccionada.orden_fk.payerEmail}
                    </Typography>
                  </Box>

                  <Box mt={4}>
                    <Typography variant="subtitle1" fontWeight={500}>
                      Envío:
                    </Typography>
                    <Typography>{facturaSeleccionada.direccion}</Typography>
                    <Typography>
                      Método de pago: {facturaSeleccionada.metodoPago}
                    </Typography>
                    <Typography>
                      Teléfono: {facturaSeleccionada.telefono}
                    </Typography>
                  </Box>

                  <Box mt={4}>
                    <Typography variant="subtitle1" fontWeight={500}>
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
                        {/* Producto y detalles */}
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
                                Talla: {item.orden_item_fk?.talla.nombre}
                              </Typography>
                              <Typography variant="body2">
                                Cantidad: {item.orden_item_fk?.cantidad}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        {/* Precios */}
                        <Box textAlign="right">
                          <Typography fontWeight={600}>
                            C${" "}
                            {Math.round(
                              item.orden_item_fk.precio_unitario_usd *
                                USD_TO_CORDOBAS
                            )}
                          </Typography>
                          <Typography fontWeight={500}>
                            ${" "}
                            {item.orden_item_fk.precio_unitario_usd.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box textAlign="right">
                    <Typography variant="h6">
                      Total: C${" "}
                      {Math.round(facturaSeleccionada.total * USD_TO_CORDOBAS)}
                    </Typography>
                    <Typography variant="h6">
                      ${facturaSeleccionada.total.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box mt={13} />
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
                      Esta factura fue generada el{" "}
                      {new Date(
                        facturaSeleccionada?.fecha
                      ).toLocaleDateString()}
                    </Typography>
                    <Typography color="gray" fontSize={11}>
                      Primal Garage - Sistema de gestión de ventas
                    </Typography>
                  </Box>
                </>
              )}
            </div>
          </div>
        </LoadingOverlayWrapper>
      </LoadingOverlayWrapper>
    </>
  );
};

export default Orders;
