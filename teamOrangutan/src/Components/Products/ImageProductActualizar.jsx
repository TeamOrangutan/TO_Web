import { Box, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import image2 from "../../assets/imagen2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const ImageProductActualizar = () => {
  const apiImages = [image2, image3, image4];

  const [images, setImages] = useState(apiImages);
  const [currentIndex, setcurrentIndex] = useState(0);

   
  const nextImage = () => {
    setcurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setcurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  console.log(images);

  return (
    <Box sx={{ width: "28%", height: 400, position: "relative" }}>
      <IconButton
        onClick={prevImage}
        sx={{
          position: "absolute",
          left: 10,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Button
        variant="contained"
        component="label"
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          fontSize: "80px",
          color: "black",
          padding: 0,
          boxShadow: "none",
        }}
      >
        {/* <AddIcon /> */}
        <img src={images[currentIndex]} width={700} />
        <input type="file" name="productImage" hidden />
      </Button>
      <IconButton
        onClick={nextImage}
        sx={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
        <Button
          variant="contained"
          component="label"
          sx={{
            width: 100,
            height: 85,
            backgroundColor: "white",
            fontSize: "80px",
            color: "black",
            border: "1px solid gray",

            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={
              currentIndex + 1 < images.length
                ? images[currentIndex + 1]
                : images[0]
            }
            alt="Vista previa"
            style={{
              width: "90%",
              height: "100%",
              objectFit: "cover", // Ajusta la imagen sin distorsionarla
            }}
          />
          <input type="file" name="productImage" hidden />
        </Button>
        <Button
          variant="contained"
          component="label"
          sx={{
            width: 100,
            height: 85,
            backgroundColor: "white",
            fontSize: "80px",
            color: "black",
            border: "1px solid gray",
            padding: 0,
          }}
        >
            <AddIcon/>
          <input type="file" name="productImage" hidden />
        </Button>
      </Box>
    </Box>
  );
};

export default ImageProductActualizar;
