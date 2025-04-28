import fondo from "../../assets/user/fondo.png";
import fondo2 from "../../assets/user/fondo2.png";
import { Box } from "@mui/material";
import Navbar from "../../Components/user/Navbar/Navbar";
import ExplorarColeccion from "../../Components/user/Home/ExplorarColeccion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={1000}
        swipeable={false}
        emulateTouch={false}
        stopOnHover={false}
      >
        <div
          style={{
            width: "100vw",
            height: "140vh",
            backgroundImage: `url(${fondo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        ></div>
        <div
          style={{
            width: "100vw",
            height: "140vh",
            backgroundImage: `url(${fondo2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        ></div>
      </Carousel>

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
