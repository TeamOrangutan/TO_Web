import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import Footer from "../../Components/user/Footer";

const products = [
  {
    id: 1,
    title: "Camisa Clásica Blanca",
    description: "Perfecta para ocasiones formales.",
    image: "https://via.placeholder.com/300x200?text=Camisa+Blanca",
  },
  {
    id: 2,
    title: "Camisa Casual Azul",
    description: "Ideal para el día a día.",
    image: "https://via.placeholder.com/300x200?text=Camisa+Azul",
  },
  {
    id: 3,
    title: "Camisa Estampada",
    description: "Destaca con estilo único.",
    image: "https://via.placeholder.com/300x200?text=Camisa+Estampada",
  },
];

export const Historial = () => {
  return (
    <>
      {/* Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Tienda de Camisas
          </Typography>
          <Button color="inherit">Iniciar Sesión</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ py: 8, backgroundColor: "#f5f5f5", textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom>
            Encuentra tu estilo ideal
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Camisas elegantes, cómodas y de alta calidad
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Ver Catálogo
          </Button>
        </Container>
      </Box>

      {/* Product Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Nuestras Camisas
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="outlined">
                    Ver más
                  </Button>
                  <Button size="small" variant="contained">
                    Comprar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

     <Footer/>
    </>
  );
}

export default Historial