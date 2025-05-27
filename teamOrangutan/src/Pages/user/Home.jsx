import fondo from "../../assets/user/fondo.png";
import fondo2 from "../../assets/user/fondo2.png";
import { Box, Fade, Grow } from "@mui/material";
import Navbar from "../../Components/user/Navbar/Navbar";
import ExplorarColeccion from "../../Components/user/Home/ExplorarColeccion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Footer from "../../Components/user/Footer";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Fade in={true} timeout={1200}>
        <Box>
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
                backgroundPosition: "59%",
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
                backgroundPosition: "47%",
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
          <Footer />
        </Box>
      </Fade>
    </>
  );
};

export default Home;
