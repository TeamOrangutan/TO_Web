import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Alert, Box, IconButton, Snackbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { BarLoader } from "react-spinners";
import Grow from "@mui/material/Grow";
import { useTheme, useMediaQuery } from "@mui/material";
import { deleteProduct, getAllProuducs } from "../../Api/user/productsApi";
import { AuthContext } from "../../Auth/user/context/AuthContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useModal from "../../hooks/useModal";
import ModalEditarProduct from "./ModalEditarProduct";
export default function ListProducts({
  order,
  filtroEstado,
  filtroNombre,
  refresh,
  onProductAdded,
}) {
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
  const { open2, handleClose2, handleOpen2 } = useModal();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [open3, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  let cols = 4;
  if (isXs) cols = 1;
  else if (isSm) cols = 2;
  else if (isMd) cols = 3;

  const getProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProuducs();
      setProducts(data);
    } catch (error) {
      setError(true);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setImagesLoaded(true);
    }
  };
  useEffect(() => {
    getProducts();
  }, [refresh]);

  let productosFiltrados = [...products];
  if (filtroEstado !== "Todos") {
    productosFiltrados = productosFiltrados.filter(
      (p) => p.estado === filtroEstado
    );
  }

  if (filtroNombre) {
    productosFiltrados = productosFiltrados.filter((p) =>
      p.name.toLowerCase().includes(filtroNombre.toLowerCase())
    );
  }

  let productosOrdenados = [...productosFiltrados];
  if (order === "Fecha") {
    productosOrdenados.sort(
      (a, b) =>
        new Date(b.fecha_de_publicacion) - new Date(a.fecha_de_publicacion)
    );
  }
  const handleDelete = async (id) => {
    try {
      const data = await deleteProduct(id);
      await getProducts();
    } catch (error) {
      throw error;
    }
  };

  const handleMouseEnter = (id, hoverPath) => {
    setHoveredImages((prev) => ({ ...prev, [id]: hoverPath }));
  };

  const handleMouseLeave = (id, originalPath) => {
    setHoveredImages((prev) => ({ ...prev, [id]: originalPath }));
  };

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setOpen(true);
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

  if (error) {
    return <Typography sx={{ mt: 8 }}>Ha ocurrido un error</Typography>;
  }
  console.log("productosFiltrados.length");
  console.log(productosFiltrados.length);

  return (
    <Box>
      <ImageList
        cols={cols}
        gap={10}
        sx={{
          width: "100%",
          height: "auto",
        }}
      >
        {productosOrdenados.map((item) => {
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
            <Grow in={imagesLoaded} timeout={1000} key={item.id}>
              <ImageListItem
                sx={{
                  width: 220,
                  borderRadius: 2,
                  position: "relative",
                  mt: 2,
                  mb: 2,
                  transition: "background-color 2s ease",
                  border: "1px solid #EBEBEB",
                  boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                {item.estado === "Agotado" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: { xs: 80, md: 140 },
                      left: "50%",
                      transform: "translateX(-50%) rotate(-10deg)",
                      backgroundColor: "rgba(255, 0, 0, 0.74)",
                      color: "white",
                      padding: "10px 10px",
                      borderRadius: "5px",
                      zIndex: 2,
                      fontWeight: "bold",
                      fontSize: { xs: 30, md: 25 },

                      border: "2px solid #EBEBEB",
                    }}
                  >
                    AGOTADO
                  </Box>
                )}

                <Box
                  onClick={() => {
                    setSelectedProduct(item);
                    handleOpen2();
                  }}
                  className="img-hoverable"
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: 230,
                    overflow: "hidden",
                    cursor: "pointer",
                    "& img": {
                      transition: "transform 0.9s ease-in-out",
                    },
                    "&:hover img": {
                      transform: "scale(1.1)",
                    },
                    "& .overlay": {
                      position: "absolute",
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
                  <IconButton
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                    sx={{
                      borderRadius: "50%",
                      backgroundColor: "#EBEBEB",
                      zIndex: 2,
                    }}
                  >
                    <DeleteOutlineOutlinedIcon
                      sx={{ color: "gray", fontSize: "30px" }}
                    />
                  </IconButton>
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

      <ModalEditarProduct
        open={open2}
        handleClose={handleClose2}
        handleOpen={handleOpen2}
        onProductAdded={onProductAdded}
        product={selectedProduct}
        showMessage={showMessage}
      />

      <Snackbar
        sx={{ mt: 8 }}
        open={open3}
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
    </Box>
  );
}
