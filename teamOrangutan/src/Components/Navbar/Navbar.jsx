import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import logo from "../../assets/PrimalGarage-White.png";
import logo2 from "../../assets/logo2.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [bgColor, setBgColor] = useState("transparent");
  const [logoSRC, setlogo] = useState(logo);
  const [textColor, setTextColor] = useState("white");

  useEffect(() => {
    if (window.location.pathname === "/products" || window.location.pathname === "/actualizarProduct" ||  
      window.location.pathname === "/historial"
    ) {
      setBgColor("#DEDEDE"); 
      setTextColor("black");  
      setlogo(logo2)
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
              justifyContent: "center", // Centra los elementos en el Toolbar
              alignItems: "center",
              gap: { xs: 2, md: 5 }, // Espaciado entre elementos
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  ml: { xs: 6 },
                  color: textColor,
                  fontSize: "18px",
                  fontWeight: "bold ",
                }}
              >
                INICIO
              </Typography>
            </Link>

            <Link to="/products" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  ml: { xs: 9 },
                  fontSize: "18px",
                  fontWeight: "bold ",
                  color: textColor,
                }}
              >
                PRODUCTOS
              </Typography>
            </Link>
            <Box
              src={logoSRC}
              alt="logo"
              component="img"
              sx={{
                ml: "40px",
                width: "150px",
                height: "80px",
              }}
            />
             <Link to="/historial" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                ml: { xs: 8 },
                fontSize: "18px",
                fontWeight: "bold ",
                color: textColor,
              }}
            >
              HISTORIAL
            </Typography>
             </Link>
            <Typography
              sx={{
                ml: { xs: 7 },
                fontSize: "18px",
                fontWeight: "bold ",
                color: textColor,
              }}
            >
              SOBRE NOSOTROS
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
