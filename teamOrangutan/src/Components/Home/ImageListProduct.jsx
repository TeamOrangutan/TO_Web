import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, IconButton, ImageListItemBar } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import image1 from "../../assets/image1.png";
import image2 from "../../assets/imagen2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import { useNavigate } from "react-router-dom";


export default function ImageListProduct() {

const navigate = useNavigate()

const handleActualizar = () =>{
  navigate('/actualizarProduct')
}
 
  return (
    <ImageList
    sx={{ height: 600,  }}
    variant="standard"
    cols={4}
    gap={10} // Reducido para mejor distribución
  >
    {itemData.map((item) => (
      <ImageListItem key={item.img} sx={{ width: 250, height: 180 }}  > 
        <img
          srcSet={`${item.img}?w=250&h=180&fit=crop&auto=format&dpr=2 2x`}
          src={`${item.img}?w=250&h=180&fit=crop&auto=format`}
          alt={item.title}
          loading="lazy"
          style={{
            width: "100%", 
            height: "100%", 
            objectFit: "cover", // Mantiene la proporción sin deformarse
            borderRadius: "8px" // Opcional para bordes redondeados
          }}
        />

         
<Box sx={{ position: "absolute", top: 10, right: 10, display: "flex", flexDirection: "column", gap: 1 }}>
        <IconButton
          sx={{
            borderRadius: "50%",
            backgroundColor: "#D9D9D9",
          }}
          onClick={handleActualizar}
        >
          <EditOutlinedIcon />
        </IconButton>

        <IconButton
          sx={{
            borderRadius: "50%",
            backgroundColor: "#D9D9D9",
          }}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Box>
         
          <Box sx={{ display: "flex", justifyContent: "center", mb: 0 }}>
            <ImageListItemBar title={item.title} position="below" />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 0 }}>
            <ImageListItemBar title={item.price} position="below" />
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: image1,
    title: "Producto1",
    price: "200",
  },
  {
    img: image2,
    title: "Producto1",
    price: "200",
  },
  {
    img: image3,
    title: "Producto1",
    price: "200",
  },
  {
    img: image4,
    title: "Producto1",
    price: "200",
  },
  {
    img: image3,
    title: 'Chairs',
    price: "200",
  },
  {
    img: image2,
    title: "Producto1",
    price: "200",
  },
  {
    img: image3,
    title: "Producto1",
    price: "200",
  },  {
    img: image4,
    title: "Producto1",
    price: "200",
  },
  // {
  //   img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
  //   title: 'Candle',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
  //   title: 'Laptop',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
  //   title: 'Doors',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
  //   title: 'Coffee',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
  //   title: 'Storage',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
  //   title: 'Coffee table',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
  //   title: 'Blinds',
  // },
];
