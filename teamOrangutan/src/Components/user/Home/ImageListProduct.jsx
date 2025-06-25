import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, IconButton, ImageListItemBar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllProuducs } from "../../../Api/user/productsApi";
import { useState, useEffect } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarLoader } from "react-spinners";
import Grow from "@mui/material/Grow";
import { useCart } from "../../../Auth/user/context/CartProvider";
import { addCarrito } from "../../../Api/user/carrito";
import { useContext } from "react";
import { AuthContext } from "../../../Auth/user/context/AuthContext";
import { useTheme, useMediaQuery } from "@mui/material";

export default function ImageListProduct({ order, filtroNombre }) {
  const [products, setProducts] = useState([]);
  const [hoveredImages, setHoveredImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { logoutUser } = useContext(AuthContext);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));

  let cols = 4;
  if (isXs) cols = 1;
  else if (isSm) cols = 2;
  else if (isMd) cols = 3;

  const { cart, addToCart, removeFromCart, refreshCart } = useCart();

  const verifi = (item) => {
    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
      return false;
    }

    return cart.items.some((cartItem) => {
      const cartItemProductId = cartItem.productId || cartItem.producto?.id;
      return cartItemProductId === item.id;
    });
  };

  const navigate = useNavigate();

  const handleCarrito = async (item) => {
    const user = localStorage.getItem("user");

    const newOrder = {
      productId: item.id,
      size: "",
      quantity: 1,
      user: Number(user),
    };

    const verifi = cart.items.some(
      (cartItem) => cartItem.productId === item.id
    );

    if (!verifi) {
      try {
        await addCarrito(
          newOrder.productId,
          newOrder.quantity,
          newOrder.size,
          newOrder.user
        );
        addToCart(newOrder); // Agregar al carrito
        await refreshCart();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          logoutUser();
          navigate("/");
        }
        console.error("Error al hacer el pedido:", error);
      }
    } else {
      try {
        const itemInCart = cart.items.find(
          (cartItem) => cartItem.productId === item.id
        );

        if (itemInCart) {
          const itemId = itemInCart.Item_Id;

          removeFromCart(itemId);
          await refreshCart();
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          logoutUser();
          navigate("/");
        }
        console.error("Error al eliminar el ítem del carrito:", error);
      }
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProuducs();
        setProducts(data);
      } catch (error) {
        setError(true);

        console.log(error);

        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
        setImagesLoaded(true);
      }
    };
    getProducts();
  }, []);

  console.log("products 123");
  console.log(products);

  const sortedProducts = [...products];
  if (order === "Fecha") {
    sortedProducts.sort(
      (a, b) =>
        new Date(b.fecha_de_publicacion) - new Date(a.fecha_de_publicacion)
    );
  }

  const handleDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const handleMouseEnter = (id, hoverPath) => {
    setHoveredImages((prev) => ({ ...prev, [id]: hoverPath }));
  };

  const handleMouseLeave = (id, originalPath) => {
    setHoveredImages((prev) => ({ ...prev, [id]: originalPath }));
  };

  // const isInCart = (productId) => {
  //   // Asegúrate de que el carrito esté cargado antes de validar
  //   if (!cart || !cart.items) return false;
  //   return ;
  // };

  let filteredProducts = products.filter(
    (item) =>
      item.estado === "Disponible" &&
      item.name.toLowerCase().includes((filtroNombre || "").toLowerCase())
  );

  // Ordenar productos
  if (order === "Fecha") {
    filteredProducts.sort(
      (a, b) =>
        new Date(b.fecha_de_publicacion) - new Date(a.fecha_de_publicacion)
    );
  }

  if (loading) {
    return (
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
  }

  if (error) {
    return <Typography sx={{ mt: 8 }}>Ha ocurrido un error</Typography>;
  }

  return (
    <Box>
      <ImageList
        cols={cols}
        gap={16}
        sx={{
          width: "100%",
          // height:
          //   filteredProducts.length > 4
          //     ? { xs: "1700px", md: "1000px" }
          //     : "",
          // px: { xs: 4.5, md: 4 },
        }}
      >
        {filteredProducts
          .filter((item) => item.estado === "Disponible")

          .map((item) => {
            const originalPath = item.path;
            const hoverPath = item.hoverPath ? item.hoverPath : originalPath;

            return (
              <Grow in={imagesLoaded} timeout={1000} key={item.id}>
                <ImageListItem
                  sx={{
                    width: 278,
                    borderRadius: 2,
                    position: "relative",
                    mt: 2,
                    transition: "background-color 2s ease",
                    border: "1px solid #EBEBEB", // borde gris muy claro
                    boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.1)", // sombra suave y difusa
                  }}
                >
                  <Box
                    onClick={() => handleDetails(item.id)}
                    className="img-hoverable"
                    sx={{
                      width: "100%",
                      height: 230,
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      "& img": {
                        transition: "transform 0.9s ease-in-out", // zoom
                      },
                      "&:hover img": {
                        transform: "scale(1.1)",
                      },
                      "& .overlay": {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(97, 97, 97, 0.23)",
                        opacity: 0,
                        transition: "opacity 0.4s ease",
                        borderRadius: "8px",
                        zIndex: 2,
                      },
                      "&:hover .overlay": {
                        opacity: 1,
                      },
                    }}
                    onMouseEnter={() => handleMouseEnter(item.id, hoverPath)}
                    onMouseLeave={() => handleMouseLeave(item.id, originalPath)}
                  >
                    {/* Overlay para oscurecer */}
                    <div className="overlay" />

                    <div>
                      <img
                        src={hoverPath}
                        alt={item.name}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          transition: "opacity 0.5s ease",
                          opacity: hoveredImages[item.id] === hoverPath ? 1 : 0,
                          borderRadius: "8px",
                        }}
                      />
                      <img
                        src={originalPath}
                        alt={item.name}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          transition: "opacity 0.5s ease",
                          opacity: hoveredImages[item.id] === hoverPath ? 0 : 1,
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  </Box>

                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    {/* <IconButton
                      sx={{
                        borderRadius: "50%",
                        backgroundColor: "#EBEBEB",
                        zIndex: 2,
                      }}
                      // onClick={(e) => {
                      //   handleCarrito(item);
                      // }}
                    >
                      {verifi(item) ? (
                        <ShoppingCartIcon
                          sx={{ color: "gray", fontSize: "30px" }}
                        />
                      ) : (
                        <ShoppingCartOutlinedIcon
                          sx={{ color: "gray", fontSize: "30px" }}
                        />
                      )}
                    </IconButton> */}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 0,
                      mb: 2,
                    }}
                  >
                    <Typography sx={{ fontWeight: "360", fontSize: 20 }}>
                      {item.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 0,
                      mb: 2,
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                      C$ {item.price}
                    </Typography>
                  </Box>
                </ImageListItem>
              </Grow>
            );
          })}
      </ImageList>
    </Box>
  );
}
