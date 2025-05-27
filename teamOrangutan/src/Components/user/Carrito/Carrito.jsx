import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid2,
  IconButton,
  Grow,
  Snackbar,
  Alert,
} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { useCart } from "../../../Auth/user/context/CartProvider";
import ProductItem from "../Navbar/ProductItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TallasCard from "../Products/TallasCard";
import { deleteItemCarrito } from "../../../Api/user/carrito";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PulseLoader from "react-spinners/PulseLoader";

import LoadingOverlayWrapper from "react-loading-overlay-ts";
import Payments from "../../../Pages/user/Payments";
import { useContext } from "react";
import { AuthContext } from "../../../Auth/user/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Carrito = () => {
  const [quantitiesPorTalla, setQuantitiesPorTalla] = useState({});
  const [productos, setProductos] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [open, setOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const { logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const { cart, fetchProductsInCart, refreshCart, updateItemCarrito } =
    useCart();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchProductsInCart();
      const productosConCantidad = data.map((p) => ({
        ...p,
        quantity: p.quantity || 0,
      }));
      setProductos(productosConCantidad);
      const cantidadesIniciales = {};
      productosConCantidad.forEach((p) => {
        cantidadesIniciales[p.id] = {};
        p.tallas?.forEach((t) => {
          cantidadesIniciales[p.id][t] = 0;
        });
        // opcional: si ya hay talla y cantidad en el carrito
        if (p.size && p.quantity) {
          cantidadesIniciales[p.id][p.size] = p.quantity;
        }
      });
      setQuantitiesPorTalla(cantidadesIniciales);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logoutUser();
        navigate("/");
      }
      console.error("Error al cargar productos", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Llamado inicial una vez
  useEffect(() => {
    fetchData();
  }, []);

  console.log("loading");
  console.log(loading);

  // Inicializar tallas seleccionadas una vez
  useEffect(() => {
    if (productos.length > 0 && Object.keys(selectedSizes).length === 0) {
      const initialSizes = {};
      productos.forEach((product) => {
        initialSizes[product.id] = product.size;
      });
      setSelectedSizes(initialSizes);
    }
  }, [productos]);

  useEffect(() => {
    const initialQuantities = {};
    cart.items.forEach((item) => {
      initialQuantities[item.productId] = item.quantity;
    });
    setQuantity(initialQuantities);
  }, [cart]);

  const increase = async (index, itemId) => {
    setLoading(true);

    try {
      const nuevosProductos = [...productos];
      const producto = nuevosProductos[index];
      const tallaSeleccionada = selectedSizes[producto.id];

      if (!tallaSeleccionada || tallaSeleccionada === "") {
        setMessage(
          "Debes seleccionar una talla antes de agregar más unidades."
        );
        setMessageType("error");
        setOpen(true);
        return; // Detener ejecución sin actualizar
      }

      const data = await updateItemCarrito({
        itemId,
        talla: tallaSeleccionada,
        cantidad: 1,
        action: "increment",
      });

      // Solo si el backend no dio error, actualiza cantidad y estado
      producto.quantity += 1;

      setQuantitiesPorTalla((prev) => {
        const current = prev[producto.id] || {};
        const talla = selectedSizes[producto.id];
        return {
          ...prev,
          [producto.id]: {
            ...current,
            [talla]: (current[talla] || 0) + 1,
          },
        };
      });

      setProductos(nuevosProductos);
      await fetchData();
      await refreshCart();

      console.log(data);
    } catch (error) {
      console.error("Error al incrementar", error);

      const errorMsg =
        error?.response?.data?.message || "Ocurrió un error inesperado.";
      setMessage(errorMsg);
      setMessageType("error");
      setOpen(true);
    } finally {
      setLoading(false); // Siempre desactiva loading
    }
  };

  const decrease = async (index, itemId) => {
    setLoading(true);

    const nuevosProductos = [...productos];
    const producto = nuevosProductos[index];
    const tallaSeleccionada = selectedSizes[producto.id];

    if (producto.quantity >= 1) {
      producto.quantity -= 1;

      setQuantitiesPorTalla((prev) => {
        const current = prev[producto.id] || {};
        const talla = selectedSizes[producto.id];
        return {
          ...prev,
          [producto.id]: {
            ...current,
            [talla]: Math.max((current[talla] || 0) - 1, 0),
          },
        };
      });

      setProductos(nuevosProductos);

      try {
        const data = await updateItemCarrito({
          itemId,
          talla: tallaSeleccionada,
          cantidad: 1,
          action: "decrement",
        });
        await fetchData();
        await refreshCart();
        console.log(data);
      } catch (error) {
        setMessage(error.response.data.message);
        setMessageType("error");
        setOpen(true);
      }
    }

    setLoading(false);
  };
  const calcularTotal = () => {
    return productos.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const tipoCambio = 36.5;
  const totalCordobas = calcularTotal();
  const totalDolares = (totalCordobas / tipoCambio).toFixed(2);
  const handleDeleteItemCarrito = async (id) => {
    try {
      const del = await deleteItemCarrito(id);
      await refreshCart();
      await fetchData();
      console.log(del);
    } catch (error) {
      console.error("Error al eliminar del carrito", error);
    }
  };

  const handleCheckout = () => {
    const faltanTallas = productos.some((producto) => {
      const talla = selectedSizes[producto.id];
      return !talla || talla.trim() === "";
    });

    if (faltanTallas) {
      setMessage(
        "Debes seleccionar una talla para todos los productos antes de continuar con el pago."
      );
      setMessageType("error");
      setOpen(true);
      return;
    }

    console.log("Productos listos para pagar:", productos);
    setShowPayment(true);
  };

  console.log(productos);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden", // evita scroll horizontal
      }}
    >
      <LoadingOverlayWrapper
        active={loading}
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
        <Navbar />
        <Grow in={productos} timeout={1000}>
          <Box
            sx={{
              mt: { xs: 10, md: 11 },
              px: { xs: 2, md: 5 },
              ml: 4,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 1,
            }}
          >
            <Box sx={{ flex: 1, pr: 2 }}>
              <Typography
                sx={{ fontWeight: "bold", fontSize: { xs: 26, md: 40 } }}
              >
                {" "}
                Tu Carrito
              </Typography>
              <Typography
                sx={{ color: "gray", fontSize: { xs: 16, md: 20 }, mb: 2 }}
              >
                {" "}
                {cart.items.length} productos en tu carrito
              </Typography>

              <Box
                sx={{
                  borderRadius: 3,

                  height: "auto",
                  border: "1px solid #EBEBEB",
                  boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.1)",
                  mt: 2,
                }}
              >
                <Typography sx={{ m: 3, fontSize: { xs: 20, md: 26 } }}>
                  Productos
                </Typography>

                {productos.map((item, index) => (
                  <Grow
                    in={true}
                    timeout={1000 + index * 200}
                    key={item.Item_Id}
                  >
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          m: { xs: 2, md: 4 },
                          gap: 2,
                        }}
                      >
                        <ProductItem item={item} width={120} height={120} />

                        <Box sx={{ ml: 2, width: "75%" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <Typography sx={{ fontWeight: "500" }}>
                              {item.name}
                            </Typography>
                            <Typography
                              sx={{ marginLeft: "auto", fontWeight: 600 }}
                            >
                              C$ {item.price}
                            </Typography>
                          </Box>

                          <Typography sx={{ color: "gray" }}>
                            Talla: {item.size}
                          </Typography>

                          {item.tallas?.length > 0 ? (
                            <Grid2
                              container
                              spacing={1}
                              mt={1}
                              sx={{ width: 500, flexWrap: "wrap" }}
                            >
                              {item.tallas.map((talla, tallaIndex) => (
                                <Grid2
                                  item
                                  key={tallaIndex}
                                  sx={{
                                    mr: 2,
                                    flexWrap: { xs: "wrap" },
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  <TallasCard
                                    talla={talla}
                                    selectedSize={
                                      selectedSizes[item.id] || null
                                    }
                                    setSelectedSize={(size) => {
                                      setSelectedSizes((prev) => {
                                        const prevSize = prev[item.id];
                                        const newSelectedSizes = {
                                          ...prev,
                                          [item.id]:
                                            size === prevSize ? null : size,
                                        };

                                        // Si cambió la talla
                                        if (size !== prevSize) {
                                          setProductos((productosPrev) =>
                                            productosPrev.map((p) =>
                                              p.id === item.id
                                                ? {
                                                    ...p,
                                                    quantity:
                                                      quantitiesPorTalla[
                                                        item.id
                                                      ]?.[size] || 0,
                                                  }
                                                : p
                                            )
                                          );
                                        }

                                        return newSelectedSizes;
                                      });
                                    }}
                                  />
                                </Grid2>
                              ))}
                            </Grid2>
                          ) : (
                            <Typography>No hay tallas disponibles</Typography>
                          )}

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                overflow: "hidden",
                                width: "fit-content",
                                mt: 1,
                              }}
                            >
                              <IconButton
                                onClick={() => decrease(index, item.Item_Id)}
                                sx={{
                                  borderRight: "1px solid #ccc",
                                  borderRadius: 0,
                                }}
                              >
                                <RemoveIcon />
                              </IconButton>

                              <Typography
                                sx={{
                                  px: 2,
                                  minWidth: "30px",
                                  textAlign: "center",
                                }}
                              >
                                {item.quantity}
                              </Typography>

                              <IconButton
                                onClick={() => increase(index, item.Item_Id)}
                                sx={{
                                  borderLeft: "1px solid #ccc",
                                  borderRadius: 0,
                                }}
                              >
                                <AddIcon />
                              </IconButton>
                            </Box>
                            <Box sx={{ ml: "auto", cursor: "pointer" }}>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleDeleteItemCarrito(item.Item_Id)
                                }
                              >
                                <DeleteOutlineIcon
                                  sx={{ fontSize: 23, color: "gray" }}
                                />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Divider
                        sx={{
                          my: 2,
                          mx: { xs: 2, md: 4 },
                          borderColor: "#EBEBEB",
                        }}
                      />{" "}
                    </Box>
                  </Grow>
                ))}
              </Box>
            </Box>
            {showPayment ? (
              <Grow in={true} timeout={1000}>
                <Box mr={15} sx={{ position: "sticky",  width: {md: 350, xs: 300, mt: {md: 2, xs: 0} } }}>
                  <Payments
                    onPaymentSuccess={async () => {
                      await refreshCart();
                      await fetchData(); // Recargar productos del carrito
                    }}
                  />
                </Box>
              </Grow>
            ) : (
              <Box
                sx={{
                  mr: 15,
                  mt: { xs: 2 },
                  width: { md: 320, xs: 260 },
                  height: "fit-content",
                  position: "sticky",
                  top: 190,
                  alignSelf: "flex-start",
                  border: "1px solid #EBEBEB",
                  borderRadius: 3,
                  boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.05)",
                  p: 3,
                  backgroundColor: "white",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Resumen del pedido
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Subtotal</Typography>
                    <Typography>C${totalCordobas.toFixed(2)}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Envío</Typography>
                    <Typography>Gratis</Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography fontWeight="bold">Total (C$)</Typography>
                    <Typography fontWeight="bold">
                      C${totalCordobas.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography fontWeight="bold">Total (USD)</Typography>
                    <Typography fontWeight="bold">${totalDolares}</Typography>
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    IVA incluido.
                  </Typography>

                  <Box
                    sx={{
                      mt: 3,
                      backgroundColor: "black",
                      color: "white",
                      textAlign: "center",
                      py: 1,
                      borderRadius: 2,
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                    onClick={handleCheckout}
                  >
                    <Typography>Proceder al pago</Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Grow>{" "}
        <Snackbar
          sx={{ mt: 8 }}
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={messageType}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </LoadingOverlayWrapper>
    </Box>
  );
};

export default Carrito;
