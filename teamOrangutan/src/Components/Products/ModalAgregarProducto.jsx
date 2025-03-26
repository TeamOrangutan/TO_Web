import { useState } from "react";
import useForm from "../../hooks/useForm";
import { Box, Button, TextField, Modal, Typography } from "@mui/material";
import CustomTypography from "../CustomTypography";
import AddIcon from "@mui/icons-material/Add";
import ModalTallas from "./ModalTallas";

export const ModalComponent = ({ style, handleClose, open }) => {
  const { formData, handleInputChange, handleSubmit } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [openTallas, setOpenTallas] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log(file);
      setImagePreview(URL.createObjectURL(file));
      handleInputChange(event);
    }
  };

  return (
    <div>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CustomTypography text={"AGREGAR PRODUCTO"} />
          </Box>

          <form onSubmit={handleSubmit}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Box
                sx={{
                  width: "30%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                    fontSize: "80px",
                    color: "black",
                    border: "1px solid black",
                    padding: 0,
                  }}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <AddIcon />
                  )}
                  <input
                    type="file"
                    name="productImage"
                    onChange={handleFileChange}
                    hidden
                  />
                </Button>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    width: "10%",
                    height: "15%",
                    backgroundColor: "white",
                    fontSize: "80px",
                    color: "black",
                    border: "1px solid black",
                    padding: 0,
                  }}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      style={{
                        width: "10%",
                        height: "10%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <AddIcon />
                  )}
                  <input
                    type="file"
                    name="productImage"
                    onChange={handleFileChange}
                    hidden
                  />
                </Button>
              </Box>

              {/* Sección de Datos del Producto */}
              <Box sx={{ width: "65%" }}>
                <TextField
                  fullWidth
                  label="Nombre del Producto"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Descripción"
                  variant="outlined"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                  multiline
                  rows={4}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: 28,
                    mt: 2,
                  }}
                >
                  <Box>
                    <Typography>Precio de venta</Typography>

                    <TextField
                      name="preciodeVenta"
                      value={formData.preciodeVenta}
                      onChange={handleInputChange}
                      type="number"
                      variant="standard"
                      InputProps={{
                        startAdornment: (
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              mr: 0.5,
                            }}
                          >
                            C$
                          </Typography>
                        ),
                        disableUnderline: true,
                        sx: {
                          fontSize: "24px",
                          fontWeight: "bold",
                          textAlign: "left",
                          width: "160px",
                        },
                      }}
                      sx={{
                        background: "transparent",
                        border: "none",
                        "& input": {
                          textAlign: "left",
                          fontWeight: "bold",
                          fontSize: "24px",
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography>Precio de fabricación</Typography>

                    <TextField
                      name="precioFabricacion"
                      value={formData.precioFabricacion}
                      onChange={handleInputChange}
                      type="number"
                      variant="standard"
                      InputProps={{
                        startAdornment: (
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              mr: 0.5,
                            }}
                          >
                            C$
                          </Typography>
                        ),
                        disableUnderline: true,
                        sx: {
                          fontSize: "24px",
                          fontWeight: "bold",
                          textAlign: "left",
                          width: "160px",
                        },
                      }}
                      sx={{
                        background: "transparent",
                        border: "none",
                        "& input": {
                          textAlign: "left",
                          fontWeight: "bold",
                          fontSize: "24px",
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Botón para abrir el modal de tallas */}
                <Box sx={{ mt: 2 }}>
                  <Typography>Tallas disponibles:</Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "black",
                      border: "1px solid black",
                      height: 26,
                      borderRadius: 0,
                    }}
                    onClick={() => setOpenTallas(true)}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button variant="outlined" color="black" onClick={handleClose}>
                Cerrar
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={handleClose}
                sx={{ ml: 2, backgroundColor: "black", color: "white" }}
              >
                Guardar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <ModalTallas handleClose={() => setOpenTallas(false)} open={openTallas} />
    </div>
  );
};

export default ModalComponent;
