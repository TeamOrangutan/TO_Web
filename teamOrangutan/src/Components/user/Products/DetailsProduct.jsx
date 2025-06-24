import { Box, Button, Grid, Typography } from "@mui/material";
import Grow from "@mui/material/Grow";

import ImageProductActualizar from "./ImageProductActualizar";
import { BarLoader, PulseLoader } from "react-spinners";
import { useCart } from "../../../Auth/user/context/CartProvider";
import TallasCard from "./TallasCard";
import { useProductDetails } from "../../../hooks/useProductDetails";
import QuantitySelect from "./QuantitySelect";
import Carrito from "../Carrito/Carrito";
import { useEffect, useState } from "react";
import { addCarrito } from "../../../Api/user/carrito";
import { useContext } from "react";
import { AuthContext } from "../../../Auth/user/context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

export const DetailsProduct = ({ product }) => {
  const { addToCart, handleRemoveToCart } = useCart();
  const { logoutUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    productUpdate,
    quantity,
    increase,
    decrease,
    selectedSize,
    setSelectedSize,
    order,
    setorder,
    refreshProduct,
  } = useProductDetails(product);

const handleCarrito = async () => {
  const user = localStorage.getItem("user");

  // Obtén el carrito actual y asegúrate de que es un array
  let carrito = [];
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    try {
      const parsed = JSON.parse(storedCart);
      carrito = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      carrito = [];
    }
  }

  // Busca el stock de la talla seleccionada
  const tallaInfo = productUpdate.tallas.find(
    (t) => t.name === selectedSize
  );
  const stockTalla = tallaInfo?.stock ?? 0;

  // Busca si ya existe ese producto/talla en el carrito
  const existente = carrito.find(
    (item) =>
      item.productid === product.id &&
      item.size === selectedSize
  );

  let nuevaCantidad = quantity;
  if (existente) {
    nuevaCantidad = existente.quantity + quantity;
  }

  // Controla que la suma no supere el stock
  if (nuevaCantidad > stockTalla) {
    alert("No puedes agregar más de lo disponible en stock para esta talla.");
    return;
  }

  
  const newOrder = {
    productid: product.id,
    size: selectedSize,
    quantity: quantity,
    user: Number(user),
  };

  try {
    setLoading(true);
    await addCarrito(
      newOrder.productid,
      newOrder.quantity,
      newOrder.size,
      newOrder.user
    );
    setorder(newOrder);
    addToCart(newOrder);
    await refreshProduct(product.id);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      logoutUser();
      navigate("/");
    }
    console.error("Error al hacer el pedido:", error);
  }
  setLoading(false);
};

  return product.name ? (
    <Grow in={product} timeout={1000}>
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
        <Box
          sx={{
            mt: { xs: 1, md: 5 },
            px: { xs: 2, md: 10 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 6, md: 10 },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Imagen del producto */}
          <Box sx={{ flex: 1, position: "relative", textAlign: "center" }}>
            {product.estado === "Agotado" && (
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: 80, md: 140 },
                  left: "50%",
                  transform: "translateX(-50%) rotate(-10deg)",
                  backgroundColor: "rgba(255, 0, 0, 0.74)",
                  color: "white",
                  padding: "10px 30px",
                  borderRadius: "5px",
                  zIndex: 2,
                  fontWeight: "bold",
                  fontSize: { xs: 30, md: 55 },
                  border: "2px solid #EBEBEB",
                }}
              >
                AGOTADO
              </Box>
            )}
            <ImageProductActualizar
              path={product.path}
              hoverPath={product.hoverPath}
            />
          </Box>

          {/* Información del producto */}
          <Box sx={{ flex: 1, maxWidth: 500, mt: { xs: 5, md: 0 } }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>
              {product.name}
            </Typography>

            <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
              C${product.price}
            </Typography>
            <hr
              style={{ height: "1px", backgroundColor: "gray", border: "none" }}
            />

            {/* Descripción */}
            {product.description && (
              <Typography
                sx={{
                  textAlign: "left",
                  fontSize: 15,
                  mt: 2,
                  fontWeight: 400,
                }}
              >
                {product.description}
              </Typography>
            )}

            {/* Tallas */}
            <Typography sx={{ fontSize: 16, mt: 4 }}>Tallas</Typography>
            {productUpdate.tallas && productUpdate.tallas.length > 0 ? (
              <Grid container spacing={3} mt={1}>
                {productUpdate.tallas.map((talla, index) => (
                  <Grid item key={index}>
                    <TallasCard
                      talla={talla}
                      selectedSize={selectedSize}
                      setSelectedSize={setSelectedSize}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No hay tallas disponibles</Typography>
            )}

            {/* Cantidad */}
            <Typography sx={{ fontSize: 16, mt: 4 }}>Cantidad</Typography>
            <QuantitySelect
              quantity={quantity}
              increase={increase}
              decrease={decrease}
            />

            {/* Botón agregar al carrito */}
            <Button
              disabled={product.estado === "Agotado"}
              variant="contained"
              sx={{
                mt: 4,
                backgroundColor: "black",
                color: "white",
                width: "100%",
                height: 50,
                fontWeight: "bold",
              }}
              onClick={handleCarrito}
            >
              AÑADIR AL CARRITO
            </Button>
          </Box>
        </Box>
      </LoadingOverlayWrapper>
    </Grow>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <BarLoader speedMultiplier={1} />
    </Box>
  );
};

export default DetailsProduct;
