import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";

import ImageProductActualizar from "./ImageProductActualizar";
import useForm from "../../../hooks/useForm";
import { updateProduct } from "../../../Api/user/productsApi";

export const FormActualizarProduct = ({ product }) => {
  const { setFormData, handleSubmitUpdate } = useForm();

  const [productUpdate, setProduct] = useState({
    nombre: "",
    descripcion: "",
    precioVenta: "",
    estado: "Disponible", // Valor predeterminado
    tallas: [],
    images: [],
  });

  useEffect(() => {
    if (product) {
      let images = [];

      // Si el producto tiene una imagen en path, no lo tratamos como File todavía
      if (typeof product.path === "string") {
        images = [product.path]; // Guardamos la ruta como string (puedes filtrarla luego si hace falta)
      } else if (Array.isArray(product.path)) {
        images = product.path;
      }

      setProduct({
        nombre: product.name || "",
        descripcion: product.description || "",
        precioVenta: product.price || "00.00",
        estado: product.estado || "Disponible",
        tallas: product.tallas || [],
        images: images,
      });
    }
  }, [product]);

 
  const navigate = useNavigate();
  const { id } = useParams();
  const handleBack = () => {
    navigate("/products");
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // 'name' y 'value' del campo
    setProduct({
      ...productUpdate,
      [name]: value, // Asignamos el valor dinámicamente según el nombre del campo
    });
  };

  const handleIncrement = (index) => {
    setProduct((prev) => {
      const tallasActualizadas = [...prev.tallas];
      tallasActualizadas[index].stock += 1;
      return { ...prev, tallas: tallasActualizadas };
    });
  };

  const handleDecrement = (index) => {
    setProduct((prev) => {
      const tallasActualizadas = [...prev.tallas];
      if (tallasActualizadas[index].stock > 0) {
        tallasActualizadas[index].stock -= 1;
      }
      return { ...prev, tallas: tallasActualizadas };
    });
  };

  const handleImageChange = (file, index) => {
    console.log("file");
    console.log(file);
    setProduct((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = file; // puedes guardar el File directamente para subirlo después
      return { ...prev, images: updatedImages };
    });
  };

  console.log("PRODUCTO UPDATE111111");
  console.log(productUpdate.tallas);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProduct(id, {
        nombre: productUpdate.nombre,
        descripcion: productUpdate.descripcion,
        precioVenta: productUpdate.precioVenta,
        estado: productUpdate.estado,
        tallas: productUpdate.tallas,
        images: productUpdate.images,
      });
      console.log("Producto actualizado:", response);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return product.name ? (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box
          sx={{
            mt: 5,
          }}
        >
          <Box sx={{ position: "absolute", left: 500, ml: 20, mt: 2 }}>
            {/* Cambié el 'name' por 'name' y asigné el valor 'productUpdate.name' */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ textAlign: "left", fontSize: "20px" }}>
                Nombre
              </Typography>
              <TextField
                name="nombre" // Usamos 'name' aquí
                value={productUpdate.nombre} // Asegúrate de usar 'productUpdate.name'
                onChange={handleChange} // Manejamos el cambio correctamente
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{
                  width: "60%",
                  mt: 1,
                  background: "transparent",
                  border: "none",
                  "& input": {
                    padding: 1,
                    height: "30px",
                    border: "1px solid #ccc",
                    fontSize: "18px",
                    borderRadius: "5px",
                  },
                }}
              />
              <Typography sx={{ textAlign: "left", fontSize: "20px", mt: 2 }}>
                Precio
              </Typography>
              <TextField
                name="precioVenta"
                type="number"
                variant="outlined"
                value={productUpdate.precioVenta}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography
                        sx={{
                          fontSize: "18px",

                          color: "black",
                          marginRight: "4px", // Espaciado para que no se pegue al número
                        }}
                      >
                        C$
                      </Typography>
                    </InputAdornment>
                  ),
                  sx: {
                    "& input": {
                      textAlign: "left",
                      height: "17px",
                      fontSize: "18px",
                    },
                    mt: 1,
                  },
                }}
                sx={{
                  width: "60%", // Ajusta el tamaño del campo
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px", // Bordes redondeados
                  },
                }}
              />
            </Box>
            <Box sx={{ width: 700, mt: 3 }}>
              <Typography sx={{ textAlign: "left", fontSize: "20px", mt: 2 }}>
                Descripcion
              </Typography>
              <TextareaAutosize
                minRows={3}
                name="descripcion"
                value={productUpdate.descripcion}
                onChange={handleChange}
                style={{
                  width: "59%",
                  fontSize: "16px",
                  padding: "6px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  textAlign: "left",
                }}
                placeholder="Descripción "
              />
            </Box>
            <Box mt={1} sx={{ display: "flex", gap: 1, mt: 5 }}>
              <FormControl sx={{ width: 430 }}>
                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={productUpdate.estado}
                  label="estado"
                  onChange={handleChange}
                  name="estado"
                >
                  <MenuItem value={"agotado"}>Agotado</MenuItem>
                  <MenuItem value={"Disponible"}>Disponible</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography sx={{ textAlign: "left", fontSize: "20px", mt: 2 }}>
              Tallas y Stock
            </Typography>
            {productUpdate.tallas && product.tallas.length > 0 ? (
              <Grid
                container
                spacing={1}
                mt={1}
                sx={{ width: 570, flexWrap: "wrap" }}
              >
                {productUpdate.tallas.map((talla, index) => {
                  const isSelected = talla.cantidad > 0;
                  const isOutOfStock = talla.stock === 0;

                  return (
                    <Grid item key={index} sx={{ display: "flex" }}>
                      <Paper
                        elevation={isSelected ? 4 : 1}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: isSelected
                            ? "2px solid black"
                            : "1px solid #eee",
                          backgroundColor: isSelected ? "#f5f5f5" : "#fff",
                          position: "relative",
                          textAlign: "center",
                          opacity: isOutOfStock ? 0.5 : 1,
                          width: 180,
                        }}
                      >
                        <Typography fontWeight="bold">{talla.name}</Typography>

                        <Box>
                          {isOutOfStock ? (
                            <Chip
                              label="Agotado"
                              size="small"
                              color="default"
                            />
                          ) : (
                            <Chip
                              label={`${talla.stock} en stock`}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          )}
                        </Box>

                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <IconButton
                            disabled={isOutOfStock || talla.cantidad <= 0}
                            onClick={() => handleDecrement(index)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography component="span" sx={{ mx: 1 }}>
                            {talla.stock || 0}
                          </Typography>
                          <IconButton onClick={() => handleIncrement(index)}>
                            <AddIcon />
                          </IconButton>
                        </Box>

                        {isSelected && (
                          <CheckIcon
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              color: "black",
                            }}
                          />
                        )}
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Typography>No hay tallas disponibles</Typography>
            )}
          </Box>

          <Box sx={{ ml: 20 }}>
            <ImageProductActualizar
              path={product.path}
              hoverPath={product.hoverPath}
              onImageChange={handleImageChange}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mt: 30,
              ml: 82,
              position: "relative",
              top: 130,
            }}
          >
            <Button
              variant="outlined"
              color="black"
              onClick={handleBack}
              sx={{ width: 212 }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                ml: 2,
                backgroundColor: "black",
                color: "white",
                width: 212,
              }}
              onClick={handleBack}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </form>
    </>
  ) : (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 20 }}>
      <Typography variant="h5" color="gray">
        No hay producto
      </Typography>
    </Box>
  );
};

export default FormActualizarProduct;
