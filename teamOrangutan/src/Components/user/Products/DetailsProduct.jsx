import { Box, Button, Grid, Typography } from "@mui/material";
import Grow from "@mui/material/Grow";

import ImageProductActualizar from "./ImageProductActualizar";
import { BarLoader } from "react-spinners";
import { useCart } from "../../../Auth/user/context/CartProvider";
import TallasCard from "./TallasCard";
import { useProductDetails } from "../../../hooks/useProductDetails";
import QuantitySelect from "./QuantitySelect";
import Carrito from "./Carrito/Carrito";
import { useEffect } from "react";
import { addCarrito } from "../../../Api/user/carrito";

export const DetailsProduct = ({ product }) => {
  const { addToCart, handleRemoveToCart } = useCart();

  const {
    productUpdate,
    quantity,
    increase,
    decrease,
    selectedSize,
    setSelectedSize,
    order,
    setorder,
  } = useProductDetails(product);

  const handleCarrito = async () => {
    const user = localStorage.getItem("user");

    const hasOrder = order && order.productid;

  
      const newOrder = {
        productid: product.id,
        size: selectedSize,
        quantity: quantity,
        user: Number(user),
      };

      try {
        await addCarrito(
          newOrder.productid,
          newOrder.quantity,
          newOrder.size,
          newOrder.user
        );
        setorder(newOrder);
        addToCart();
      } catch (error) {
        console.error("Error al hacer el pedido:", error);
      }
   
  };

  return product.name ? (
    <>
      <Carrito />
      <Grow in={product} timeout={1000}>
        <Box
          sx={{
            mt: 5,
          }}
        >
          <Box sx={{ position: "absolute", left: 500, ml: 25, mt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              >
                {product.name}
              </Typography>

              <Typography
                sx={{
                  textAlign: "left",
                  fontSize: "20px",
                  mt: 2,
                  fontWeight: 500,
                }}
              >
                C${product.price}
              </Typography>
            </Box>
            <hr
              style={{ height: "1px", backgroundColor: "gray", border: "none" }}
            />
            <Box sx={{ width: 400 }}>
              <Typography
                sx={{
                  textAlign: "left",
                  fontSize: "15px",
                  mt: 2,
                  fontWeight: 400,
                }}
              >
                {product.description}
              </Typography>
            </Box>
            <form>
              <Typography sx={{ textAlign: "left", fontSize: "16px", mt: 4 }}>
                Tallas
              </Typography>
              {productUpdate.tallas && product.tallas.length > 0 ? (
                <Grid
                  container
                  spacing={1}
                  mt={1}
                  sx={{ width: 500, flexWrap: "wrap" }}
                >
                  {productUpdate.tallas.map((talla, index) => {
                    return (
                      <Grid item key={index} sx={{ display: "flex" }}>
                        <TallasCard
                          talla={talla}
                          selectedSize={selectedSize}
                          setSelectedSize={setSelectedSize}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <Typography>No hay tallas disponibles</Typography>
              )}
            </form>
            <Typography sx={{ textAlign: "left", fontSize: "16px", mt: 2 }}>
              Cantidad
            </Typography>
            <QuantitySelect
              quantity={quantity}
              increase={increase}
              decrease={decrease}
            />
          </Box>

          <Box sx={{ ml: 20 }}>
            <ImageProductActualizar
              path={product.path}
              hoverPath={product.hoverPath}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mt: 6,
              height: 100,
              ml: 80,
            }}
          >
            <Button
              className="btn-addCarrito"
              type="submit"
              variant="contained"
              sx={{
                ml: 7,
                backgroundColor: "black",
                color: "white",
                width: 412,
                height: 50,
              }}
              onClick={() => {
                handleCarrito();
              }}
            >
              AÑADIR AL CARRITO
            </Button>
          </Box>
        </Box>
      </Grow>
    </>
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
