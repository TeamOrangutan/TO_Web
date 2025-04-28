import { AppBar, Badge, Box, Toolbar, Typography } from "@mui/material";
import logo from "../../../assets/user/PrimalGarage-White.png";
import logo2 from "../../../assets/user/logo2.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Person from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useAnimateCart from "../../../hooks/useAnimateCart";
import { useCart } from "../../../Auth/user/context/CartProvider";
export const Navbar = () => {
  const [bgColor, setBgColor] = useState("transparent");
  const [logoSRC, setlogo] = useState(logo);
  const [textColor, setTextColor] = useState("white");

  const {cartCount, isAnimating,  handleAddToCart} = useCart()


  useEffect(() => {
    if (
      window.location.pathname === "/products" ||
      window.location.pathname.startsWith("/actualizarProduct") ||
      window.location.pathname === "/historial" ||
      window.location.pathname.startsWith("/details")
    ) {
      setBgColor("#DEDEDE");
      setTextColor("black");
      setlogo(logo2);
    } else {
      const handleScroll = () => {
        if (window.scrollY > 870) {
          setBgColor("#DEDEDE");
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

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: bgColor,
            boxShadow: "none",
            transition: "background-color 0.5s linear",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Grupo central */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 2, md: 5 },
                flexGrow: 1,
              }}
            >
              <Link to="/home" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    color: textColor,
                    fontSize: { xs: "16px", sm: "18px" },
                    fontWeight: "bold",
                  }}
                >
                  INICIO
                </Typography>
              </Link>

              <Link to="/products" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "16px", sm: "18px" },
                    fontWeight: "bold",
                    color: textColor,
                  }}
                >
                  PRODUCTOS
                </Typography>
              </Link>

              <Box
                component="img"
                src={logoSRC}
                alt="logo"
                sx={{
                  width: { xs: "100px", sm: "150px" },
                  height: "auto",
                }}
              />

              <Link to="/historial" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "16px", sm: "18px" },
                    fontWeight: "bold",
                    color: textColor,
                  }}
                >
                  ABOUT
                </Typography>
              </Link>

              <Typography
                sx={{
                  fontSize: { xs: "16px", sm: "18px" },
                  fontWeight: "bold",
                  color: textColor,
                }}
              >
                CONTACTO
              </Typography>
            </Box>

            {/* Grupo final: íconos */}
            <Box sx={{ display: "flex", gap: 3, mr: 3 }}>
              <Person
                fontSize="large"
                sx={{ color: textColor, cursor: "pointer" }}
              />
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartIcon
               
                  fontSize="large"
                  sx={{
                    transition: "transform 0.3s ease",
                    transform: isAnimating
                      ? "scale(1.4) rotate(-10deg)"
                      : "scale(1)",
                    color: textColor,
                  }}
                />
              </Badge>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
