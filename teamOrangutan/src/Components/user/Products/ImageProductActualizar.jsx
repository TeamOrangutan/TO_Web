import { Box, Button, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CustomTypography from "../CustomTypography";

export const ImageProductActualizar = ({ path, hoverPath, onImageChange }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setcurrentIndex] = useState(0);

  useEffect(() => {
    if (path || hoverPath) {
      const formattedPaths = [path, hoverPath]
        .filter(Boolean)
        .map(
          (imgPath) =>imgPath
        );
      setImages(formattedPaths);
    }
  }, [path, hoverPath]);

  // Maneja el reemplazo de imagen en el índice actual
  const handleReplaceImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      const newImages = [...images];
      newImages[currentIndex] = fileURL; // Reemplaza la imagen en el índice actual
      setImages(newImages); // Actualiza el estado con la nueva imagen

      if (onImageChange) {
        onImageChange(file, currentIndex);
      }
    }
  };

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      const nextIndex = currentIndex + 1;
      const newImages = [...images];

      if (nextIndex < newImages.length) {
        newImages[nextIndex] = fileURL;
      } else {
        newImages.push(fileURL); // Agrega una nueva imagen si es necesario
      }

      setImages(newImages);
      setcurrentIndex(
        nextIndex >= newImages.length ? newImages.length - 1 : nextIndex
      );

      if (onImageChange) {
        onImageChange(file, nextIndex);
      }
    }
  };

  // Cambia a la siguiente imagen
  const nextImage = () => {
    setcurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Cambia a la imagen anterior
  const prevImage = () => {
    setcurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box
      sx={{
        width: { xs: "90%", sm: "70%", md: "60%"},
        height: { xs: 250, sm: 300, md: 400 },
        position: "relative",
        mt: 4,
        mx: "auto",
      }}
    >
      {/* Flecha anterior */}
      <IconButton
        onClick={prevImage}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {/* Imagen principal */}
      <Button
        variant="contained"
        component="label"
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "white",
          fontSize: "80px",
          color: "black",
          padding: 0,
        }}
      >
        {images[currentIndex] ? (
          <img
            src={images[currentIndex]}
            alt="Producto"
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Typography sx={{ color: "gray", px: 2, textAlign: "center" }}>
              Toca para agregar una imagen
            </Typography>
          </Box>
        )}

        {/* input de archivo descomentable si se usa */}
        {/* <input type="file" name="replaceImage" hidden onChange={handleReplaceImage} /> */}
      </Button>

      {/* Flecha siguiente */}
      <IconButton
        onClick={nextImage}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Miniatura o botón agregar */}
      <Box
        sx={{
          position: "absolute",
          bottom: -60,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Button
          variant="contained"
          component="label"
          sx={{
            width: 80,
            height: 80,
            backgroundColor: "white",
            border: "1px solid black",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {images[currentIndex] ? (
            <img
              src={images[(currentIndex + 1) % (images.length || 1)]}
              alt="Miniatura"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <AddIcon />
          )}
          {/* <input type="file" name="addImage" hidden onChange={handleAddImage} /> */}
        </Button>
      </Box>
    </Box>
  );
};

export default ImageProductActualizar;
