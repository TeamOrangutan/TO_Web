import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, IconButton, ImageListItemBar, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { deleteProduct, getAllProuducs } from "../../../Api/user/productsApi";
import { useState } from "react";
import { useEffect } from "react";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarLoader } from "react-spinners";
import Grow from "@mui/material/Grow";
import { useCart } from "../../../Auth/user/context/CartProvider";

export default function ImageListProduct({ order }) {
  const [products, setProducts] = useState([]);
  const [hoveredImages, setHoveredImages] = useState({});
  const [loading, setloading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [error, seterror] = useState(false)
  const [carrito, setcarrito] = useState([]);


  const { handleAddToCart,handleRemoveToCart, cart, addToCart, removeFromCart } = useCart();

  
  // const handleCarrito = (item) => {
  //   if (!cart.find((prod) => prod.id === item.id)) {
  //     addToCart(item);
  //     handleAddToCart()
  //   } else {
  //     removeFromCart(item.id);
  //     handleRemoveToCart()
  //   }
  // };


  useEffect(() => {
    const getProducts = async () => {
      try {
        setloading(true);
        const data = await getAllProuducs();
        setProducts(data);
      } catch (error) {
        seterror(true)
        console.error("Error fetching products:", error);
      } finally {
        setloading(false);
        setImagesLoaded(true);
      }
    };
    getProducts();
  }, []);

  const sortedProducts = [...products];

  if (order === "Fecha") {
    sortedProducts.sort(
      (a, b) =>
        new Date(b.fecha_de_publicacion) - new Date(a.fecha_de_publicacion)
    );
  }

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    await deleteProduct(id);
    const data = await getAllProuducs();
    setProducts(data);
  };

  const handleActualizar = (id) => {
    navigate(`/details/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const handleMouseEnter = (id, hoverPath) => {
    setHoveredImages((prev) => ({ ...prev, [id]: hoverPath }));
  };

  const handleMouseLeave = (id, originalPath) => {
    setHoveredImages((prev) => ({ ...prev, [id]: originalPath }));
  };

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
  else if (error){
    return (
      <Typography sx={{mt: 8}}>
        Ha ocurrido un error
      </Typography>
    )

  }
  return (
    <ImageList cols={4} gap={16} sx={{ height: "900px" }}>
      {sortedProducts.map((item) => {
        const originalPath = `http://localhost:3000/api/products/file/${item.path.replace(
          "\\",
          "/"
        )}`;
        const hoverPath = item.hoverPath
          ? `http://localhost:3000/api/products/file/${item.hoverPath.replace(
              "\\",
              "/"
            )}`
          : originalPath;

        return (
          <Grow in={imagesLoaded} timeout={1000}>
            <ImageListItem
              key={item.id}
              sx={{
                width: 278,
                borderRadius: 2,
                position: "relative",
                mt: 2,
                transition: "background-color 2s ease",
              }}
              >
              <Box
              onClick={() => {
                handleDetails(item.id);
              }}
                className="img-hoverable"
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  transition: "background-color 0.3s ease",
                  cursor: 'pointer'
                }}
                onMouseEnter={() => handleMouseEnter(item.id, hoverPath)}
                onMouseLeave={() => handleMouseLeave(item.id, originalPath)}
              >
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
                <IconButton
                  sx={{ borderRadius: "50%" }}
                  onClick={() => handleCarrito(item)}
                >
                 
                    <ShoppingCartOutlinedIcon
                      sx={{ color: "gray", fontSize: "30px" }}
                    />
                  
                </IconButton>

                {/* <IconButton
                sx={{ borderRadius: "50%", backgroundColor: "#D9D9D9" }}
                onClick={() => handleActualizar(item.id)}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                sx={{ borderRadius: "50%", backgroundColor: "#D9D9D9" }}
                onClick={() => handleDelete(item.id)}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton> */}
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", mb: 0 }}>
                <ImageListItemBar title={item.name} position="below" />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 0 }}>
                <ImageListItemBar title={`C$${item.price}`} position="below" />
              </Box>
            </ImageListItem>
          </Grow>
        );
      })}
    </ImageList>
  );
}
