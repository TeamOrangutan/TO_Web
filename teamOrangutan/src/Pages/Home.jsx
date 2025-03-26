import fondo from "../assets/fondo.png";
import fondo2 from "../assets/fondo2.png";
import { Box, Typography } from "@mui/material";
import Navbar from "../Components/Navbar/Navbar";
import ExplorarColeccion from "../Components/Home/ExplorarColeccion";

export const Home = () => {
  
  return (
    <>
      <Navbar />
      <Box
        sx={{
          left: 0,
          width: "100vw",
          height: "140vh",
          backgroundImage: `url(${fondo})`,
          backgroundSize: "contain",
          backgroundPosition: "center",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          margin: 0,
          padding: 0,
        }}
      ></Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "white",
          padding: "50px 0",

        }}
      >
        <ExplorarColeccion />
      </Box>
    </>
  );
};

export default Home;
