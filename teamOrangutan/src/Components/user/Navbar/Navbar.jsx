import {
  AppBar,
  Badge,
  Box,
  Button,
  Grow,
  IconButton,
  Popover,
  Popper,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../../../assets/user/PrimalGarage-White.png";
import logo2 from "../../../assets/user/logo2.png";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useCart } from "../../../Auth/user/context/CartProvider";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteItemCarrito } from "../../../Api/user/carrito";
import ProductItem from "./ProductItem";

import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import InfoIcon from "@mui/icons-material/Info";

import { AuthContext } from "../../../Auth/user/context/AuthContext";
export const Navbar = () => {
  const { cart, fetchProductsInCart, cartCount, isAnimating, refreshCart } =
    useCart();
  const [productos, setproductos] = useState([]);
  const [bgColor, setBgColor] = useState("transparent");
  const [border, setBorder] = useState("transparent");
  const [logoSRC, setlogo] = useState(logo);
  const [textColor, setTextColor] = useState("white");
  const [hoveredImages, setHoveredImages] = useState({});
  const { logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const menuItems = [
    { label: "INICIO", path: "/home", icon: <HomeIcon /> },
    { label: "PRODUCTOS", path: "/products", icon: <StorefrontIcon /> },
    { label: "ACERCA DE", path: "/acercaDe", icon: <InfoIcon /> },
  ];
  useEffect(() => {
    const loadProducts = async () => {
      const productosActualizados = await fetchProductsInCart();
      setproductos(productosActualizados);
    };

    if (cart.items.length > 0) {
      loadProducts();
    } else {
      setproductos([]);
    }
  }, [cart.items]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (
      window.location.pathname === "/products" ||
      window.location.pathname.startsWith("/actualizarProduct") ||
      window.location.pathname === "/acercaDe" ||
      window.location.pathname.startsWith("/details") ||
      window.location.pathname.startsWith("/carrito") ||
      window.location.pathname.startsWith("/Perfil") ||
      window.location.pathname.startsWith("/payments") ||
      window.location.pathname.startsWith("/reset-password")
    ) {
      setBgColor("white");
      setTextColor("black");
      setBorder("1px solid rgb(230, 229, 229)");
      setlogo(logo2);
    } else {
      const handleScroll = () => {
        if (window.scrollY > 870) {
          setBgColor("white");
          setlogo(logo2);
          setTextColor("black");
        } else {
          setBgColor("transparent");
          setlogo(logo);
          setTextColor("white");
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleDeleteItemCarrito = async (id) => {
    try {
      const data = await deleteItemCarrito(id);
      console.log(data);
      await refreshCart();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logoutUser();
        navigate("/");
      }
    }
  };

  const handleVerCarrito = () => {
    navigate("/carrito");
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: bgColor,
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)", // sombra suave y difusa      transition: "background-color 0.5s linear",
            borderBottom: border,
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              position: "relative",
            }}
          >
            {isMobile ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ color: textColor }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1.5, sm: 3, md: 5 },
                  flex: 1,
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  mb: { xs: 1, sm: 0 },
                }}
              >
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "14px", sm: "16px", md: "18px" },
                        fontWeight: 500,
                        color: textColor,
                        position: "relative",
                        cursor: "pointer",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          width: 0,
                          height: "2px",
                          left: 0,
                          bottom: -2,
                          backgroundColor: "black",
                          transition: "width 0.3s ease",
                        },
                        "&:hover::after": {
                          width: "100%",
                        },
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Link>
                ))}
              </Box>
            )}

            <Box
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Box
                component="img"
                src={logoSRC}
                alt="logo"
                sx={{ width: { xs: "100px", sm: "120px" }, height: "auto" }}
              />
            </Box>

            {/* Grupo derecho */}
            <Box
              sx={{
                display: "flex",
                gap: { xs: 0, sm: 1 },
                mr: { sm: 3, xs: 0 },
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <IconButton onClick={() => navigate("/Perfil")}>
                <PersonOutlinedIcon
                  fontSize="large"
                  sx={{ color: textColor, cursor: "pointer" }}
                />
              </IconButton>
              <Badge
                badgeContent={cartCount}
                color="primary"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{ "& .MuiBadge-badge": { top: 6, right: 6 } }}
              >
                <IconButton onMouseEnter={handlePopoverOpen}>
                  <ShoppingCartOutlinedIcon
                    fontSize="large"
                    sx={{
                      transition: "transform 0.3s ease",
                      transform: isAnimating
                        ? "scale(1.4) rotate(-10deg)"
                        : "scale(1)",
                      color: textColor,
                    }}
                  />
                </IconButton>
                <Popper
                  onMouseLeave={handlePopoverClose}
                  open={open}
                  anchorEl={anchorEl}
                  placement="bottom-start"
                  sx={{
                    width: { xs: "90vw", sm: 380 },
                    height: 400,
                    padding: 2,
                    backgroundColor: "white",
                    zIndex: 9999,
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid rgb(230, 229, 229)",
                    borderRadius: 2,
                    right: { xs: 10, sm: 0 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography fontWeight="bold" color="black">
                      Tu Carrito ({productos.length})
                    </Typography>
                    <Typography
                      color="gray"
                      sx={{ cursor: "pointer" }}
                      onClick={handlePopoverClose}
                    >
                      Cerrar
                    </Typography>
                  </Box>

                  <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                    {productos.length > 0 ? (
                      productos.map((item, index) => (
                        <Box key={index} sx={{ display: "flex", mb: 2 }}>
                          <ProductItem item={item} />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography
                              fontWeight="bold"
                              color="black"
                              fontSize={15}
                            >
                              {item.name}
                            </Typography>
                            <Typography fontSize={13} color="gray">
                              Talla: {item.size}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 0.5,
                              }}
                            >
                              <Typography fontSize={13} color="gray">
                                Cantidad: {item.quantity}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ textAlign: "right" }}>
                            <Typography color="black" fontWeight="bold">
                              C${item.price}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDeleteItemCarrito(item.Item_Id)
                              }
                            >
                              <DeleteOutlineIcon
                                sx={{ fontSize: 18, color: "gray" }}
                              />
                            </IconButton>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Typography sx={{ color: "black" }}>
                        El carrito está vacío
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ borderTop: "1px solid #e0e0e0", pt: 2 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography fontWeight="bold" color="black">
                        Subtotal:
                      </Typography>
                      <Typography fontWeight="bold" color="black">
                        C$
                        {productos
                          .reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        onClick={() => handleVerCarrito()}
                        fullWidth
                        variant="contained"
                        sx={{
                          backgroundColor: "black",
                          color: "white",
                          mb: 1,
                          borderRadius: "8px",
                          fontWeight: "bold",
                          ":hover": {
                            backgroundColor: "#333",
                          },
                        }}
                      >
                        VER CARRITO ({cart.items.length})
                      </Button>
                    </Box>
                  </Box>
                </Popper>
              </Badge>
            </Box>
          </Toolbar>
       <Drawer
  anchor="left"
  open={mobileOpen}
  onClose={handleDrawerToggle}
  sx={{
    "& .MuiDrawer-paper": {
      width: 240,
      padding: 2,
    },
  }}
>
  <List>
    {menuItems.map((item) => (
      <ListItem
        button
        key={item.path}
        onClick={() => {
          navigate(item.path);
          setMobileOpen(false);
        }}
        sx={{ cursor: "pointer" }}
      >
        {/* Ícono a la izquierda */}
        <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
          {item.icon}
        </Box>

        {/* Texto en negrita */}
        <ListItemText
          primary={
            <Typography fontWeight="bold">
              {item.label}
            </Typography>
          }
        />
      </ListItem>
    ))}
  </List>
</Drawer>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
