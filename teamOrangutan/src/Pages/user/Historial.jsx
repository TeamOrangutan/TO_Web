import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  Card,
  CardMedia,
  Dialog,
  Grow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Footer from "../../Components/user/Footer";
import Navbar from "../../Components/user/Navbar/Navbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import kaiz from "../../assets/user/kaiz3.png";
import lamona from "../../assets/user/lamona.png";
import varitas from "../../assets/user/5varitas.png";
import enano from "../../assets/user/enano.png";
import dario from "../../assets/user/dario.png";
import gueguense from "../../assets/user/gueguense.png";
import gueguense2 from "../../assets/user/gueguense2.png";
import macabra from "../../assets/user/macabra.png";
import guarda1 from "../../assets/user/guarda1.png";
import guarda2 from "../../assets/user/guarda2.png";

const artworks = [
  { image: lamona },
  { image: varitas },
  { image: enano },
  { image: dario },
  { image: gueguense2 },
  { image: gueguense },
  { image: macabra },
  { image: guarda1 },
  { image: guarda2 },
];

export const Historial = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const itemsPerSlide = isMdUp ? 3 : 1;

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box>
      <Navbar />
      <Grow in timeout={1000}>
        <Box>
          <Container sx={{ py: 8, mt: 5 }}>
            <Grid container alignItems="center" spacing={4}>
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    borderRadius: "50%",
                    boxShadow: 3,
                    width: 300,
                    height: 300,
                    overflow: "hidden",
                    mx: "auto",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={kaiz}
                    alt="Kaiz Orangután"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Kaiz Orangután
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Fundador, artista visual y diseñador de moda. Kaiz fusiona arte
                  urbano, cultura ancestral y sostenibilidad en cada prenda. Su
                  visión es vestir a las personas como si fueran una obra de arte
                  viviente.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Desde 2013, ha transformado simples camisas en piezas expresivas
                  que cuentan historias. Cada diseño es único, ético y lleno de
                  propósito.
                </Typography>
              </Grid>
            </Grid>

            <Box mt={8}>
              <Typography sx={{ml: 8}} variant="h5" fontWeight="bold" gutterBottom>
                Obras destacadas
              </Typography>

              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={5000}
                transitionTime={1000}
                swipeable
                emulateTouch
                stopOnHover
                centerMode={itemsPerSlide === 1} 
                centerSlidePercentage={itemsPerSlide === 1 ? 80 : 100}
                dynamicHeight={false}
              >
                {Array.from({
                  length: Math.ceil(artworks.length / itemsPerSlide),
                }).map((_, index) => {
                  const start = index * itemsPerSlide;
                  const group = artworks.slice(start, start + itemsPerSlide);

                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        width: "100%",
                        flexWrap: "nowrap",
                      }}
                    >
                      {group.map((obra, i) => (
                        <Card
                          key={i}
                          sx={{
                            borderRadius: 3,
                            boxShadow: 2,
                            cursor: "pointer",
                            flex: `1 1 ${
                              itemsPerSlide === 1 ? "80%" : "30%"
                            }`,
                            maxWidth: itemsPerSlide === 1 ? "80%" : "320px",
                            minWidth: itemsPerSlide === 1 ? "80%" : "200px",
                          }}
                          onClick={() => handleOpen(obra.image)}
                        >
                          <CardMedia
                            component="img"
                            image={obra.image}
                            sx={{
                              width: "100%",
                              height: 400,
                              objectFit: "cover",
                            }}
                            alt={`Obra ${index * itemsPerSlide + i + 1}`}
                          />
                        </Card>
                      ))}
                    </Box>
                  );
                })}
              </Carousel>
            </Box>
          </Container>
          <Footer />
          <Dialog open={open} onClose={handleClose} maxWidth="md">
            <Box
              component="img"
              src={selectedImage}
              alt="Imagen ampliada"
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Dialog>
        </Box>
      </Grow>
    </Box>
  );
};

export default Historial;
